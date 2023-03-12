import Loader from "@/components/Loader"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"


function Admin(){
    const router = useRouter()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading]  = useState(false)
    const session = useSession()

   async function login(){
        try {
            const data = await signIn('credentials',{
                redirect:false,
                email: email + '@gmail.com',
                password: password  
            })
            
            if(!data.error){
                setLoading(false)
                if(session.data.user.isAdmin){
                    toast('Admin Login Success')
                router.push('/admin/dashboard')
                }

            else{
                toast('Not an Admin')
            }
               
            }
             else{
                setLoading(false)
                toast('Invalid Credentials')
             }
        } catch (err) {
            console.log(err)
        }
    }
    return(

    <div className="admiinContainer">  
    {loading && <Loader />}
  
      <div className="form">
      <h1>Admin</h1>
       <input onChange={(e)=>setEmail(e.target.value)}  value={email} type="text" placeholder="username"/>
        <input  onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="placeholder"/>
        <button  onClick={()=>login()}>Login</button>
      </div>
    
    </div>
      
    )
}
export default Admin