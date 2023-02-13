import style from '@/styles/Landing.module.css'
import Link from 'next/link'

function Landing(){
    return (
        <>
        <div className={style.overlay}>
        <div className={style.container}>
        <div className={style.banner}>
 
            <h1 data-aos="zoom-in"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">Enhance</h1>
   
     
            <h1 data-aos="zoom-in"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">Your</h1>
  
 
            <h1 data-aos="zoom-in"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">Yoga</h1>
 
       
            {/* <h1 data-aos="zoom-in"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600"><span>J</span>ourney</h1> */}
        
            <Link data-aos="zoom-in"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className={style.link} href="/collections">
            <button>Shop Now</button></Link>
      
      
        </div>
      </div>
        </div>
     
  
      
       
        </>     
    )
}
export default Landing