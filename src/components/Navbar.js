import { useState, useEffect, useContext } from 'react';
import style from '@/styles/Nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { ProductsContext } from './ProductsContext';
import { useRouter } from 'next/router';

function Navbar(){

    const {selectedProducts} = useContext(ProductsContext)
    const {isMenuChecked,setIsMenuChecked} = useContext(ProductsContext)
    const {isSearchChecked,setIsSearchChecked} = useContext(ProductsContext)
    const router = useRouter()

    return (
      
         <nav data-aos="fade-down" data-aos-once={true} data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className={style.nav}>

      <FontAwesomeIcon onClick={()=>setIsSearchChecked(!isSearchChecked)} icon={faSearch} className={style.searchIcon}  />
 
   <div className={style.menuContainer}>
   <input defaultChecked={isMenuChecked} id={style.menu} type="checkbox" />
   <label  onClick={()=>setIsMenuChecked(!isMenuChecked)} className={style.hamburgerMenu} htmlFor="menu">
        <span className={style.lines}></span>
        </label> 
   </div>
  
       <div className={style.navFlex}>
         <Link href='/'>
       {/* <Image className={style.logo} src={logo} width={100} height={100} alt="logo" placeholder='blur'/> */}
       <h3>YOGAWITHOLYNDA</h3>
       </Link>
       <ul className={style.links}>
       <Link href="/collections/yoga-mats">
           <li className={ router.asPath ==='/collections/yoga-mats' ? style.selected :style.link}  >Yoga Mats</li></Link>
           <Link  href="/collections/yoga-socks">
           <li className={ router.asPath ==='/collections/yoga-socks' ? style.selected :style.link} >Yoga Socks</li></Link>
           <Link href="/collections/yoga-incense">
           <li className={ router.asPath ==='/collections/yoga-incense' ? style.selected :style.link} >Yoga Incense</li></Link>
   </ul>
       
       </div>
   <Link href="/cart">
   <div className={style.cartContainer}>
       <div className={style.badge}>{selectedProducts.length}</div>
      <FontAwesomeIcon icon={faCartShopping} className={style.icon}  /> 
      </div></Link>
   </nav>
  
      
    )
}
export default Navbar