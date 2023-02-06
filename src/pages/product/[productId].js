import Navbar from "../../components/Navbar"
import Image from "next/image"
import ProductList from "../../components/ProductList"
import Footer from "../../components/Footer"
import { useState } from "react"

function Product(){
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(40);
    return(
        <>
       <Navbar isCollection={true} /> 
       <div className="imagesContainer">
        <div className="flexImages">
        <Image src='/product1.png' width={100} height ={100} />
        <Image src='/product1.png' width={100} height ={100} />
        <Image src='/product1.png' width={100} height ={100} />
        <Image src='/product1.png' width={100} height ={100} />
        <Image src='/product1.png' width={100} height ={100} />
        </div>
        <Image src='/product1.png' width={500} height ={500} />
        <div className="productDetails">
        <div>
        <h2>CHIN MUDRA - YOGA MAT BAG</h2>
        <span>Yoga Mats</span>
        <p>${price}</p>
        </div>
        <div className="quantityContainr">
        <p>Quantity:</p>
        <div className="quantity">  
        <button  onClick={(e)=>{setQuantity(prev=>prev<=1? 1 :prev-1);setPrice(prev=> prev>40 && prev-40 )}}>-</button>    
           <p> {quantity}</p>
            <button onClick={(e)=>{setQuantity(prev=>prev+1);setPrice(prev=> prev<=40 && prev+40 )}}>+</button>
        </div>
        </div>
       <div className="productBtns">
       <button>Add to Cart</button>
        <button>Buy Now</button>
       </div>
        </div>
       </div>

       <ProductList />
       <Footer />
        
      </>
    )
}
export default Product