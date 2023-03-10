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
    const[resetPass,setIsResetPass] = useState(false)
    const[err,setErr] = useState({})
    const[resetMessage,setResetMessage] = useState('')
    const onSubmitSignUp = data=> 
   {
    if(data.password!==data.confirmPassword){
        toast('Passwords Do Not Match!')
    }
    else{
        fetch('/api/register',{method:'POST', headers:{
            'Content-Type': 'application/json'
        },body: JSON.stringify(data)}).then(res=>res.json()).then(json=>{
            json.user ? login(data) : setErr(json.message)
        })  
    }
   }
  
    const onError = errors => {setErr(errors); console.log(err)};

    const onSubmitLogin = async loginData => {
       await login(loginData)
    }
    const onSubmitReset = async resetData => {
            setLoading(true)
            const request = await fetch('/api/forget-pass', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(resetData),
              })
        const response = await request.json()
        setLoading(false)
       toast(response.message)
       setResetMessage(response.message)
       
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
          {isLogin && !resetPass && <form className={style.form} onSubmit={handleSubmit(onSubmitLogin,onError)}>
            <input style={{border : err.email || err.error && '1px solid red'}} type='email'  placeholder='Email' {...register('email', {required:true})} />
            <input style={{border : err.password || err.error && '1px solid red'}}type='password' placeholder='Password' {...register("password", { required: true })}/>
            <input type="submit" placeholder='Login'/>
            <p className={style.err}>{err?.error && err.error}</p>
            <button className={style.changeView} onClick={()=>setIsResetPass(prev=>!prev)}>{!resetPass ? 'Forgot Password? Reset Now!' : 'Back to Login'} </button>
            </form>}
            {isLogin && resetPass && <form className={style.form} onSubmit={handleSubmit(onSubmitReset,onError)}>
            <h2>Enter email to reset</h2>
            <input style={{border : err.email || err.error && '1px solid red'}} type='email'  placeholder='Email' {...register('email', {required:true})} />
            <input type="submit" placeholder='Login'/>
            <p className={style.err}>{err?.error && err.error}</p>
            <button className={style.changeView} onClick={()=>setIsResetPass(prev=>!prev)}>Forgot Password? Reset Now!</button>
            <p style={{padding:'20px'}} className={style.err}>{resetMessage ==='email not found' && resetMessage}</p>
            <p style={{color:'green', padding:'20px'}}>{resetMessage ==='email sent' && 'We have sent you an email to reset the password. Press the link in the provided email to reset. If email is not found, make sure to check the spam/junk emails. Link will expire in 10 minutes'}</p>
            </form>}
            {!isLogin && <form className={style.form} onSubmit={handleSubmit(onSubmitSignUp,onError)}>
            <input style={{border : err.fName && '1px solid red'}} type='text'  placeholder='First Name' {...register('fName', {required:true})} />
            <input style={{border : err.lName && '1px solid red'}}type='text'  placeholder='Last Name' {...register('lName', {required:true})} />
            <input style={{border : err.email  && '1px solid red'}} type='email'  placeholder='Email' {...register('email', {required:true})} />
            <input style={{border : err.password && '1px solid red'}} type='password' placeholder='Password' {...register("password", { required: true })}/>
            <input  style={{border : err.password && '1px solid red'}} type='password' placeholder='Password' {...register("confirmPassword", { required: true })}/>
            <input type="submit" placeholder='Signup'/>
            <p className={style.err}>{err.length && err}</p>
            </form>}
            <FontAwesomeIcon onClick={()=>setIsProfileChecked(prev=>!prev)} icon={faClose} className={style.icon}/>
            <button className={style.changeView} onClick={()=>{setIsLogin(prev=>!prev);reset({email:'',password:''})}}>{isLogin ? "Don't Have An Account? Sign Up Right Now" : 'Already Have an Account? Login'}</button>
        </div>
    )
}
 export default Login