import style from '@/styles/Landing.module.css'
import Link from 'next/link'

function Landing(){
    return (
        <>
        <div className={style.overlay}>
        <div className={style.container}>
        <div className={style.banner}>
            <h1>Enhance Your Yoga Journey</h1>
            <Link className={style.link} href="/collections">
            <button>Shop Now</button></Link>
            
        </div>
    <div className={style.bannerContainer}>
      
  </div>

      </div>
        </div>
     
  
      
       
        </>     
    )
}
export default Landing