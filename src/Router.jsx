import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
// import Signup from './Pages/Cart/Signup'
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Auth from "./Pages/Auth/Auth";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51SgZLTDlG1BP75rwSib5epKA5gA0gKYXwgZMLJcjtg4ydj6KZAoPRoMdWvlnjPD95UzC2bTX8Fof07HSumm6GOw400o9ohGsne"
);
function Routering() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payments" element={
        <ProtectedRoute msg={"You must login to pay"} redirect={"/payments"}>

          <Elements stripe={stripePromise}>
            <Payment />

          </Elements>
        </ProtectedRoute>


          
          } />
        <Route path="/orders" element={
          
           <ProtectedRoute msg={"You must login in to access your orders"} redirect={"/orders"}>

             <Orders />
           </ProtectedRoute>
          
        }
           />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routering;
