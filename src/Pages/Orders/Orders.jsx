import React, { useContext, useState, useEffect } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./orders.module.css";
// import { onSnapshot } from "firebase/firestore";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { BiCycling } from "react-icons/bi";
import ProductCard from "../../Components/Product/ProductCard";
import { flex } from "@mui/system";

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      setOrders([]);
    }
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     db.collection("users")
  //       .doc(user.uid)
  //       .collection("orders")
  //       .orderBy("created", "desc")
  //       .onSnapshot((snapshot) => {});
  //   } else {
  //   }
  // }, []);

  //   useEffect(() => {
  //   if (!user) return;

  //   const ordersRef = collection(db, "users", user.uid, "orders");
  //   const q = query(ordersRef, orderBy("created", "desc"));

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     setOrders(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }))
  //     );
  //   });

  //   return () => unsubscribe();
  // }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Order</h2>
          {
        
            orders?.length== 0 && <div style={{padding:"20px"}}>
              You dont have orders yet
            </div>
          }
    
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID:{eachOrder.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                return(    <ProductCard flex={true} product={order} key={order.id} />);
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
