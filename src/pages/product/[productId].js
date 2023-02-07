import Navbar from "../../components/Navbar"
import Image from "next/image"
import ProductList from "../../components/ProductList"
import Footer from "../../components/Footer"
import { useState } from "react"
import { findAllProducts } from "../api/products"

function Product({products, product,similarProducts}){
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(40);
    return(
        <>
       <Navbar /> 
        <div className="productContainer">
        <Image className="productImage" alt={product.name} src={product.image} width={400} height ={400} />
            <div className="productDetails">
        <div>
        <h2>{product.name}</h2>
        <span>Yoga Mats</span>
        <p>${price}</p>
        </div>
        <div className="quantityContainr">
        <p>Quantity:</p>
        <div className="quantity">  
        <button  onClick={(e)=>{setQuantity(prev=>prev>1 ? prev-1 : 1);setPrice(price*quantity)}}>-</button>    
           <p> {quantity}</p>
            <button onClick={(e)=>{setQuantity(prev=>prev+1);setPrice(price*quantity)}}>+</button>
        </div>
        </div>
       <div className="productBtns">
       <button>Add to Cart</button>
        <button>Buy Now</button>
       </div>
        </div>
        </div>
        <div className="productDesc">
            <h2>Product Description</h2>
            {
                product.description.map((desc,index)=>{
                    return <ul key={index}><li>{desc}</li></ul>
                })
            }
        </div>
       <ProductList featured={false} products={similarProducts} />
       <Footer />
        
      </>
    )
}
export default Product
export async function getServerSideProps(context){
    const {query} = context;
    const productId = query.productId
    const products = await findAllProducts()
    const queriedProduct = products.find((product=>
        product.name === productId
    ))
    const similarProducts = products.filter((product=>
        product.category === queriedProduct.category &&  product.name !== queriedProduct.name
    ))
    return{
      props:{
        products: JSON.parse(JSON.stringify(products)),
        product: JSON.parse(JSON.stringify(queriedProduct)),
        similarProducts: JSON.parse(JSON.stringify(similarProducts))
      }
    }
  }