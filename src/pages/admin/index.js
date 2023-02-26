import { useRouter } from "next/router"

function Admin(){
    const router = useRouter()
    return(

    <div className="admiinContainer">  
       <form>
       <h1>Admin</h1>
       <input type="text" placeholder="username"/>
        <input type="password" placeholder="placeholder"/>
        <button onClick={()=>router.push('/admin/dashboard')}>Login </button>
       </form>
    </div>
      
    )
}
export default Admin