import Navbar from "../../components/Navbar"
import Image from "next/image"
import ProductList from "../../components/ProductList"
import Footer from "../../components/Footer"
import { useEffect, useState } from "react"
import { findAllProducts } from "../api/products"
import Announcement from "@/components/Announcement"

function Product({product,similarProducts}){
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(product.price);

    useEffect(()=>{
        setQuantity(1)
        setPrice(product.price)
    },[product])

    return(
        <>
          <Announcement  />
       <Navbar /> 
        <div className="productContainer">
        <Image data-aos="fade-down"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600"  className="productImage" alt={product.name} src={product.image} width={400} height ={400} />
            <div className="productDetails">
        <div>
        <h2>{product.name}</h2>
        <span>Yoga Mats</span>
        <p>${price}</p>
        </div>
        <div className="quantityContainer">
        <p>Quantity:</p>
        <div className="quantity">  
        <button  onClick={(e)=>{setQuantity(prev=>prev>1 ? prev-1 : 1);setPrice(prev=> prev>product.price ? prev-product.price : product.price)}}>-</button>    
           <p> {quantity}</p>
            <button onClick={(e)=>{setQuantity(prev=>prev+1);setPrice(prev=>prev+product.price)}}>+</button>
        </div>
        </div>
       <div className="productBtns">
       <button>Add to Cart</button>
        <button>Buy Now</button>
       </div>
        </div>
        </div>
        <div data-aos="fade-up"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600"  className="productDesc">
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

