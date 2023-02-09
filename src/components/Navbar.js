import { useState, useEffect } from 'react';
import style from '@/styles/Nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import logo from '../../public/logo.png'
import Link from 'next/link';
 

function Navbar(){

    const [navScrolled, setNavScrolled] = useState(false)

const listenScrollEvent = (event) => {
  if (window.scrollY < 73) {
    return setNavScrolled(false)
  } else if (window.scrollY > 100) {
    return setNavScrolled(true)
  } 
}

useEffect(() => {
  window.addEventListener('scroll', listenScrollEvent);

  return () =>
    window.removeEventListener('scroll', listenScrollEvent);
}, []);

    return (
        <nav data-aos="fade-down"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className={style.nav}>
      
           <FontAwesomeIcon icon={faSearch} className={style.icon}  />
        
       
            <div className={style.navFlex}>
              <Link href='/'>
            {/* <Image className={style.logo} src={logo} width={100} height={100} alt="logo" placeholder='blur'/> */}
            <h3>YOGAWITHOLYNDA</h3>
            </Link>
            <div className={style.links}>
            <Link className={style.link} href="/collections/yoga-mats">
                <p>Yoga Mats</p></Link>
                <Link className={style.link} href="/collections/yoga-socks">
                <p>Yoga Socks</p></Link>
                <Link className={style.link} href="/collections/yoga-incense">
                <p>Yoga Incense</p></Link>
        </div>
            
            </div>
       
            
           <div className={style.cartContainer}>
            <div className={style.badge}>0</div>
           <FontAwesomeIcon icon={faCartShopping} className={style.icon}  /> 
           </div>
         
   
        </nav>
    )
}
export default Navbar