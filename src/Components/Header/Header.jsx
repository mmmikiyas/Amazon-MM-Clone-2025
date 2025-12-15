import React, { useContext } from 'react'
import logo from '../../../src/images/amazonLogo.png'
import { FaSearch } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import classes from './Header.module.css'
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import LowerHeader from './LowerHeader';
function Header() {
    const [{basket},dispatch]=useContext(DataContext)
    console.log(basket.length)
  return (
    <section className={classes.fixed}>
        <section>
        <div className={classes.header_container}>
            {/* logo */}
           <div className={classes.logo_container}>
            <Link to="#">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt='amazon logo' />
            </Link>
 
            <div className={classes.delivery}> 
            <span>
   
                <FaSearch/>
            </span>
            <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
            </div>
            </div>
            </div>
        
            {/* search */}
        <div className={classes.search}>
            <select name="" id="">
                <option value="">All</option>
            </select>
            <input type="text" name='' placeholder='search Product' />
            {/* icon */}
             <FaSearch size={25}/>
        </div>
        {/* right side link */}
   








     <div className={classes.order_container}>
            <Link to='' className={classes.language}>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg/250px-Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg.png" alt="" srcset="" />
 <section>
    <option value="">EN</option>
 </section>
            </Link>
 {/* three components */}
 <Link to="">

        <p>Sign In</p>
        <span>Account & Lists</span>
   
 </Link>
 {/* orders */}
 <Link to="/orders">
    <p>returns</p>
    <span>& Orders</span>
 </Link>
 {/* carts */}
 <Link  to='/cart' className={classes.cart}>
 {/* icons */}
  <CiShoppingCart/>
 <span>{basket.length}</span>
 </Link>
 </div>

        </div>
    </section>
    <LowerHeader/>
    </section>
  );
};

export default Header
