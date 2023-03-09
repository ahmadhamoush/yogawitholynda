import ProductCard from "../../components/ProductCard";
import { initMongoose } from "lib/mongoose";
import { findAllProducts,listCollection } from "../api/products";
import {findAllCollections } from "../api/collections";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import CollectionList from '@/components/CollectionList'
import { findCollection } from "../api/collections/[id]";


function Collection ({products,title, allProducts,collections,desc}){
  const [range,setRage] = useState({min:0, max:100})
  const [inStock, setInStock] = useState(false)
  const [outStock, setOutStock] = useState(false)
  const [filteredProducts,setFilteredProducts] = useState(products)
 
 useEffect(()=>{
  setFilteredProducts(products.map(p=>p))
    setInStock(false)
    setOutStock(false)

 },[products])
  const clearFilters =() =>{
    setFilteredProducts(products.map(p=>p))
    setInStock(false)
    setOutStock(false)
    }

  function filterOutStock(){
  setFilteredProducts(products.filter(product=>product.stock===0 && product.price<=range.max && product.price>=range.min))
    setInStock(false)
    setOutStock(true)
  }
  function filterInStock(){
    setFilteredProducts(products.filter(product=>product.stock>0 && product.price<=range.max && product.price>=range.min ))
      setOutStock(false)
      setInStock(true)
    }
  function filterPrice(e){
    setRage({min:e[0],max:e[1]})
    if(inStock){
      setFilteredProducts(products.filter(product=> product.stock>0 && product.price<=range.max && product.price>=range.min))
    }
    else if(outStock){
      setFilteredProducts(products.filter(product=> product.stock===0 && product.price<=range.max && product.price>=range.min))
    }
    else{
      setFilteredProducts(products.filter(product=> product.price<=range.max && product.price>=range.min))
    }
  }
    return (
      <Layout products={allProducts} collections={collections}>
  <div className="container">
   <div data-aos="fade-up"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className="collectionDesc">
   <h2>{title}</h2>
    <p>{desc}</p>
   </div>
   <div data-aos="fade-up"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className="collectionContainer">    <div className="collectionFlex">

      <div className="filterFlex">
      <div className="filters">
     
           <div className="filterContainer">
           <p>Home / Collections / {title.charAt(0).toUpperCase() + title.toLowerCase().slice(1) } </p>
           <div className="filterHeading">
           <label  htmlFor="showStock">Availability</label>
           <input onClick={()=>{setInStock(false);setOutStock(false);clearFilters()}} type="checkbox" className='showFilter' id="showStock"></input>
           <label htmlFor="showStock"></label>
           <div className="checkboxes">
             <div className="checkbox">
             <input onChange={filterInStock} checked={inStock} type="checkbox" id="inStock" />
               <label htmlFor="inStock">In Stock</label> 
               </div>    
             <div className="checkbox">
             <input checked={outStock} onChange={filterOutStock} type="checkbox" id="outOfStock" />
               <label style={{opacity:0.5}} htmlFor="outOfStock">Out of Stock</label>
               </div>
          
                </div> 
           </div>

                <hr />
      
           </div>
           <div className="filterContainer">
           <div className="filterHeading">
           <label  htmlFor="showPrice">Price</label>
           <input onClick={()=>{setRage({min:0,max:100});clearFilters()}} type="checkbox" className='showFilter' id="showPrice"></input>
           <label htmlFor="showPrice"></label>
               <div className='rangeContainer'>
               <div className='prices'>
                   <div className='priceContainer'>
                       <p>Min</p>
                       <input type="text"  readOnly value ={range.min} />
                   </div>
                   <div className='priceContainer'>
                       <p>Max</p>
                       <input type="text" readOnly value ={range.max} />
                   </div>
               </div>
               <RangeSlider min={0} max={100} step={1}  id="range-slider-yellow" onInput ={filterPrice} />
               </div>
           </div>

                <hr />
      
           </div>         
       </div>
    
         <div className="products">
       {filteredProducts.map(product=>{
         return <ProductCard key={product._id} id={product._id}  name={product.name} price={product.price} image={product.image} stock={product.stock}/>
       })}
       {!filteredProducts.length && <p>No Products Available</p>}
       </div>
      </div>
    </div>

   </div>
   <CollectionList collections={collections} all={true}/>
</div>
      </Layout>
      
    )
}
export default Collection

export  async function getServerSideProps(context){
  await initMongoose()
const {query} = context;
const collectionName = query.collectionName
const collection = await findCollection(collectionName)
let products;
const allProducts = await findAllProducts()
 products  = await listCollection(collectionName)
if(collectionName === 'all-products'){
  products = allProducts
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
        products:JSON.parse(JSON.stringify(products)),
        allProducts:JSON.parse(JSON.stringify(allProducts)),
        collections: JSON.parse(JSON.stringify(collections)),
        desc: collection.description

    }
}
}