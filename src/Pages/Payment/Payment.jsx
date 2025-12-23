import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  useCheckout,
  PaymentElement,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CurrentFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { Type } from "../../Utility/action.type";
const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      const paymentIntent = confirmation.paymentIntent;

      // await db
      //   .collection("users")
      //   .doc(user.uid)
      //   .collection("orders")
      //   .doc(paymentIntent.id)
      //   .set({
      //     basket: basket,
      //     amount: paymentIntent.amount,
      //     created: paymentIntent.created,
      //   });

      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        status: paymentIntent.status,
      });
      //empty basket
      dispatch({ type: Type.EMPTY_BASKET });

      // console.log(confirmation);
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed new orders " } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout({totalItem}) items</div>
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago ,IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span>
                      Total Order | <CurrentFormat amount={total} />{" "}
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait....</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;

// import React, { useContext, useState } from "react";
// import LayOut from "../../Components/LayOut/LayOut";
// import classes from "./payment.module.css";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import ProductCard from "../../Components/Product/ProductCard";
// import { ClipLoader } from "react-spinners";

// import { db } from "../../Utility/firebase";
// import { doc, setDoc } from "firebase/firestore";

// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// import CurrentFormat from "../../Components/CurrencyFormat/CurrencyFormat";
// import { axiosInstance } from "../../Api/axios";

// const Payment = () => {
//   const [{ user, basket }] = useContext(DataContext);

//   const totalItem = basket.reduce((sum, item) => sum + item.amount, 0);
//   const total = basket.reduce((sum, item) => sum + item.price * item.amount, 0);

//   const [cardError, setCardError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const stripe = useStripe();
//   const elements = useElements();

//   const handleChange = (e) => {
//     setCardError(e?.error?.message || "");
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     try {
//       setProcessing(true);

//       // 1️⃣ Create PaymentIntent
//       const response = await axiosInstance.post(
//         `/payment/create?total=${total}`
//       );

//       const clientSecret = response.data.clientSecret;

//       // 2️⃣ Confirm card payment
//       const confirmation = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (confirmation.error) {
//         setCardError(confirmation.error.message);
//         setProcessing(false);
//         return;
//       }

//       const paymentIntent = confirmation.paymentIntent;

//       // 3️⃣ Save order ONLY if payment succeeded
//       if (paymentIntent.status === "succeeded") {
//         await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
//           basket,
//           amount: paymentIntent.amount,
//           created: paymentIntent.created,
//           status: paymentIntent.status,
//         });
//       }

//       setProcessing(false);
//     } catch (error) {
//       console.error(error);
//       setProcessing(false);
//     }
//   };

//   return (
//     <LayOut>
//       <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

//       <section className={classes.payment}>
//         {/* Address */}
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email}</div>
//             <div>123 React Lane</div>
//             <div>Chicago, IL</div>
//           </div>
//         </div>

//         <hr />

//         {/* Items */}
//         <div className={classes.flex}>
//           <h3>Review items</h3>
//           <div>
//             {basket.map((item) => (
//               <ProductCard key={item.id} product={item} flex />
//             ))}
//           </div>
//         </div>

//         <hr />

//         {/* Payment */}
//         <div className={classes.flex}>
//           <h3>Payment Method</h3>

//           <div className={classes.payment_card_container}>
//             <form onSubmit={handlePayment}>
//               {cardError && <small style={{ color: "red" }}>{cardError}</small>}

//               <CardElement onChange={handleChange} />

//               <div className={classes.payment__price}>
//                 <span>
//                   Total Order | <CurrentFormat amount={total} />
//                 </span>

//                 <button type="submit" disabled={processing || !stripe}>
//                   {processing ? (
//                     <div className={classes.loading}>
//                       <ClipLoader size={12} color="gray" />
//                       <p>Please wait...</p>
//                     </div>
//                   ) : (
//                     "Pay Now"
//                   )}
//                 </button>

//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// };

// export default Payment;
