import ProductCard from "../../components/ProductCard";
import { initMongoose } from "lib/mongoose";
import { findAllProducts,listCollection } from "../api/products";
import {findAllCollections } from "../api/collections";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useState } from "react";
import Layout from "@/components/Layout";


function Collection ({products,title, isProducts}){

  const [range,setRage] = useState({min:0, max:100})
  const filteredProducts = products.filter(product=> product.price<=range.max && product.price>=range.min)

    return (
      <Layout products={products}>
  <div className="container">
   <div data-aos="fade-up"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className="collectionDesc">
   <h2>{title}</h2>
    <p>Transform your yoga practice with our premium collection of yoga mats. Designed with the modern yogi in mind, each mat offers unparalleled comfort and stability to help you achieve your best poses. Our mats are made with high-quality, non-slip materials that provide a safe and supportive surface, so you can focus on your breath and movement. Choose from a range of thicknesses, sizes, and colors to find the perfect mat that matches your personal style and needs. Whether you are a beginner or a seasoned pro, investing in a quality yoga mat is the key to unlocking your full potential on the mat. Elevate your yoga journey today with our collection of yoga mats.</p>
   </div>
   <div data-aos="fade-up"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className="collectionContainer">    <div className="collectionFlex">


      <div className="filterFlex">
      <div className="filters">
     
           <div className="filterContainer">
           <p>Home / Collections / {title.charAt(0).toUpperCase() + title.toLowerCase().slice(1) } </p>
           <div className="filterHeading">
           <label  htmlFor="showStock">Availability</label>
           <input type="checkbox" className='showFilter' id="showStock"></input>
           <label htmlFor="showStock"></label>
           <div className="checkboxes">
             <div className="checkbox">
             <input type="checkbox" id="inStock" />
               <label htmlFor="inStock">In Stock</label> 
               </div>    
             <div className="checkbox">
             <input disabled type="checkbox" id="outOfStock" />
               <label style={{opacity:0.5}} htmlFor="outOfStock">Out of Stock</label>
               </div>
          
                </div> 
           </div>

                <hr />
      
           </div>
           <div className="filterContainer">
           <div className="filterHeading">
           <label  htmlFor="showPrice">Price</label>
           <input type="checkbox" className='showFilter' id="showPrice"></input>
           <label htmlFor="showPrice"></label>
               <div className='rangeContainer'>
               <div className='prices'>
                   <div className='priceContainer'>
                       <p>Min</p>
                       <input type="text" disabled value ={range.min} />
                   </div>
                   <div className='priceContainer'>
                       <p>Max</p>
                       <input type="text" disabled value ={range.max} />
                   </div>
               </div>
               <RangeSlider min={0} max={100} step={1}  id="range-slider-yellow" onInput ={(e)=>{
               setRage({min:e[0],max:e[1]})
               console.log('eveent: ',e)
           }} />
               </div>
           </div>

                <hr />
      
           </div>
           {isProducts && (
      
      <div className="filterContainer">
      <div className="filterHeading">
      <label  htmlFor="showCategories">Categories</label>
      <input type="checkbox" className='showFilter' id="showCategories"></input>
      <label htmlFor="showCategories"></label>
      <div className="checkboxes">
        <div className="checkbox">
        <input type="checkbox" id="mats" />
          <label htmlFor="mats">Yoga Mats</label> 
          </div>    
          <div className="checkbox">
        <input type="checkbox" id="socks" />
          <label htmlFor="socks">Yoga Socks</label> 
          </div> 
          <div className="checkbox">
        <input type="checkbox" id="incense" />
          <label htmlFor="incense">Yoga Incense</label> 
          </div> 
          <div className="checkbox">
        <input type="checkbox" id="acc" />
          <label htmlFor="acc">Accessories</label> 
          </div> 
     
           </div> 
      </div>

           <hr />
 
      </div>
     )
}
         
       </div>
    
         <div className="products">
       {filteredProducts.map(product=>{
         return <ProductCard key={product._id} id={product._id}  name={product.name} price={product.price} image={product.image} />
       })}
       {!filteredProducts.length && <p>No Products Available</p>}
       </div>
      </div>
    </div>

   </div>
</div>
      </Layout>
      
    )
}
export default Collection

export  async function getServerSideProps(context){
  await initMongoose()
const {query} = context;
const collectionName = query.collectionName
let products;
let isProducts = false;
 products  = await listCollection(collectionName)
if(collectionName === 'all-products'){
  products = await findAllProducts()
   isProducts  = true
}

const collections = await findAllCollections()

  let paths =['all-products']
  collections.forEach(collection => {
    let pathName = collection.href.split('/')
    paths.push(pathName[pathName.length-1])
  });
  if(!paths.includes(collectionName)){
    return {
        notFound:true
    }
 }


return {
    props:{
        title:collectionName.toUpperCase().replace('-',' '),
        isProducts: isProducts,
        products:JSON.parse(JSON.stringify(products))

    }
}
}