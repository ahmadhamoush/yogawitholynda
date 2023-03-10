import Layout from "@/components/Layout"
import Loader from "@/components/Loader"
import { initMongoose } from "lib/mongoose"
import Link from "next/link"
import { useEffect, useReducer } from "react"
import { findAllCollections } from "../api/collections"
import { findAllProducts } from "../api/products"


function reducer(state,action){
    switch (action.type){
        case 'FETCH_REQUEST':
            return {...state, loading:true,error:''}
        case 'FETCH_SUCCESS':
            return{...state, loading:false, orders:action.payload, error:''}
        case 'FETCH_FAIL':
            return{...state, loading:false, error:action.payload}
        default: return state
    }
}
export default function OrderHistory({collections,products}){

    const [{loading,error,orders}, dispatch] = useReducer(reducer,{
        loading:true,
        orders:[],
        error:''
    })
    useEffect(()=>{
        const fetchOrders = async ()=>{
             try{
                dispatch({type:'FETCH_REQUEST'})
                const data = await fetch('/api/orders/history').then(res=>res.json())
                dispatch({type:"FETCH_SUCCESS", payload:data})
             }catch(err){
                dispatch({type:'FETCH_FAIL',payload: err})
             }
        }
        fetchOrders()
    },[])
    return(
       <Layout collections={collections} products={products}>
          {loading ? <Loader /> :<div className="orderHistoryContainer">
          <h2>Order History</h2>
            {!orders ? <h2>No Orders found</h2>:<div className="tableResponsive">

            <table>
                   <thead>
                    <tr>
                        <th>
                        ID
                        </th>
                        <th>
                        DATE
                        </th>
                        <th>
                        TOTAL
                        </th>
                        <th>
                        PAID
                        </th>
                        <th>
                        DELIVERED
                        </th>
                        <th>
                        ACTION
                        </th>
                    </tr>
                   </thead>
                   <tbody>
                    {!orders.length && <div style={{borderRadius:'0'}} className="notFound"><h2>No Order found</h2></div>}
            {orders.map(order=>{
                return (
                    <tr key={order._id}>
                 <td>{order.orderID} </td>
               <td>{order.createdAt.split('T')[0]}</td>
                <td>${order.total}</td>
                <td style={{borderRadius:'0'}} className={order.paid? 'success' : 'err'}>{order.paid ? 'Paid' : 'Not Paid'}</td>
                <td style={{borderRadius:'0'}} className={order.delivered? 'success' : 'err'}>{order.delivered ? 'Delivered' : 'Not Delivered'}</td>
                <td className="details">
                <Link href={`/order/${order.orderID}`}>
                    <p>Details</p>
                </Link>
                </td>
                       
                    </tr>
                )
            })}
               </tbody>
                    </table>
            </div>
            
            }
         
            </div>
              } 
       </Layout>
    )
}
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