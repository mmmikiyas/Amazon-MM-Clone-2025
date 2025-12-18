import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/Product/ProductCard'
import classes from '../Results/results.module.css'
import Loader from '../../Components/Loader/Loader'

function Results() {
  const[results,setResults]=useState([]);
    const [isLoading,setIsLoading]= useState(false)

    const {categoryName} =useParams();
    const decodedCategory = decodeURIComponent(categoryName);
    console.log(categoryName)
    useEffect(()=>{
          setIsLoading(true)
      axios.get(`${productUrl}/products/category/${decodedCategory}`)
      .then((res)=>{
        setResults(res.data)
           setIsLoading(false); 

        // console.log(res.data)
      }).catch((err)=>{
        console.log(err)
           setIsLoading(false); 

      })
    },[])







  return (
    <LayOut>
      <>
   {
    isLoading?(<Loader/>):(
        <section>

     <h1 style={{padding: "30px" }}>Results</h1>
     <p style={{padding: "30px" }}>Category / {categoryName}</p>
     
     <hr />
     <div className={classes.products_container}>
     { results?.map((product)=>(
        <ProductCard
         key={product.id}
         product={product}
         renderDesc={false}
         renderAdd={true}
         />
           ) )}

     </div>
    </section>)
   }


      </>
  
    </LayOut>
  )
}

export default Results
