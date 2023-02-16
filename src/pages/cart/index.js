import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "@/components/ProductsContext"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
// import { findAllProducts } from "../api/products"
// import Search from "@/components/Search"
function Cart(){

    const {selectedProducts,setSelectedProducts} = useContext(ProductsContext)
    const [cartInfo, setCartInfo] = useState([])
    const router = useRouter()
    useEffect(()=>{
        const uniqueIds = [... new Set(selectedProducts)]
        fetch('/api/cart?ids=' + uniqueIds.join(','))
        .then(response=> response.json())
        .then(json=> setCartInfo(json))
    },[selectedProducts])


    function addProduct(id){
        setSelectedProducts(prev=>[...prev, id])
    }
    function removeProduct(id){
        const pos = selectedProducts.indexOf(id)
        if(pos!==-1){
            setSelectedProducts(prev=>{return prev.filter((value,index)=>index!==pos)})
        }
    }

    let subTotal =0;
    const delivery = 5; 
   if(selectedProducts?.length && cartInfo?.length){
    for(let id of selectedProducts){
        const price = cartInfo.find(p=>p._id === id)?.price || 0
        subTotal +=price
    }
   }
   let total = subTotal+delivery
   
    return(
        <>
        <Navbar />
       <div className="cart">
            {/* <Navbar />
            <Search products={products} /> */}
            <div className="cartContainer">
            <div className="cartHeader">
            <h1>Cart</h1>
            <p>{cartInfo.length ? cartInfo.length : '0'} items</p>
            </div>
            <hr style={{color:'black'}} />
            <div className="cartDetails">
            {cartInfo.length && !cartInfo.message ? cartInfo.map(product=>{
            const amount =selectedProducts.filter(id=>id===product._id).length
            if(amount ===0) return
                return (
             <>
                   <div className="cartItem" key={product._id}>
                            <Image alt={product.name} src={product.image} width={100} height={100}/>
                        <p>{product.name}</p>
                
                    <div className="cartQuantity"> 

                    <button onClick={()=>removeProduct(product._id)}>-</button>
                        <p>{amount}</p>
                        <button onClick={()=>addProduct(product._id)}>+</button>   
                        </div>
                        <p>${product.price}</p> 
                 
                    </div>
                            <hr style={{color:'black'}} /></>
           
                )
                
            }):<p className="noProducts">No Products in Your Shopping Cart</p>}
            </div>
            <button className="back" type="button" onClick={()=>router.back()}>Back To Shop</button>
        </div>
        <div className="summary">
                    <h1>Summary</h1>
                    <hr />
                    <div>
                    <p>{cartInfo.length ? cartInfo.length : '0'} items</p>
                    <p>{cartInfo.length ? "$" + subTotal : 'N/A'}</p>
                    </div>
                    <div>
                    <p>subtotal:</p>  
                    <p>{cartInfo.length ? "$" + subTotal : 'N/A'}</p>
                    </div>
                   <div>
                   <p>delivery:</p>  
                   <p>{cartInfo.length ? "$" + delivery : 'N/A'}</p>
                   </div>
                    <hr />
                <div>
                <p>total: </p> 
                <p>{cartInfo.length ? "$" + total : 'N/A'}</p> 
                </div>
                <button type="button">CHECKOUT</button>
                 </div>
       </div>
       <Footer />
       </>
    )
}
export default Cart

// export async function getServerSideProps(){
//     const products = await findAllProducts()
//     return{
//         props:{
//             products: JSON.parse(JSON.stringify(products))
//         }
//     }
// }