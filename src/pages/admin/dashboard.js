import { faClose, faFileInvoice, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

function Dashboard(){
   const [isOverview, setIsOverview] = useState(true)
   const [isCustomers, setIsCustomers] = useState(false)
   const [isCollections, setIsCollections] = useState(false)
   const [isProducts, setIsProducts] = useState(false)
   const [isOrders, setIsOrders] = useState(false)

   const [customers,setCustomers] =  useState([])
   const[collections,setCollections] = useState([])
   const [products,setProducts] = useState([])
   const [orders, setOrders] = useState([])

   const[name,setName] = useState('')
   const[price,setPrice] = useState('')
   const[category,setCategory] = useState('')
   const[featured,setFeatured] = useState(false)
   const[color,setColor] = useState('')
   const[stock,setStock] = useState('')
   const[selectedInput,setSelectedInput] = useState('')
   const[productId,setProductId] = useState('')
   const[viewProducts,setViewProducts]= useState({orderId : '', clicked:false})
   const[viewCustomer,setViewCustomer] = useState({orderId : '', clicked:false})
   const[search,setSearch] = useState('')
   const[editProduct,setEditProduct] = useState('')
   
   function showOverview(){
    setIsOverview(true)
    setIsCustomers(false)
    setIsCollections(false)
    setIsProducts(false)
    setIsOrders(false)
   }
   function showCustomers(){
    setIsOverview(false)
    setIsCustomers(true)
    setIsCollections(false)
    setIsCollections(false)
    setIsProducts(false)
    setIsOrders(false)
   }
   function showCollections(){
    setIsOverview(false)
    setIsCustomers(false)
    setIsCollections(true)
    setIsProducts(false)
    setIsOrders(false)
   }
   function showProducts(){
    setIsOverview(false)
    setIsCustomers(false)
    setIsCollections(false)
    setIsProducts(true)
    setIsOrders(false)
   }

   function showOrders(){
    setIsOverview(false)
    setIsCustomers(false)
    setIsCollections(false)
    setIsProducts(false)
    setIsOrders(true)
   }

   useEffect(()=>{
    fetch('/api/products').then(res=>res.json()).then(json=>setProducts(json))
    fetch('/api/users').then(res=>res.json()).then(json=>setCustomers(json))
    fetch('/api/orders').then(res=>res.json()).then(json=>setOrders(json))
   },[])

    async function edit(e){
    const child =  await e.currentTarget.parentElement.firstChild
    setSelectedInput(child.name)
    setProductId(child.classList.value)
    console.log(child)
   }

     function saveEdit(){
     
    products.forEach(product=>{
        if(product._id === productId){
            switch(selectedInput){
                case "name":
                    product.name = name
                    setName('')
                    console.log('logged')
                    break
                case "price":
                    product.price = Number(price)
                    console.log('logged')
                    setPrice('')
                    break
                case "category":
                    product.category = category
                    setCategory('') 
                    break
                case "featured":
                      product.featured = featured === 'true' ? true : false
                      break
                case "color":
                     product.color = color
                     setColor('')
                      break
                case "stock":
                    product.stock = Number(stock)
                     setStock('')
                      break
            }
           fetch('/api/products', {method:'POST', headers:{'Content-Type': 'application/json'},body:JSON.stringify(product)}).then(res=>res.json()).then(json=>toast(`${json.productUpdated.name} updated successfully`))
        }
       
    })
    setProductId('')
    console.log(products)
   }
    return(
      <div className="dashboard">
        <div className="dashboardHeader">
            <Image alt="logo" className="img" width={100} height={100} src="/logo.png"/>
        <ul>
          <li onClick={showOverview} className={isOverview ? 'selected' :'notSelected'}>Overview</li>
          <li  onClick={showCustomers} className={isCustomers ? 'selected' :'notSelected'}>Customers</li>
          <li  onClick={showCollections} className={isCollections ? 'selected' :'notSelected'}>Collections</li>
          <li  onClick={showProducts} className={isProducts ? 'selected' :'notSelected'}>Products</li>
          <li  onClick={showOrders} className={isOrders ? 'selected' :'notSelected'}>Orders</li>
          </ul>
        </div>
    
        
        {isOverview && 
        <div className="overview"> 
            <h1>Overview</h1>
            <div className="overviewFlex">
            <div className="card">
                <h4>Total Customers</h4>
                <p>30</p>
            </div>
            <div className="card">
                <h4>Total Orders</h4>
                <p>100</p>
            </div>
            <div className="card">
                <h4>Revenue</h4>
                <p>30</p>
            </div>
            </div>
         </div>}

         {isCustomers && 
         <div className="tableContainer">
               <h1>Customers ({customers.length})</h1>
         
                  <table>
                 <thead>
                 <tr>
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Address
                    </th>
                    <th>
                        City
                    </th>
                   </tr>
                 </thead>
                 <tbody>
                   {customers.map(customer=>{
                return  <tr key={customer.fName}>
                    <td>{customer.fName}</td>
                    <td>{customer.lName}</td>
                    <td>{customer.email}</td>
                </tr>
                
                     })}
                     </tbody>
                  </table>
    
                
       
            </div>}

            {isProducts && 
         <div className="productsContainer">
         <div style={{opacity: editProduct && '0.5'}}className="tableHeader">
         <h1>Products ({products.filter(product=>product.name.toLowerCase().includes(search)).length})</h1>
                <input type='text' onChange={(e)=>{setSearch(e.target.value);setEditProduct('')}} value={search} className="search" placeholder="Search"/>
         </div>
            {productId &&  <div className="editContainer">
                <FontAwesomeIcon icon={faClose} className='close' onClick={()=>setProductId('')}/>
                <h1>edit</h1>
                {products.map(product=>{
                   return product._id === productId && 
                   <div key={product._id}>
                             <span className="id">id: {productId}</span>
                     <span className="id">Name: {product.name}</span>
                    <span className="id">Price: {product.price}</span>
                    <span className="id">Category: {product.category}</span>
                    <span className="id">Featured: {product.featured ? 'Yes' : 'No'}</span>
                    <span className="id">Color: {product.color}</span>
                    <span className="id">Stock: {product.stock}</span>
                   </div>
                })}

              {selectedInput === 'name' &&
               <div>
              <label htmlFor="">Name</label>
             <input type="text"  placeholder="name" onChange={(e)=>setName(e.target.value)} value={name} /></div>
             }  
               {selectedInput === 'price' &&
               <div>
              <label htmlFor="">Price</label>
             <input type="number"  placeholder="price" onChange={(e)=>setPrice(e.target.value)} value={price} /></div>
             }  
               {selectedInput === 'category' &&
               <div>
              <label htmlFor="">Category</label>
             <input type="text"  placeholder="category" onChange={(e)=>setCategory(e.target.value)} value={category} /></div>
             } 

            {selectedInput === 'featured' &&
               <div>
              <label htmlFor="">Featured</label>
             <select value={featured} onChange={(e)=>setFeatured(e.target.value)}>
                <option value='true'>Yes</option>
                <option value='false'>No</option>
             </select>
             </div>
             } 
            {selectedInput === 'color' &&
               <div>
              <label htmlFor="">Color</label>
             <input type="text"  placeholder="color" onChange={(e)=>setColor(e.target.value)} value={color} /></div>
             } 
             {selectedInput === 'stock' &&
               <div>
              <label htmlFor="">Stock</label>
             <input type="number"  placeholder="stock" onChange={(e)=>setStock(e.target.value)} value={stock} /></div>
             }  


             <button onClick={saveEdit}>Save Edit</button>
             </div>}

             <div className="productsScroll">
             {products.filter(product=>product.name.toLowerCase().includes(search)).map(product=>{
                return <div style={{display: product._id!==editProduct.id && editProduct && 'none' ,width: product._id!==editProduct.id && editProduct && '100%'}} className="productCard" id={product._id}  key={product._id}>
                   <div className="icons">  <FontAwesomeIcon icon={faTrash} className='trash' /></div>
                   <span className="id">id: {product._id}</span>
                   <Image className="productImg" onClick={()=>setEditProduct({id:product._id})} src={product.image} alt={product.name} width={120} height={120} />
          {product._id===editProduct.id && <div>
            <FontAwesomeIcon icon={faClose} className='closeIcon' onClick={()=>setEditProduct('')}/>
                  <div className="inputContainer">
                        <label htmlFor={product._id}>Product Name</label>
                   <div>
                   <input className={product._id} name='name' disabled type="text" value={product.name} />
                    <FontAwesomeIcon onClick={edit}  icon={faPenToSquare} className='edit' />
                   </div>   
                    </div>
                    <div className="inputContainer">
                        <label htmlFor={product._id}>Product Price</label>
                   <div>
                   <input className={product._id} name='price' disabled type="number" value={product.price} />
                    <FontAwesomeIcon onClick={edit}  icon={faPenToSquare} className='edit' />
                   </div>
                    </div>
                    <div className="inputContainer">
                        <label htmlFor={product._id}>Product Category</label>
                   <div>
                   <input className={product._id} name='category' disabled type="text" value={product.category.split('-').join(' ')} />
                    <FontAwesomeIcon onClick={edit}  icon={faPenToSquare} className='edit' />
                   </div>
                    </div>
                    <div className="inputContainer">
                        <label htmlFor={product._id}>Product Featured</label>
                   <div>
                   <input className={product._id} name='featured' disabled type="text" value={product.featured ? 'Yes' : 'No'} />
                    <FontAwesomeIcon onClick={edit}  icon={faPenToSquare} className='edit' />
                   </div>
                    </div>
                    <div className="inputContainer">
                        <label htmlFor={product._id}>Product Color</label>
                   <div>
                   <input className={product._id} name='color' disabled type="text" value={product.color} />
                    <FontAwesomeIcon onClick={edit}  icon={faPenToSquare} className='edit' />
                   </div>
                    </div>
                    <div className="inputContainer">
                        <label htmlFor={product._id}>Product Stock</label>
                   <div>
                   <input className={product._id} name='stock' disabled type="number" value={product.stock} />
                    <FontAwesomeIcon onClick={edit} icon={faPenToSquare} className='edit' />
                   </div>
                    </div>
                  </div>}
                  
                </div>
                     })}
             </div>
                    
            </div>}

            {isOrders && 
         <div className="tableContainer">
            <div className="tableHeader">
            <h1>Orders ({orders.length})</h1>
               <input type='text' onChange={(e)=>setSearch(e.target.value)} value={search} className="search" placeholder="Search"/>
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
                
                   {orders.map(order=>{
                return <tr key={order._id}>
                    <td>{order.orderID}</td>
                    <td className="tableLink"  onClick={()=>setViewCustomer({orderId: order._id, clicked:true})}>{orders.filter(orderSearch=>orderSearch._id == order._id).map(filteredProduct=>{ return filteredProduct.user.fName + " " +filteredProduct.user.lName})}</td>
                    <td className="tableLink" onClick={()=>setViewProducts({orderId: order._id, clicked:true})}>View Products</td>
                    <td style={{color:order.paid?'green' : 'red'} }>{order.paid ? 'Yes' : 'No'}</td>
                    <td>{order.createdAt.split('T')}</td>
                    <td>${order.total}</td>
                    <td><FontAwesomeIcon icon={faFileInvoice} className='invoice'/></td>
                    <td> <button className="orderBtn">{order.paid ? 'Mark as unpaid' : 'Mark as paid'}</button></td>
                </tr>
                
                     })}
                     </tbody>
                     {viewProducts.clicked &&
                   <div style={{height:viewProducts ? "100%" : '0'}} className="orderedProductsContainer">
                    <FontAwesomeIcon onClick={()=>setViewProducts({clicked:false})} icon={faClose} className='closeIcon' />
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
                    <FontAwesomeIcon onClick={()=>setViewCustomer({clicked:false})} icon={faClose} className='closeIcon' />
                    <h2>User Details</h2>
                <div className="orderedProducts">
                {orders.filter(order=> order._id === viewCustomer.orderId).map(orderDetails=> {
                  return <div className="orderedProduct" key={orderDetails.user._id}>
                    <div>
                    <div><p>Name:</p>
                    <span> {orderDetails.user.fName + " " +  orderDetails.user.lName}</span></div>
                    <div><p>Email:</p>
                    <span> {orderDetails.user.email}</span></div>  
                    {/* <div><p>Product Quantitiy:</p>
                    <span> {product.quantity}</span></div> */}
                    </div>
                    </div>
                 })        
                }

                        
                      </div>  </div>    }  
                  </table>
                      
                </div>
                }
      </div>
    )
}
export default Dashboard