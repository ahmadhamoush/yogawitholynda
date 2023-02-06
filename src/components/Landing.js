import style from '@/styles/Landing.module.css'
import Link from 'next/link'
import Navbar from './Navbar'

function Landing(){
    return (
        <>
        <div className={style.overlay}>
        <div className={style.container}>
        <Navbar />
        <div className={style.links}>
            <Link className={style.link} href="/collections/yoga-mats">
                <p>Yoga Mats</p></Link>
                <Link className={style.link} href="/collections/yoga-socks">
                <p>Yoga Socks</p></Link>
                <Link className={style.link} href="/collections/yoga-incense">
                <p>Yoga Incense</p></Link>
        </div>
    <div className={style.bannerContainer}>
        <div className={style.banner}>
            <h1>Enhance Your Yoga Journey</h1>
            <Link className={style.link} href="/collections">
            <button>Shop Now</button></Link>
            
        </div>
  </div>

      </div>
        </div>
     
  
      
       
        </>     
    )
}
export default Landing