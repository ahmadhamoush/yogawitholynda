import { faClose, faFileInvoice, faPenToSquare, faTrash , faAdd} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

function Dashboard(){
   const [isOverview, setIsOverview] = useState(true)
   const [isCustomers, setIsCustomers] = useState(false)
   const [isProducts, setIsProducts] = useState(false)
   const [isOrders, setIsOrders] = useState(false)

   const [customers,setCustomers] =  useState([])
   const [products,setProducts] = useState([])
   const [orders, setOrders] = useState([])

   const[name,setName] = useState('')
   const[price,setPrice] = useState('')
   const[category,setCategory] = useState('')
   const[featured,setFeatured] = useState('')
   const[color,setColor] = useState('')
   const[stock,setStock] = useState('')

   const[newName,setNewName] = useState('')
   const[newPrice,setNewPrice] = useState('')
   const[newCategory,setNewCategory] = useState('')
   const[newFeatured,setNewFeatured] = useState('')
   const[newColor,setNewColor] = useState('')
   const[newStock,setNewStock] = useState('')
   const[newDesc,setNewDesc] = useState('')
   const[descArr,setDescArr] = useState([])
   const[uploading,setUploading] = useState(false)
   const[selectedImage,setSelectedImage] = useState('')
   const[selectedFile,setSelectedFile] = useState('')


   const[selectedInput,setSelectedInput] = useState('')
   const[productId,setProductId] = useState('')
   const[viewProducts,setViewProducts]= useState({orderId : '', clicked:false})
   const[viewCustomer,setViewCustomer] = useState({orderId : '', clicked:false})
   const[search,setSearch] = useState('')
   const[editProduct,setEditProduct] = useState('')
   const[addProduct, setAddProduct] = useState(false)
   
   function showOverview(){
    setIsOverview(true)
    setIsCustomers(false)
    setIsProducts(false)
    setIsOrders(false)
   }
   function showCustomers(){
    setIsOverview(false)
    setIsCustomers(true)
    setIsProducts(false)
    setIsOrders(false)
   }

   function showProducts(){
    setIsOverview(false)
    setIsCustomers(false)
    setIsProducts(true)
    setIsOrders(false)
   }

   function showOrders(){
    setIsOverview(false)
    setIsCustomers(false)
    setIsProducts(false)
    setIsOrders(true)
   }

   useEffect(()=>{
    fetch('/api/products').then(res=>res.json()).then(json=>setProducts(json))
    fetch('/api/users').then(res=>res.json()).then(json=>setCustomers(json))
    fetch('/api/orders').then(res=>res.json()).then(json=>setOrders(json))
   },[])
   const profit = () => {

    let total_profit = 0;
    for (let i = 0; i <orders.length; i++) {
      total_profit+=orders[i].total
    }
    return total_profit
}


   const handleUpload = async ()=>{
    try{
        const formData = new FormData();
        if(newName !== '' && newPrice !=='' && newCategory!=='' && newFeatured!=='' && newColor!=='' && newStock!== '' && descArr.length>0 && selectedFile!==''){
            setUploading(true)
            formData.append('name', newName);
            formData.append('price', newPrice);
            formData.append('category', newCategory);
            formData.append('featured', newFeatured === 'true' ? true :false);
            formData.append('color', newColor);
            formData.append('stock', newStock);
            formData.append('description', descArr);
            formData.append('img', selectedFile);
            const {data} = await axios.post('/api/add',formData);
            if(data.done==='ok'){
                toast('Product Added Successfully')
                setNewName('')
                setNewPrice('')
                setNewCategory('')
                setNewFeatured('')
                setNewColor('')
                setNewStock('')
                setDescArr([])
                setSelectedFile('')
                setSelectedImage('')
            }
        }
        else{
            toast('Values should not be empty')
        }
       
    }
    catch(err){
        console.log(err.response?.data)
    }
        setUploading(false)
        setAddProduct(prev=>!prev)
   }
 

   async function deleteProduct(id){
  const request= await fetch('/api/delete',
   {method:'POST',
   headers:{'Content-Type' : 'application/json'},
   body:JSON.stringify({deleteID:id})
    })
    const response = await request.json()
    console.log(response)
   
   }

    async function edit(e){
    const child =  await e.currentTarget.parentElement.firstChild
    setSelectedInput(child.name)
    setProductId(child.classList.value)
    console.log(child)
   }

     function saveEdit(){
     
    products.forEach(product=>{
        let valid =false
        if(product._id === productId){
            switch(selectedInput){
                case "name":
                   if(name!==''){
                    product.name = name
                    setName('')
                    valid=true
                   }
                    break
                case "price":
                    if(price!==''){
                        product.price = Number(price)
                        setPrice('')
                        valid=true
                    }
                    break
                case "category":
                   if(category!==''){
                    product.category = category
                    setCategory('') 
                    valid=true
                   }
                    break
                case "featured":
                    if(featured!==''){
                        product.featured = featured === 'true' ? true : false
                        setFeatured('') 
                        valid=true
                       }
                     
                      break
                case "color":
                    if(color!==''){
                        product.color = color
                        setColor('')
                        valid=true
                    }
                      break
                case "stock":
                    if(stock!==''){
                        product.stock = Number(stock)
                        valid=true
                    }
                      break
            }
            if(valid){
                fetch('/api/products', {method:'POST', headers:{'Content-Type': 'application/json'},body:JSON.stringify(product)}).then(res=>res.json()).then(json=>{toast(`${json.productUpdated.name} updated successfully`),setEditProduct(prev=>!prev)}) 
            }
            else{
                toast('Value should not be empty')
            } 
        }
       
    })
    setProductId('')
    console.log(products)
   }
   function scrollTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop =0
   }
    return(
      <div className="dashboard">
        <div className="dashboardHeader">
            <Image alt="logo" className="img" width={100} height={100} src="/logo.png"/>
        <ul>
          <li onClick={showOverview} className={isOverview ? 'selected' :'notSelected'}>Overview</li>
          <li  onClick={showCustomers} className={isCustomers ? 'selected' :'notSelected'}>Customers</li>
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
                <p>{customers.length}</p>
            </div>
            <div className="card">
                <h4>Total Orders</h4>
                <p>{orders.length}</p>
            </div>
            <div className="card">
                <h4>Revenue</h4>
              <p>${profit()}</p>
            </div>
            </div>
         </div>}

         {isCustomers && 
         <div className="tableContainer">    
               <div className="tableHeader">
               <h1>Customers ({customers.length})</h1>
               <input type='text' onChange={(e)=>setSearch(e.target.value)} value={search} className="search" placeholder="Search"/>
            </div>
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
                        Number
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
                    <td style={{color:  !customer?.number && 'rgb(255, 92, 100)' }}>{customer?.number ? customer.number : 'N/A'}</td>
                    <td style={{color:  !customer?.number && 'rgb(255, 92, 100)' }}>{customer?.address ? customer.address.main + ' ' + customer.address.secondary: 'N/A'}</td>
                    <td style={{color:  !customer?.number && 'rgb(255, 92, 100)' }}>{customer?.address ? customer.address.city : 'N/A'}</td>
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
                <FontAwesomeIcon icon={faClose} className='closeIcon' onClick={()=>setProductId('')}/>
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
               <div className="categoryContainer">
              <label htmlFor="category">Category</label>
              <select onChange={(e)=>setCategory(e.target.value)} name="" id="category">
              <option value="">Select</option>
                <option value="yoga-mats-bags">Yoga Bags</option>
                <option value="yoga-mats-kits">Yoga Kits</option>
                <option value="yoga-socks">Yoga Socks</option>
                <option value="yoga-incense-burners">Incense Burners</option>
                <option value="yoga-incense-holders">Incense Holders</option>
              </select>
             </div>
             } 

            {selectedInput === 'featured' &&
               <div>
              <label htmlFor="">Featured</label>
             <select className="featured" value={featured} onChange={(e)=>setFeatured(e.target.value)}>
             <option value=''>Select</option>
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
                   <div className="icons">  <FontAwesomeIcon onClick={()=>deleteProduct(product._id)} icon={faTrash} className='trash' /></div>
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
            <h1 className="addHeader" onClick={()=>setAddProduct(prev=>!prev)}>Add Product</h1>
           {addProduct && <div className="addProduct">
          <div className="editNewDetails">
          <h1>Add Product</h1>
           <div>
           <label htmlFor="newName">Name</label>
           <input onChange={(e)=>setNewName(e.target.value)} value={newName} type="text" placeholder="Name" />
           </div>
           <div>
           <label htmlFor="newPrice">Price</label>
           <input onChange={(e)=>setNewPrice(e.target.value)}  value={newPrice} type="number" placeholder="Price" />
           </div>
            <div className="categoryContainer">
              <label htmlFor="newCategory">Category</label>
              <select value={newCategory} onChange={(e)=>setNewCategory(e.target.value)} name="" id="newCategory">
              <option value="">Select</option>
                <option value="yoga-mats-bags">Yoga Bags</option>
                <option value="yoga-mats-kits">Yoga Kits</option>
                <option value="yoga-socks">Yoga Socks</option>
                <option value="yoga-incense-burners">Incense Burners</option>
                <option value="yoga-incense-holders">Incense Holders</option>
              </select>
             </div>
             <div className="categoryContainer">
              <label htmlFor="newFeatured">Featured</label>
              <select  value={newFeatured} onChange={(e)=>setNewFeatured(e.target.value)} name="" id="newFeatured">
              <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
             </div>
             <div>
           <label htmlFor="newColor">Color</label>
           <input onChange={(e)=>setNewColor(e.target.value)} value={newColor} type="text" placeholder="Color" />
           </div>
           <div>
           <label htmlFor="newStock">Stock</label>
           <input onChange={(e)=>setNewStock(e.target.value)} value={newStock} type="number" placeholder="Stock" />
           </div>
           <div>
           <label htmlFor="newDesc">Description</label>
           <input onChange={(e)=>setNewDesc(e.target.value)} value={newDesc} type="text" placeholder="Description" />
           <button onClick={()=>{newDesc !== '' ? setDescArr(prev=>[...prev, newDesc]):toast('Value should not be empty');setNewDesc('')}}><FontAwesomeIcon icon={faAdd}/></button>
           </div>   
           <label>
            <input type="file" hidden onChange={({target})=>{
                const types = ['image/jpeg','image/jpg','image/png','image/webp']
                if(target.files){
                    const file =target.files[0];
                    if(types.includes(file.type)){
                        setSelectedImage(window.URL.createObjectURL(file));
                        setSelectedFile(file)
                    }
                    else{
                        toast('File Type Not Accepted')
                    }
                }
            }} />
            <div>
                {selectedImage ? (
                 <Image className="productImg" src={selectedImage} alt='' width={120} height={120} />
                ):<p className="selectImage">Select Image <FontAwesomeIcon icon={faAdd} /></p>}
            </div>
           </label>
           <button onClick={handleUpload} disabled={uploading} style={{opacity:uploading ? '.5' : '1'}}>
            {uploading ? 'Uploading...' : 'Add Product'}
           </button>
          </div>
          <div className="newDetails">
          <p>Name: {newName}</p>
            <p>Price: ${newPrice}</p>
            <p>Category: {newCategory}</p>
            <p>Color: {newColor}</p>
            <p>Featured: {newFeatured}</p>
            <p>Stock: {newStock}</p>
            <p>Description:</p>
            {descArr.map((desc,i)=><ul key={i}><li><p>{desc}</p></li></ul>)}
          </div>
            </div>} 
           
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
                    <td className="tableLink"  onClick={()=>{setViewCustomer({orderId: order._id, clicked:true});scrollTop()}}>{orders.filter(orderSearch=>orderSearch._id == order._id).map(filteredProduct=>{ return filteredProduct.user.fName + " " +filteredProduct.user.lName})}</td>
                    <td className="tableLink" onClick={()=>{setViewProducts({orderId: order._id, clicked:true}); scrollTop()}}>View Products</td>
                    <td style={{color:order.paid?'green' : 'rgb(255, 92, 100)'} }>{order.paid ? 'Yes' : 'No'}</td>
                    <td>{order.createdAt.split('T')}</td>
                    <td>${order.total}</td>
                    <td><FontAwesomeIcon icon={faFileInvoice} className='invoice'/></td>
                    <td className="actions"> <button className="orderBtn">{order.paid ? 'Mark as unpaid' : 'Mark as paid'}</button>
                    <button className="orderBtn">{order.paid ? 'Mark as undelivered' : 'Mark as delivered'}</button>
                    </td>
                
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