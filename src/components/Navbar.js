import { useState, useEffect } from 'react';
import style from '@/styles/Nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import logo from '../../public/logo.png'
import Link from 'next/link';
 

function Navbar({isCollection}){

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
        <nav className={style.nav} style={{background: navScrolled || isCollection ? '#001f3d' : 'transparent'}}>
      
           <FontAwesomeIcon icon={faSearch} className={style.icon}  />
        
            {/* <h3>YOGAWITHOLYNDA</h3> */}
            <Link href='/'>
            <Image className={style.logo} src={logo} width={100} height={100} alt="logo" placeholder='blur'/>
            </Link>
            
       
    
           <FontAwesomeIcon icon={faCartShopping} className={style.icon}  />
   
        </nav>
    )
}
export default Navbar