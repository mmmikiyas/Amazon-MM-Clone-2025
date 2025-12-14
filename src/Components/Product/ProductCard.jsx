import React from 'react'
import Rating from '@mui/material/Rating'
import CurrentFormat from '../CurrencyFormat/CurrencyFormat'
import Button from '@mui/material/Button'
import classes from './Product.module.css'
import { Link } from 'react-router-dom'
function ProductCard({product}) {
    if (!product) return null;

  const {
    image,
    title,
    id,
    rating = {},
    price
  } = product;
  
    // const {image,title,id,rating,price}=product;
  return (
    <div className={`${classes.card_container}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt='' className={classes.img_container}/>
      </Link>
      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
            {/* rating */}
            <Rating value={rating.rate ?? 0} precision={0.1 }/>
            <small>{rating.count}</small>
            {/* price */}
        </div>
        <div>
    

            {/* Price */}
            <CurrentFormat amount={price}/>
        </div>
      <button className={classes.button}>
        add to cart
      </button>
    </div>
    </div>
  )
}
 export default ProductCard


