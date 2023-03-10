import { initMongoose } from "lib/mongoose"
import { findAllCollections } from "../api/collections"
import { findAllProducts } from "../api/products"
import Layout from "@/components/Layout"
import style from '@/styles/Login.module.css'
import { useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import Loader from "@/components/Loader"
import { signIn } from "next-auth/react"

function ChangePass ({products,collections}){
    const[err,setErr] = useState({})
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [isValid,setIsValid] = useState(false)

    const { register, handleSubmit} = useForm();


    const onSubmitValidate = async validateData =>{
        validateData.token = router.query.token
        const request = await fetch('/api/validate-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(validateData),
          })
    const response = await request.json()
    if(response.message =='valid'){
        setIsValid(true)
        setErr({})
    }else{
        setErr(response)
    }
    }
    const onSubmitReset = async resetData => {
        resetData.token = router.query.token
        if(resetData.password !== resetData .confirmPass){
            toast('Passwords are not the same')
            setErr({message:'Passwords are not the same'})
        }
        else{
            const request = await fetch('/api/change-pass', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(resetData),
              })
        const response = await request.json()
        console.log(response)
        if(response.message ==='Password Reset Success'){
            setLoading(true)
        try {
            const data = await signIn('credentials',{
                redirect:false,
                email: response.email,
                password: resetData.password  
            })
            
            if(!data.error){
                setLoading(false)
                toast('Reset Success')
                router.push('/')
            }
             else{
                setErr(data)
                setLoading(false)
             }
        } catch (err) {
            console.log(err)
        }
        }
        else if(response.message ==='token expired'){
            setErr(response)
        }
        }
        
        
     }
     const onError = errors => {setErr(errors); console.log(err)};
    return <Layout products={products} collections={collections}>
        {loading && <Loader />}
        {isValid && (    <form className={style.form} onSubmit={handleSubmit(onSubmitReset,onError)}>
            <h2>Reset Password</h2>
            <input style={{border : err.password || err.error && '1px solid red'}} type='password'  placeholder='New Password' {...register('password', {required:true})} />
            <input style={{border : err.confirmPass || err.error && '1px solid red'}} type='password'  placeholder='Confirm New Password' {...register('confirmPass', {required:true})} />
            <input type="submit" placeholder='Login'/>
            <p className={style.err}>{err?.message && err.message}</p>
            </form>)}
         {!isValid && (    <form className={style.form} onSubmit={handleSubmit(onSubmitValidate,onError)}>
            <h2>Enter 6 the digits code that we sent you</h2>
            <input style={{border : err.password || err.error && '1px solid red'}} type='number'  placeholder='Key' {...register('key', {required:true})} />
            <input type="submit" placeholder='Login'/>
            <p className={style.err}>{err?.message && err.message}</p>
            </form>)}

    </Layout>
 
}
export default ChangePass
export async function getServerSideProps(){
  await initMongoose()
  return {
    props:{
     collections: JSON.parse(JSON.stringify(await findAllCollections())),
     products: JSON.parse(JSON.stringify(await findAllProducts())),
    }
  }
}