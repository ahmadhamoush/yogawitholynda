import Layout from "@/components/Layout"
import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "@/components/ProductsContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { findAllProducts } from "../api/products"

function Cart({products}){

    const {selectedProducts,setSelectedProducts} = useContext(ProductsContext)
    const [cartInfo, setCartInfo] = useState([])
    const [checkoutClicked, setCheckoutClicked] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [optionalAddress, setOptionalAddress] = useState('')
    const [city, setCity] = useState('')

    async function checkout(){
      const request = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
          })
    const response = await request.json()
    console.log(response)
    }

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

   const order = {
    products: cartInfo.length && cartInfo.map(item=> {return {name:item.name,
    price:item.price, quantity:selectedProducts.filter(id=>id===item._id).length,image:item.image}}),
    name,
    email,
    number,
    address: address + " " + optionalAddress,
    city,
    total,
    subTotal
   }
   
    return(
       <Layout products={products}>
       <div className="cart">
            <div style={{display: checkoutClicked && "none"}} className="cartContainer">
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
                   <div className="cartItem" key={product.name}>
                    <FontAwesomeIcon onClick={()=>{setSelectedProducts(selectedProducts.filter(id=> id!== product._id))}} className="close" icon={faClose} />
                     <Image className="summaryImg" alt={product.name} src={product.image} width={100} height={100}/>
                        <p>{product.name}</p>
                
                    <div className="cartQuantity"> 

                    <button onClick={()=>removeProduct(product._id)}>-</button>
                        <p>{amount}</p>
                        <button onClick={()=>addProduct(product._id)}>+</button>   
                        </div>
                        <p>${product.price}</p> 
                 
                    </div>
                            <hr/></>
           
                )
                
            }):<p className="noProducts">No Products in Your Shopping Cart</p>}
            </div>
            <button className="back" type="button" onClick={()=>router.push('/collections/all-products')}>Back To Shop</button>
        </div>
       
       {cartInfo.length && <div style={{borderRadius : checkoutClicked ? '10px 0 0 10px' : '0 10px 10px 0'}} className="summary">
                    <h1>Summary</h1>
                    <hr />
                    <div>
                    <p>{cartInfo.length ? cartInfo.length : '0'} items</p>
                    <p>{cartInfo.length ? "$" + subTotal : 'N/A'}</p>
                    </div>
                  <div className="productsSummary"> 
                  {cartInfo.length && cartInfo.map(item=>{
                        return  <div key={item.name}>
                           <div className="itemSummary">
                           <Image className="summaryImg" src={item.image} width={70} height={70} alt={item.name} />
                           <p className="summaryQnty">{selectedProducts.filter(id=> id ===item._id).length}</p>
                           </div>
                        <p>{item.name}</p>
                       <p>${item.price*selectedProducts.filter(id=> id ===item._id).length}</p>
                       </div>
                    })}
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
                <button style={{display: checkoutClicked && 'none'}} onClick={()=>setCheckoutClicked(prev=>!prev)} type="button">CHECKOUT</button>
                 </div>}


                 <div style={{display: !checkoutClicked && "none"}} className="billing">
                    <h1>Billing Details</h1>
                    <hr />
                    <div>
                   
                    <p>Our payment option is cash on delivery. You can pay for your purchase when it arrives at your doorstep.</p>
               
                    <p>Please note that there is a delivery charge for all orders, which will be added to your total at checkout. Our standard delivery time is within a week from the date of purchase.</p>
                
                    </div>
                   <div>
                   <label htmlFor="name">Name:</label>
                    <input onChange={(e)=>setName(e.target.value)} type="text" id="name"  placeholder="Name"  />
                   </div>
                   <div>
                   <label htmlFor="email">Email:</label>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" id="email"  placeholder="Email"  />
                   </div>
                    <div>
                    <label htmlFor="number">Phone Number:</label>
                    <input type="number" onChange={(e)=>setNumber(e.target.value)} placeholder="eg: 03456789"  id="number" />
                    </div>
                    <div>
                    <label htmlFor="address">Address</label>
                    <input onChange={(e)=>setAddress(e.target.value)} type="text" placeholder="Street Address"  id="address" />
                    <input  onChange={(e)=>setOptionalAddress(e.target.value)} type="text" placeholder="Apartment, suite, unit, etc. (optional" id="firstName" />
                    </div>
                    <div>
                    <label htmlFor="city">Town / City</label>
                    <input onChange={(e)=>setCity(e.target.value)} type="text" placeholder="eg: Beirut"  id="city" />
                    </div>
                    <hr />
                <button onClick={checkout} type="button">ORDER</button>

                <button className="back" type="button" onClick={()=>setCheckoutClicked(prev=>!prev)}>BACK TO CART DETAILS</button>
                 </div>
       </div>
  
       </Layout>
    )
}
export default Cart

export async function getServerSideProps(){
    const products = await findAllProducts()
    return{
        props:{
            products: JSON.parse(JSON.stringify(products))
        }
    }
}