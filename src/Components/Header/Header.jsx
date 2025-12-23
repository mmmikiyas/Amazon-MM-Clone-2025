import React, { useContext } from 'react'
import logo from '../../../src/images/amazonLogo.png'
import { FaSearch } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { BiCart } from "react-icons/bi";
import { MdShoppingCart } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import {auth } from '../../Utility/firebase'
import classes from './Header.module.css'
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import LowerHeader from './LowerHeader';
import ListItem from '@mui/material/ListItem';
function Header() {
    const [{user,basket},dispatch]=useContext(DataContext)
    const totalItem=basket?.reduce((amount,item)=>{
        return item.amount+amount
    },0)
    console.log(basket.length)
  return (
    <section className={classes.fixed}>
        <section>
        <div className={classes.header_container}>
            {/* logo */}
           <div className={classes.logo_container}>
            <Link to="/">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt='amazon logo' />
            </Link>
 
            <div className={classes.delivery}> 
            <span>
   
                <CiLocationOn/>
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
             <FaSearch size={38}/>
        </div>
        {/* right side link */}
   








     <div className={classes.order_container}>
            <Link to='' className={classes.language}>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg/250px-Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg.png" alt="" srcset="" />
 <select name="" id=''>
    <option value="">EN</option>
 </select>
            </Link>
 {/* three components */}
 <Link to={!user &&"/auth"}>
<div>
    { user?(
            <>
            
            
        <p>Hello {user?.email?.split("@")[0]}</p> 
             <span onClick={()=>auth.signOut()}>Sign Out</span>
</>
        ):(
            <>
            <p>Hello,Sign In</p>
            <p>Account & Lists</p>
            </>
        )

    }
</div>
   
 </Link>
 {/* orders */}
 <Link to="/orders">
    <p>returns</p>
    <span>& Orders</span>
 </Link>
 {/* carts */}
 <Link  to='/cart' className={classes.cart}>
 {/* icons */}
  <BiCart size={35}/>
 <span>{totalItem}</span>
 </Link>
 </div>

        </div>
    </section>
    <LowerHeader/>
    </section>
  );
};

export default Header
