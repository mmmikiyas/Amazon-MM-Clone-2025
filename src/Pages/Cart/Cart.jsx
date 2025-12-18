import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrentFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./cart.module.css";
const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount
  }, 0);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping basket</h3>
          <hr />
          {basket?.lenght == 0 ? (
            <p>Opps ! No item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
              
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p> Subtotal({basket?.length} items) </p>
              <CurrentFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" name="" id="" />
              <small>This order contain a gift</small>
            </span>
            <Link  to="/payments">Continue to Checkout</Link>
          </div>
        )}
        <div></div>
      </section>
    </LayOut>
  );
};

export default Cart;
