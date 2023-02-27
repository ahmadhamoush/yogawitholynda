import style from '@/styles/Login.module.css'
import { useContext } from 'react'
import { ProductsContext } from './ProductsContext'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import {signIn} from 'next-auth/react'
import { useSession } from 'next-auth/react'



function Login (){
    const session = useSession()
    const {isProfileChecked, setIsProfileChecked} = useContext(ProductsContext)
    const { register, handleSubmit } = useForm();
    const[isLogin,setIsLogin] = useState(true)
    const onSubmitSignUp = data=> fetch('/api/register',{method:'POST', headers:{
        'Content-Type': 'application/json'
    },body: JSON.stringify(data)}).then(res=>res.json()).then(json=>console.log(json))  
    const onError = errors => console.log(errors);

    const onSubmitLogin = async loginData => {

        try {
            const data = await signIn('credentials',{
                redirect:false,
                email: loginData.email,
                password: loginData.password  
            })
            setIsProfileChecked(prev=>!prev)
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    return(
        isProfileChecked && session.status==='unauthenticated' &&
        <div className={style.container}>
            <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
          {isLogin && <form className={style.form} onSubmit={handleSubmit(onSubmitLogin,onError)}>
            <input type='email'  placeholder='Email' {...register('email', {required:true})} />
            <input type='password' placeholder='Password' {...register("password", { required: true })}/>
            <input type="submit" placeholder='Login'/>
            </form>}
            {!isLogin && <form className={style.form} onSubmit={handleSubmit(onSubmitSignUp,onError)}>
            <input type='text'  placeholder='First Name' {...register('fName', {required:true})} />
            <input type='text'  placeholder='Last Name' {...register('lName', {required:true})} />
            <input type='email'  placeholder='Email' {...register('email', {required:true})} />
            <input type='password' placeholder='Password' {...register("password", { required: true })}/>
            <input type='password' placeholder='Password' {...register("confirmPassword", { required: true })}/>
            <input type="submit" placeholder='Signup'/>
            </form>}
            <FontAwesomeIcon onClick={()=>setIsProfileChecked(prev=>!prev)} icon={faClose} className={style.icon}/>
            <button onClick={()=>setIsLogin(prev=>!prev)}>{isLogin ? "Don't Have An Account? Sign Up Right Now" : 'Already Have an Account? Login'}</button>
        </div>
    )
}
 export default Login