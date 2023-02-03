import style from '@/styles/Nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import logo from '../../../public/logo.jpg'
 

function Navbar(){

    return (
        <nav className={style.nav}>
      
           <FontAwesomeIcon icon={faSearch} className={style.icon}  />
        
            <h3>YOGAWITHOLYNDA</h3>
            {/* <Image className={style.logo} src={logo} width={120} height={120} alt="logo" placeholder='blur'/> */}
       
    
           <FontAwesomeIcon icon={faCartShopping} className={style.icon}  />
   
        </nav>
    )
}
export default Navbar