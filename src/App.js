import { Carousel } from "react-responsive-carousel";
import "./App.css";
import Header from "./Components/Header/Header";
import LowerHeader from "./Components/Header/LowerHeader";
import CarouselEffect from "./Components/Carousel/Carousel";
import Category from "./Components/Category/Category.jsx";
import Product from "./Components/Product/Product.jsx";
import Routing from "./Router.jsx";
import StepContent from "@mui/material/StepContent";
import { useContext, useEffect } from "react";
import { Type } from "./Utility/action.type.js";
import { auth } from "./Utility/firebase.js";
import { DataContext } from "./Components/DataProvider/DataProvider.jsx";
function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // console.log(authUser);
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
          dispatch({
          type:Type.SET_USER,
          user:null
        }) 
      }
    })
  },[]);
  return <Routing />;
}

export default App;
