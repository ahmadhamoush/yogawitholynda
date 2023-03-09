import Layout from "@/components/Layout"
import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "@/components/ProductsContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons"
import { findAllProducts } from "../api/products"
import { useSession } from "next-auth/react"
import { findAllCollections } from "../api/collections"
import { initMongoose } from "lib/mongoose"
import { toast } from "react-toastify"
import Loader from "@/components/Loader"

function Cart({products,collections}){
    const session = useSession()
    const {selectedProducts,setSelectedProducts,setIsProfileChecked} = useContext(ProductsContext)
    const [cartInfo, setCartInfo] = useState([])
    const [user, setUser] = useState([])
    const [checkoutClicked, setCheckoutClicked] = useState(false)
    const [editAddress, setEditAddress] = useState(false)
    const [showSummary, setShowSummary] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [optionalAddress, setOptionalAddress] = useState('')
    const [city, setCity] = useState('')
    const[orderLoading,setOrderLoading] = useState(false)

    async function checkout(){
      setOrderLoading(true)
     if(session.status === 'authenticated'){
        const request = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
          })
    const response = await request.json()
      if(response){
        setSelectedProducts([])
        setCartInfo([])
        toast(`Order #${response.orderID} created!`)
        router.push(`/order/${response.orderID}`)
      }
      setOrderLoading(false)
     }
    }

    function scrollTop(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop =0
     }
    async function handleViewCheckout(){
      if(session.status === 'authenticated'){
        const req = await fetch(`/api/users?email=${session.data.user.email}`);
        const user = await req.json()
        setUser(await user)
          if(await user){
            setName(user.fName + " " + user.lName)
            setEmail(user.email)
            setNumber(user?.number && user.number)
            setAddress(user?.address && user.address.main)
            setOptionalAddress(user?.address && user.address.secondary)
            setCity(user?.address && user.address.city)
            setEditAddress(user?.address && true)
          }       
          setCheckoutClicked(prev=>!prev)
          setShowSummary(false)
      }
      else{
        setIsProfileChecked(prev=>!prev)
      }
      scrollTop()
    }

    const router = useRouter()
    useEffect(()=>{
        const uniqueIds = [... new Set(selectedProducts)]
        fetch('/api/cart/' + uniqueIds.join('-'))
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
    orderID:new Date().getFullYear().toString() + Math.floor(1000000 + Math.random() * 900000).toString(),
    products: cartInfo.length && cartInfo.map(item=> {return {id:item._id, stock:item.stock, name:item.name,
    price:item.price, quantity:selectedProducts.filter(id=>id===item._id).length,image:item.image}}),
    userID: user._id,
    number,
    address: {main:address, secondary:optionalAddress, city},
    total,
    subTotal
   }
   
    return(
       <Layout products={products} collections={collections}>
        {orderLoading && <Loader />}
       <div className="cart">
            <div style={{display: checkoutClicked && "none" ,borderRadius : !cartInfo?.length && "10px"}} className="cartContainer">
            <div className="cartHeader">
            <h1>Cart</h1>
            <p>{cartInfo?.length ? cartInfo?.length : '0'} items</p>
            </div>
            <hr style={{color:'black'}} />
            <div className="cartDetails">
            {cartInfo?.length && !cartInfo?.message ? cartInfo.map(product=>{
            const amount =selectedProducts.filter(id=>id===product._id).length
            if(amount ===0) return
                return (
             <div key={product._id}>
                   <div className="cartItem" key={product._id}>
                    <FontAwesomeIcon onClick={()=>{setSelectedProducts(selectedProducts.filter(id=> id!== product._id))}} className="close" icon={faClose} />
                     <Image className="summaryImg" alt={product.name} src={product.image} width={100} height={100}/>
                        <p>{product.name}</p>
                
                    <div className="cartQuantity"> 

                    <button onClick={()=>removeProduct(product._id)}>-</button>
                        <p>{amount}</p>
                        <button onClick={()=>addProduct(product._id)}>+</button>   
                        </div>
                        <p className="price">${product.price}</p> 
                 
                    </div>
                            <hr/>
                            </div>
           
                )
                
            }):<p className="noProducts">No Products in Your Shopping Cart</p>}
            </div>
            <button className="back" type="button" onClick={()=>router.push('/collections/all-products')}>Back To Shop</button>
        </div>
       
       {cartInfo.length && showSummary && <div style={{borderRadius : checkoutClicked ? '10px 0 0 10px' : '0 10px 10px 0'}} className="summary">
                    <h1>Summary</h1>
                    <hr />
             
              <div className="displaySummary">
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
                       <p className="price">${item.price*selectedProducts.filter(id=> id ===item._id).length}</p>
                       </div>
                    })}
                  </div>
                    <div>
                    <p>subtotal:</p>  
                    <p className="price">{cartInfo.length ? "$" + subTotal : 'N/A'}</p>
                    </div>
                   <div>
                   <p>delivery:</p>  
                   <p className="price">{cartInfo.length ? "$" + delivery : 'N/A'}</p>
                   </div>
                    <hr />
                <div>
                <p>total: </p> 
                <p className="price">{cartInfo.length ? "$" + total : 'N/A'}</p> 
                </div>
                  </div>
               {!checkoutClicked && <div>
                <p style={{margin:'10px 0'}}>To prevent automated purchases, please log in to proceed with checkout.</p>
                <p>Authenticated: </p> 
                <p style={{color:session.status ==='authenticated' ? 'green' : 'red'}}>{session.status ==='authenticated' ? 'Yes' : 'No'}</p> 
                </div>}
                <button className="btn" style={{display: checkoutClicked && 'none'}} onClick={handleViewCheckout} type="button">CHECKOUT</button>
      
                 </div>}


                 <div style={{display: !checkoutClicked && "none", borderRadius:!showSummary &&"10px",flex:!showSummary &&"1"}} className="billing">
                    <h1>Billing Details {checkoutClicked && <button className="showSummary" onClick={()=>setShowSummary(prev=>!prev)}>({showSummary ? 'Hide' : 'Show'} Summary)</button>}</h1>

                    <hr />
                    <div>
                   
                    <p>Our payment option is cash on delivery. You can pay for your purchase when it arrives at your doorstep.</p>
               
                    <p>Please note that there is a delivery charge for all orders, which will be added to your total at checkout. Our standard delivery time is within a week from the date of purchase.</p>
                
                    </div>
                   <div>
                   <div>
                   <label htmlFor="name">Name:</label>
                    <input  disabled value={name} type="text" id="name"  placeholder="Name"  />
                   </div>
                   <div>
                   <label htmlFor="email">Email:</label>
                    <input disabled value={email} type="email" id="email"  placeholder="Email"  />
                   </div>
                    <div>
                    <label htmlFor="number">Phone Number:</label>
                    <input type="number" onChange={(e)=>setNumber(e.target.value)} disabled={user?.number && true} value={user?.number && number} placeholder="eg: 03456789"  id="number" />
                    </div>
                    <div>
                    <label htmlFor="address">Address: {user?.address && <FontAwesomeIcon onClick={()=>setEditAddress(prev=>!prev)}  className="icon" icon={faEdit} />}</label>
                    <input onChange={(e)=>setAddress(e.target.value)} disabled={editAddress && true} value={user?.address && address} type="text" placeholder="Street Address"  id="address" />
                    <input  onChange={(e)=>setOptionalAddress(e.target.value)}  disabled={editAddress} type="text" value={user?.address && optionalAddress} placeholder="Apartment, suite, unit, etc. (optional" id="optional" />
                    </div>
                    <div>
                    <label htmlFor="city">Town / City:</label>
                    <input onChange={(e)=>setCity(e.target.value)} disabled={editAddress && true} value={user?.address && city} type="text" placeholder="eg: Beirut"  id="city" />
                    </div>
                   </div>
                    <hr />
                <button className="btn"  onClick={checkout} type="button">{orderLoading ? 'Ordering' : 'Order'}</button>
                <button className="back" type="button" onClick={()=>{setCheckoutClicked(prev=>!prev);setShowSummary(true); scrollTop()}}>BACK TO CART DETAILS</button>
                 </div>

       </div>
  
       </Layout>
    )
}
export default Cart

export async function getServerSideProps(){
  await initMongoose()
    const products = await findAllProducts()
    const collections = await findAllCollections()
    return{
        props:{
            products: JSON.parse(JSON.stringify(products)),
            collections:JSON.parse(JSON.stringify(collections))
        }
    }
}