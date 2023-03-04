import style from '@/styles/Login.module.css'
import { useContext } from 'react'
import { ProductsContext } from './ProductsContext'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import {signIn} from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import Loader from './Loader'



function Login (){
    const session = useSession()
    const {isProfileChecked, setIsProfileChecked} = useContext(ProductsContext)
    const { register, handleSubmit,reset } = useForm();
    const[isLogin,setIsLogin] = useState(true)
    const[loading,setLoading] = useState(false)
    const[err,setErr] = useState({})
    const onSubmitSignUp = data=> fetch('/api/register',{method:'POST', headers:{
        'Content-Type': 'application/json'
    },body: JSON.stringify(data)}).then(res=>res.json()).then(json=>{
        json.user ? login(data) : setErr(json.message)
    })  
    const onError = errors => {setErr(errors); console.log(err)};

    const onSubmitLogin = async loginData => {
       await login(loginData)
    }

   async function login(loginData){
        setLoading(true)
        try {
            const data = await signIn('credentials',{
                redirect:false,
                email: loginData.email,
                password: loginData.password  
            })
            
            if(!data.error){
                setIsProfileChecked(prev=>!prev)
                setLoading(false)
                toast('Login Success')
            }
             else{
                setErr(data)
                setLoading(false)
             }
        } catch (err) {
            console.log(err)
        }
    }
    return(

        <div style={{transform: isProfileChecked && session.status==='unauthenticated'  ? 'scale(1)' : 'scale(0)'}} className={style.container}>
            {loading && <Loader />}
            <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
          {isLogin && <form className={style.form} onSubmit={handleSubmit(onSubmitLogin,onError)}>
            <input style={{border : err.email || err.error && '1px solid red'}} type='email'  placeholder='Email' {...register('email', {required:true})} />
            <input style={{border : err.password || err.error && '1px solid red'}}type='password' placeholder='Password' {...register("password", { required: true })}/>
            <input type="submit" placeholder='Login'/>
            <p className={style.err}>{err?.error && err.error}</p>
            </form>}
            {!isLogin && <form className={style.form} onSubmit={handleSubmit(onSubmitSignUp,onError)}>
            <input style={{border : err.fName && '1px solid red'}} type='text'  placeholder='First Name' {...register('fName', {required:true})} />
            <input style={{border : err.lName && '1px solid red'}}type='text'  placeholder='Last Name' {...register('lName', {required:true})} />
            <input style={{border : err.email || err.length && '1px solid red'}} type='email'  placeholder='Email' {...register('email', {required:true})} />
            <input style={{border : err.password && '1px solid red'}} type='password' placeholder='Password' {...register("password", { required: true })}/>
            <input type='password' placeholder='Password' {...register("confirmPassword", { required: true })}/>
            <input type="submit" placeholder='Signup'/>
            <p className={style.err}>{err.length && err}</p>
            </form>}
            <FontAwesomeIcon onClick={()=>setIsProfileChecked(prev=>!prev)} icon={faClose} className={style.icon}/>
            <button className={style.changeView} onClick={()=>{setIsLogin(prev=>!prev);reset({email:'',password:''})}}>{isLogin ? "Don't Have An Account? Sign Up Right Now" : 'Already Have an Account? Login'}</button>
        </div>
    )
}
 export default Login