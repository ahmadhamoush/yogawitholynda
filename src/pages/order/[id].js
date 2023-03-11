import Layout from "@/components/Layout"
import Loader from "@/components/Loader"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { initMongoose } from "lib/mongoose"
import { useRouter } from "next/router"
import { useEffect, useReducer} from "react"
import { findAllCollections } from "../api/collections"
import { findAllProducts } from "../api/products"

function reducer(state,action){
    switch(action.type){
        case 'FETCH_REQUEST':
return{...state,loading:true,error:''}
case 'FETCH_SUCCESS':
    return{...state,loading:false,order:action.payload,error:''}
    case 'FETCH_FAIL':
        return{...state,loading:false,error:action.payload}
        default: return state
    }
}
function Order({products,collections}) {
    const router = useRouter()
    const session = useSession()
     const [{loading,error,order},dispatch,] = useReducer(reducer,{
        loading:true,
        order: {},
        error:''
    })


    useEffect(()=>{
        const fetchOrder = async ()=>{
            try{
                dispatch({type:'FETCH_REQUEST'})
                const data = await fetch(`/api/order/${router.query.id}`).then(res=>res.json())
                dispatch({type:'FETCH_SUCCESS', payload:data})
            }
            catch(err){
                dispatch({type:"FETCH_FAIL", payload:err})
            }

        }
        fetchOrder()
    },[router.query.id])
    return(
      <Layout products={products} collections={collections}>
            {loading ? <Loader /> :<div className="orderContainer">
            {!order ? <h2>No Order found</h2>:<div>
            <h2>ORDER #{order.orderID}</h2>
       {session.status ==='authenticated' ? (
         <div className="orderFlex">
         <div className="orderDetailsContainer">
         <div className="orderDetails">
                     <h4>Shipping Address</h4>
                     <p>{`${order.user.address.main}, ${order.user.address.secondary}, ${order.user.address.city}`}</p>
                     <p className={order.delivered? 'success' : 'err'}>{order.delivered ? 'Delivered' : 'Not Delivered'}</p>
                 </div>
                 <div className="orderDetails">
                     <h4>Payment Method</h4>
                     <p>Cash On Delivery</p>
                     <p className={order.paid? 'success' : 'err'}>{order.paid ? 'Paid' : 'Not Paid'}</p>
                 </div>
                 <div className="orderDetails">
                     <h4>Order Items</h4>
                     <div className="orderedPoducts"> 
                       {order.products.map(item=>{
                             return  <div key={item.name}>
                                <div className="itemSummary">
                                <Image className="summaryImg" src={item.image} width={70} height={70} alt={item.name} />
                                <p className="summaryQnty">{item.quantity}</p>
                                </div>
                                <p>{item.name}</p>
                            <p className="price">${item.price}</p>
                            </div>
                         })}
                       </div>
                 </div>         
         </div>
         <div className="orderSummary">
            <div className="orderDetails">
            <h4>Order Summary</h4>
             <div>
             <p>Items</p>
             <p>{order.products.length}</p>
             </div>
             <div>
             <p>Delivery</p>
             <p className="price">${order.total - order.subtotal}</p>
                 </div> <div>
             <p>Subtotal</p>
             <p className="price">${order.subtotal}</p>
             </div>
             <div>
             <p>Total</p>
             <p className="price">${order.total}</p>
                 </div>
            </div>
         </div>
             </div>
       ):<p>You should be authenticated to view order details</p>}
            </div>}
         
            </div>
              }
            
            
        </Layout>
    )
}

Order.auth=true
export default Order
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