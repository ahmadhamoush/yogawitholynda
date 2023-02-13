import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "@/components/ProductsContext"
import Image from "next/image"
function Cart(){

    const {selectedProducts,setSelectedProducts} = useContext(ProductsContext)
    const [cartInfo, setCartInfo] = useState([])
    
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

    let total =0;
    
   if(selectedProducts?.length && cartInfo?.length){
    for(let id of selectedProducts){
        const price = cartInfo.find(p=>p._id === id)?.price || 0
        total +=price
    }
   }
   

    return(
        <div>
            <Navbar />
            <h1>Cart</h1>

            {cartInfo.length && !cartInfo.message ? cartInfo.map(product=>{
            const amount =selectedProducts.filter(id=>id===product._id).length
            if(amount ===0) return
                return (
                   <div key={product._id}>
                        <p>{product.name}</p>
                        <Image alt={product.name} src={product.image} width={150} height={150}/>
                        <p>${product.price}</p>
                        <button onClick={()=>removeProduct(product._id)}>-</button>
                        <p>{amount}</p>
                        <button onClick={()=>addProduct(product._id)}>+</button>    
                    </div>
                )
            }):<p>No Products in Your Shopping Cart</p>}
                 <p>total: ${total}</p>  
            <Footer />
        </div>
    )
}
export default Cart
