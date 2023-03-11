import { initMongoose } from "lib/mongoose"
import { findAllCollections } from "../api/collections"
import { findAllProducts } from "../api/products"
import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { toast } from "react-toastify"
import Loader from "@/components/Loader"

function Profile ({products,collections}){

    const [user,setUser] = useState({})
    const session = useSession()
    const[profileRes,setProfileRes] = useState({})

    const[editFname,setEditFname] = useState(false)
    const[editLname,setEditLname] = useState(false)
    const[editEmail,setEditEmail] = useState(false)
    const[editNumber,setEditNumber] = useState(false)
    const[editAddress,setEditAddress] = useState(false)
    const[editPassword,setEditPassword] = useState(false)

    const[editData,setEditData] =  useState({})
    const[editing,setEditing] =  useState(false)

    async function saveEdit(){
        if(!Object.keys(editData).length){
            toast('Nothing was edited')
        }
        else{
            editData.id = session.data.user.id
            const request = await fetch('/api/edit-profile', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(editData),
              })
        const response = await request.json()
        console.log(response)
        setProfileRes(response)
        setEditing(prev=>!prev)
        setEditFname('')
        setEditLname('')
        setEditEmail('')
        setEditNumber('')
        setEditAddress('')
        setEditPassword('')
        toast('Updated...')
        }
    }
    function clearData(){
        setEditData({})
        setEditFname('')
        setEditLname('')
        setEditEmail('')
        setEditNumber('')
        setEditAddress('')
        setEditPassword('')
        setProfileRes({})
    }

    useEffect(()=>{
        const fetchUser = async () =>{
            await fetch('/api/user', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(session.data.user.id)
            })
            .then(res=>res.json())
            .then(json=>setUser(json))
        }
        if(session.status==='authenticated'){
            fetchUser()         
        }
      
    },[session.status,session.data?.user.id,editing])
    
    return <Layout products={products} collections={collections}>
   <div className="profileContainer">
   <h2>Profile Details</h2>
   {session.status ==='authenticated' ? ( <div className="profileDetails">
 <div>
 <div>
  <h4>First Name <FontAwesomeIcon  onClick={()=>setEditFname(prev=>!prev)} className="profileIcon" icon={faEdit} /></h4>
    <p>{user?.fName}</p>
   {editFname &&  <input onChange={(e)=>{setEditData(prev=>({...prev,fName:e.target.value})) ;console.log(editData)}} type="text" placeholder="First Name" />}
  </div>
    <div>
    <h4>Last Name <FontAwesomeIcon  onClick={()=>setEditLname(prev=>!prev)} className="profileIcon" icon={faEdit} /></h4>
    <p>{user?.lName}</p>
    {editLname &&  <input onChange={(e)=>{setEditData(prev=>({...prev,lName:e.target.value})) ;console.log(editData)}} type="text" placeholder="Last Name" />}
    </div>
    <div>
    <h4>Email <FontAwesomeIcon onClick={()=>setEditEmail(prev=>!prev)}  className="profileIcon" icon={faEdit} /></h4>
    <p>{user?.email}</p>
    {editEmail &&  <input onChange={(e)=>{setEditData(prev=>({...prev,email:e.target.value})) ;console.log(editData)}} type="email" placeholder="Email" />}
    </div>
    <div>
    <h4>Number <FontAwesomeIcon onClick={()=>setEditNumber(prev=>!prev)} className="profileIcon" icon={faEdit} /></h4>
    <p>{user?.number}</p>
    {editNumber &&  <input onChange={(e)=>{setEditData(prev=>({...prev,number:e.target.value})) ;console.log(editData)}} type="number" placeholder="Number" />}
    </div>
    <div>
    <h4>Address <FontAwesomeIcon onClick={()=>setEditAddress(prev=>!prev)} className="profileIcon" icon={faEdit} /></h4>
    <p>Main: {user.address?.main}</p>
    {editAddress &&  <input onChange={(e)=>{setEditData(prev=>({...prev,main:e.target.value})) ;console.log(editData)}} type="text" placeholder="Main Address" />}
    <p>Secondary: {user.address?.secondary}</p>
    {editAddress &&  <input onChange={(e)=>{setEditData(prev=>({...prev,secondary:e.target.value})) ;console.log(editData)}} type="text" placeholder="Secondary Address" />}
    <p>City: {user.address?.city}</p>
    {editAddress &&  <input onChange={(e)=>{setEditData(prev=>({...prev,city:e.target.value})) ;console.log(editData)}} type="text" placeholder="City" />}
    </div>
    <div className="profileEdit">
    <button onClick={()=>setEditPassword(prev=>!prev)}>Change Password</button>
    {editPassword &&  <input onChange={(e)=>{setEditData(prev=>({...prev,oldPass:e.target.value})) ;console.log(editData)}} type="password" placeholder="Old Password" />}
    {editPassword &&  <input  onChange={(e)=>{setEditData(prev=>({...prev,newPass:e.target.value})) ;console.log(editData)}}  type="password" placeholder="New Password" />}
    {editPassword &&  <input onChange={(e)=>{setEditData(prev=>({...prev,confirmPass:e.target.value})) ;console.log(editData)}}  type="password" placeholder="Confirm New Password" />}
    </div>
 </div>
 {Object.keys(editData).length>0 && <div>
        <h2>Data to be updated:</h2>
        {editData?.fName && <p>First Name : {editData.fName}</p>}
        {editData?.lName && <p>Last Name : {editData.lName}</p>}
        {editData?.email && <p>Email : {editData.email}</p>}
        {editData?.number && <p>Number : {editData.number}</p>}
        {editData?.main && <p>Main Address : {editData.main}</p>}
        {editData?.secondary && <p>Secondary Address : {editData.secondary}</p>}
        {editData?.city && <p>City Address : {editData.city}</p>}
        <button className="saveBtn" onClick={saveEdit}>Save</button>
        <div className="editRes">
            {profileRes?.updated && <div className="profileSuccess">
                 <h5>Updated:</h5>
                {profileRes.updated.map((res,i)=>{
                   return <p key={i}>{res}</p>
                })}</div>}
            {profileRes.err?.length>0 && <div className="profileErr">
            <h5>Errors:</h5>
              {profileRes.err.map((err,i)=>{
                return  <p key={i}>{err}</p>
                })}</div>}
        </div>
        <button onClick={clearData}>Clear</button>
    </div>
}

    </div>): <p>You should be authenticaed to view profile details</p>}
   </div>
    </Layout>
 
}
export default Profile
export async function getServerSideProps(){
  await initMongoose()
  return {
    props:{
     collections: JSON.parse(JSON.stringify(await findAllCollections())),
     products: JSON.parse(JSON.stringify(await findAllProducts())),
    }
  }
}