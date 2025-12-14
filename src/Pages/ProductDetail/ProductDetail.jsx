import React, { useEffect, useState } from 'react'
import classes from './productDetal.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {productUrl} from '../../Api/endPoints'
import ProductCard from '../../Components/Product/ProductCard'
function ProductDetail() {
  const {productId}=useParams();
  const [product, setproduct]= useState({})
  useEffect(()=>{
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
   setproduct(res.data)
    }).catch((err)=>{
      console.log(rr)
    })

  },[])
  console.log(productId)
  return (
    <LayOut>
  <ProductCard
  product={product}
  />
    </LayOut>

    
  )
}

export default ProductDetail
