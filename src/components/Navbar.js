import { useContext } from 'react';
import style from '@/styles/Nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ProductsContext } from './ProductsContext';
import { useRouter } from 'next/router';
import ResponsiveNav from './ResponsiveNav';
import Search from './Search';
import { useSession, signOut } from 'next-auth/react';

function Navbar({products}){

    const {selectedProducts} = useContext(ProductsContext)
    const {isMenuChecked,setIsMenuChecked} = useContext(ProductsContext)
    const {isSearchChecked,setIsSearchChecked} = useContext(ProductsContext)
    const {isProfileChecked,setIsProfileChecked} = useContext(ProductsContext)
    const router = useRouter()
    const session = useSession()

    return (
      
      
       
           <nav data-aos="fade-down" data-aos-once={true} data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className={style.nav}>
             <ResponsiveNav />
        <Search products={products} />

<FontAwesomeIcon onClick={()=>setIsSearchChecked(!isSearchChecked)} icon={faSearch} className={style.searchIcon}  />

<div className={style.menuContainer}>
<input defaultChecked={isMenuChecked} id={style.menu} type="checkbox" />
<label  onClick={()=>setIsMenuChecked(!isMenuChecked)} className={style.hamburgerMenu} htmlFor="menu">
  <span className={style.lines}></span>
  </label> 
</div>

 <div className={style.navFlex}>
   <div>
   <Link href='/'>
 {/* <Image className={style.logo} src={logo} width={100} height={100} alt="logo" placeholder='blur'/> */}
 <h3>YOGAWITHOLYNDA</h3>
 </Link>
   </div>
 <ul className={style.links}>
 <Link href="/collections/yoga-mats">
     <li className={ router.asPath ==='/collections/yoga-mats' ? style.selected :style.link}  >Yoga Mats</li></Link>
     <Link  href="/collections/yoga-socks">
     <li className={ router.asPath ==='/collections/yoga-socks' ? style.selected :style.link} >Yoga Socks</li></Link>
     <Link href="/collections/yoga-incense">
     <li className={ router.asPath ==='/collections/yoga-incense' ? style.selected :style.link} >Yoga Incense</li></Link>
</ul>
 
 </div>
<div className={style.iconsContainer}>
<Link href="/cart">
<div className={style.cartContainer}>
 <div className={style.badge}>{selectedProducts.length}</div>
<FontAwesomeIcon icon={faCartShopping} className={style.icon}  /> 
</div></Link>


<div className={style.dropdown}>
<FontAwesomeIcon onClick={()=>setIsProfileChecked(!isProfileChecked)} icon={faUser} className={style.icon}  />
 {isProfileChecked && session.status === 'authenticated' && <div className={style.dropdownContent}>
  <FontAwesomeIcon icon={faCaretUp} className={style.arrow}/>
 <p>View Orders</p>
  <p onClick={()=>signOut()}>Logout</p>
 </div>}
</div>
</div>

</nav>
      
  
      
    )
}
export default Navbar