import { useContext, useState } from "react";
import Loader from "./Loader";
import axios from "axios"
import { faClose,faPenToSquare, faTrash,faAdd} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { toast } from "react-toastify"
import { ProductsContext } from "./ProductsContext";
function AdminProducts({products }) {

    const [search, setSearch] = useState('')

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

    const[editProduct,setEditProduct] = useState('')
    const[addProduct, setAddProduct] = useState(false)
    const[confirmDeleteProduct, setConfirmDeleteProduct] = useState({id:'',clicked:false})
    
    const {setEditing} = useContext(ProductsContext)

    async function deleteProduct(id){
        const request= await fetch('/api/delete',
         {method:'POST',
         headers:{'Content-Type' : 'application/json'},
         body:JSON.stringify({deleteID:id})
          })
          const response = await request.json()
          if(response){
              toast('Deleted Product with id: ' + id)
          }
          else{
              toast('error')
          }
          setEditing(prev=>!prev)
         }
         
      
          async function edit(e){
          const child =  await e.currentTarget.parentElement.firstChild
          setSelectedInput(child.name)
          setProductId(child.classList.value)
         }
      
         
        async function saveEdit(){
           
          products.forEach(async product=>{
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
                      await fetch('/api/products', {method:'POST', headers:{'Content-Type': 'application/json'},body:JSON.stringify(product)}).then(res=>res.json()).then(json=>{toast(`${json.productUpdated.name} updated successfully`),setEditProduct(prev=>!prev)}) 
                  }
                  else{
                      toast('Value should not be empty')
                  } 
              }
             
          })
          setProductId('')
          setEditing(prev=>!prev)
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
                        toast('Product Added Successfully.')
                        setNewName('')
                        setNewPrice('')
                        setNewCategory('')
                        setNewFeatured('')
                        setNewColor('')
                        setNewStock('')
                        setDescArr([])
                        setSelectedFile('')
                        setSelectedImage('')
                        setUploading(false)
                        setAddProduct(prev=>!prev)
                    }
                }
                else{
                    toast('Values should not be empty')
                }
                setEditing(prev=>!prev)
            }
            catch(err){
                console.log(err.response?.data)
            }
              
           }
         

    return (
<div className="productsContainer">
         {!products.length>0 && <Loader />}
         <div style={{opacity: editProduct && '0.5'}}className="tableHeader">
         <h1>Products ({products.filter(product=>product.name.toLowerCase().includes(search)).length})</h1>
                <input type='text' onChange={(e)=>{setSearch(e.target.value);setEditProduct('')}} value={search} className="search" placeholder="Search by Name"/>
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
                               {confirmDeleteProduct.id === product._id &&confirmDeleteProduct.clicked &&  ( <div className="deleteProduct">
                                <p>Are you sure you want to delete this product?</p>
                                <button  className="success" onClick={()=>{deleteProduct(confirmDeleteProduct.id)}}>YES</button>
                                <button className="err" onClick={()=>setConfirmDeleteProduct({id:'',clicked:false})}>NO</button>
                                </div>)}
                   <div className="icons">  <FontAwesomeIcon onClick={()=>setConfirmDeleteProduct({id:product._id, clicked:true})} icon={faTrash} className='trash' /></div>
                   <span className="id">id: {product._id}</span>
                   <span className="sold">sold: {product.count}</span>
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
           <div>
           <input onChange={(e)=>setNewName(e.target.value)} value={newName} type="text" placeholder="Name" />
           </div>
           <div>
           <input onChange={(e)=>setNewPrice(e.target.value)}  value={newPrice} type="number" placeholder="Price" />
           </div>
            <div className="categoryContainer">
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
              <select  value={newFeatured} onChange={(e)=>setNewFeatured(e.target.value)} name="" id="newFeatured">
              <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
             </div>
             <div>
           <input onChange={(e)=>setNewColor(e.target.value)} value={newColor} type="text" placeholder="Color" />
           </div>
           <div>
           <input onChange={(e)=>setNewStock(e.target.value)} value={newStock} type="number" placeholder="Stock" />
           </div>
           <div className="descContainer"> 
           <input onChange={(e)=>setNewDesc(e.target.value)} value={newDesc} type="text" placeholder="Description" />
           <button className="descBtn" onClick={()=>{newDesc !== '' ? setDescArr(prev=>[...prev, newDesc]):toast('Value should not be empty');setNewDesc('')}}><FontAwesomeIcon icon={faAdd}/></button>
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
          </div>
          <div className="newDetails">
          <p>Name: {newName}</p>
            <p>Price: ${newPrice}</p>
            <p>Category: {newCategory}</p>
            <p>Color: {newColor}</p>
            <p>Featured: {newFeatured}</p>
            <p>Stock: {newStock}</p>
            <p>Description:{descArr.map((desc,i)=><p key={i}> {desc}</p>)}</p>
            <button className="addProductBtn" onClick={handleUpload} disabled={uploading} style={{opacity:uploading ? '.5' : '1'}}>
            {uploading ? 'Uploading...' : 'Add Product'}
           </button>
          </div>
          
            </div>} 
           
            </div>
    )
}
export default AdminProducts