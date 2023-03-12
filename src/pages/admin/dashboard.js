import Loader from "@/components/Loader"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"
import dynamic from "next/dynamic"
import { ProductsContext } from "@/components/ProductsContext"
const AdminOverview = dynamic(()=>import('@/components/AdminOverview'))
const AdminCustomers = dynamic(()=>import('@/components/AdminCustomers'))
const AdminProducts = dynamic(()=>import('@/components/AdminProducts'))
const AdminOrders = dynamic(()=>import('@/components/AdminOrders'))

function Dashboard(){
    const session = useSession()
    const router = useRouter()

   const [isOverview, setIsOverview] = useState(false)
   const [isCustomers, setIsCustomers] = useState(false)
   const [isProducts, setIsProducts] = useState(false)
   const [isOrders, setIsOrders] = useState(false)

   const [customers,setCustomers] =  useState([])
   const [products,setProducts] = useState([])
   const [orders, setOrders] = useState([])

   const {editing} = useContext(ProductsContext)
   
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
    if(session?.status==="unauthenticated" || !session.data?.user.isAdmin){
        router.push('/admin')
    }
   },[session,router])

   useEffect(()=>{
    const fetchProducts = async () =>{
        await fetch('/api/products').then(res=>res.json()).then(json=>setProducts(json))
    }
    fetchProducts()
   },[editing])

   useEffect(()=>{
    const fetchUsers = async () =>{
        await fetch('/api/users').then(res=>res.json()).then(json=>setCustomers(json))
    }
    fetchUsers()
   },[editing])

   useEffect(()=>{
    const fetchOrders = async () =>{
        await fetch('/api/orders').then(res=>res.json()).then(json=>setOrders(json))
    }
    fetchOrders()
   },[editing])

    return(
      <div className="dashboard">
        {session.status==="unauthenticated" || !session.data?.user.isAdmin && <Loader />}
        <div className="dashboardHeader">
            <Image alt="logo" className="img" width={100} height={100} src="/logo.png"/>
        <ul>
          <li onClick={showOverview} className={isOverview ? 'selected' :'notSelected'}>Overview</li>
          <li  onClick={showCustomers} className={isCustomers ? 'selected' :'notSelected'}>Customers</li>
          <li  onClick={showProducts} className={isProducts ? 'selected' :'notSelected'}>Products</li>
          <li  onClick={showOrders} className={isOrders ? 'selected' :'notSelected'}>Orders</li>
          <li className="logoutAdmin" onClick={()=>signOut()}>Logout</li>
          </ul>
        </div>
    
        {!isOverview && !isCustomers && !isProducts && !isOrders && <div className="adminWelcome">
            <h4>Welcome, Admin</h4><p>Press any of the links to start navigating!</p></div>}
        {isOverview && <AdminOverview customers={customers} orders={orders} />}
        {isCustomers && <AdminCustomers customers={customers} />}
        {isProducts && <AdminProducts products={products} />}     
        {isOrders && <AdminOrders orders={orders} /> }
      </div>
    )
}
export default Dashboard