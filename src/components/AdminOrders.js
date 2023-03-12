
import Image from "next/image"
import Link from "next/link"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import { faClose, faFileInvoice} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ProductsContext } from "./ProductsContext"
function AdminOrders({orders}){

    const [search, setSearch] = useState('')
    const[viewProducts,setViewProducts]= useState({orderId : '', clicked:false})
    const[viewCustomer,setViewCustomer] = useState({orderId : '', clicked:false})

    const {setEditing} = useContext(ProductsContext)

   const markAsPaid = async (order) =>{
    const request= await fetch('/api/paid',
     {method:'POST',
     headers:{'Content-Type' : 'application/json'},
     body:JSON.stringify({orderID:order.orderID, currentValue :order.paid})
      })
      const response = await request.json()
      if(response){
          toast(`Order ${order.orderID} updated`)
      }
      else{
          toast('error')
      }
      setEditing(prev=>!prev)
     }
   
     const markAsDelivered = async (order) =>{
        const request= await fetch('/api/delivered',
         {method:'POST',
         headers:{'Content-Type' : 'application/json'},
         body:JSON.stringify({orderID:order.orderID, currentValue :order.paid})
          })
          const response = await request.json()
          if(response){
            toast(`Order ${order.orderID} updated.`)
          }
          else{
              toast('error')
          }
          setEditing(prev=>!prev)
         }
     
  
   function scrollTop(){
    document.querySelector('.tableContainer').scrollTop = 0;
    document.querySelector('.tableContainer').style.overflow = 'hidden';
    document.documentElement.scrollTop =0
   }

    return(
        <div className="tableContainer">
        <div className="tableHeader">
        <h1>Orders ({orders.length})</h1>
           <input type='text' onChange={(e)=>setSearch(e.target.value)} value={search} className="search" placeholder="Search by Order ID"/>
        </div>
              <table>
                <thead>
                <tr>
               <th>
                   Order ID
                </th>
                <th>
                   Customer
                </th>
                <th>
                    Products
                </th>
                <th>
                Paid
                </th>
                <th>
                Delivered
                </th>
                <th>
                Created at
                </th>
                <th>
               Total
                </th>
                <th>
               Invoice
                </th>
                
               </tr>
                </thead>
                <tbody>
                {!orders.length>0 && <div className="notFound"><p>No orders</p></div>}
               {orders.filter(order=>order.orderID.toString().includes(search)).map(order=>{
            return <tr key={order._id}>
                <td>{order.orderID}</td>
                <td className="tableLink"  onClick={()=>{setViewCustomer({orderId: order._id, clicked:true});scrollTop()}}>{orders.filter(orderSearch=>orderSearch._id == order._id).map(filteredProduct=>{ return filteredProduct.user.fName + " " +filteredProduct.user.lName})}</td>
                <td className="tableLink" onClick={()=>{setViewProducts({orderId: order._id, clicked:true}); scrollTop()}}>View Products</td>
                <td className="tableLink" style={{color:order.paid?'green' : 'rgb(255, 92, 100)'} } onClick={()=>markAsPaid(order)}>{order.paid ? 'Yes' : 'No'}</td>
                <td className="tableLink" style={{color:order.delivered?'green' : 'rgb(255, 92, 100)'}} onClick={()=>markAsDelivered(order)}>{order.delivered ? 'Yes' : 'No'}</td>
                <td>{order.createdAt.split('T')[0]}</td>
                <td>${order.total}</td>
                <td><Link className='invoiceIcon' href={`/admin/invoice/${order.orderID}`}><FontAwesomeIcon icon={faFileInvoice}/></Link></td>
            
            </tr>
            
                 })}
                 </tbody>
                
              </table>
              {viewProducts.clicked &&
               <div style={{height:viewProducts ? "100%" : '0'}} className="orderedProductsContainer">
                <FontAwesomeIcon onClick={()=>{setViewProducts({clicked:false});  document.querySelector('.tableContainer').style.overflow = 'hidden';}}icon={faClose} className='closeIcon' />
                <h2>Ordered Products</h2>
            <div className="orderedProducts">
            {orders.filter(order=>
                    order._id === viewProducts.orderId).map(orderDetails=> 
                        orderDetails.products.map(product=>{
                            return <div className="orderedProduct" key={product.name}>
                           <div>
                           <div><p>Product Name:</p>
                           <span> {product.name}</span></div>
                           <div><p>Product Price:</p>
                           <span> ${product.price}</span></div>  
                           <div><p>Product Quantitiy:</p>
                           <span> {product.quantity}</span></div>
                           
                           </div>
                             <Image className="orderedImg" src={product.image} alt={product.name} width={100} height={100} />
                           </div>
                        })             
                    )
                  } </div>  </div>    }  

                    {viewCustomer.clicked &&
               <div style={{height:viewCustomer ? "100%" : '0'}} className="orderedProductsContainer">
                <FontAwesomeIcon onClick={()=>{setViewCustomer({clicked:false});  document.querySelector('.tableContainer').style.overflow = 'unset';}} icon={faClose} className='closeIcon' />
                <h2>User Details</h2>
            <div className="orderedProducts">
            {orders.filter(order=> order._id === viewCustomer.orderId).map(orderDetails=> {
              return <div className="orderedProduct" key={orderDetails.user._id}>
                <div>
                <div><p>Name:</p>
                <span> {orderDetails.user.fName + " " +  orderDetails.user.lName}</span></div>
                <div><p>Email:</p>
                <span> {orderDetails.user.email}</span></div>  
                <div><p>Number:</p>
                <span> {orderDetails.user?.number ? orderDetails.user.number : 'N/A'}</span></div>  
                <div><p>Main Address:</p>
                <span> {orderDetails.user?.address.main ? orderDetails.user?.address.main : 'N/A'}</span></div>  
                <div><p>Secondary Address:</p>
                <span> {orderDetails.user?.address.secondary ? orderDetails.user?.address.secondary : 'N/A'}</span></div>  
                <div><p>City:</p>
                <span> {orderDetails.user?.address.city ? orderDetails.user?.address.city : 'N/A'}</span></div>  
                </div>
                </div>
             })        
            }

                    
                  </div>  </div>    }  
            </div>
    )
}
export default AdminOrders