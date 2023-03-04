import { useContext, useState } from "react"
import { ProductsContext } from "./ProductsContext"
import Link from "next/link"
import style from '@/styles/ResponsiveNav.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
function ResponsiveNav(){
const {isMenuChecked,setIsMenuChecked} = useContext(ProductsContext)
const {isSearchChecked, setIsSearchChecked} = useContext(ProductsContext)
  
return (
  <div>
   
    {<div className={style.container} style={{height: isMenuChecked ? 'auto': '0'}}>
        <ul>
            <li  onClick={()=>setIsMenuChecked(prev=>!prev)}>
            <Link className={style.link} href="/collections/yoga-mats">
           <p>Yoga Mats</p></Link>
           </li>
           <li  onClick={()=>setIsMenuChecked(prev=>!prev)}>
           <Link className={style.link} href="/collections/yoga-socks">
           <p>Yoga Socks</p></Link>
           </li>
           <li onClick={()=>setIsMenuChecked(prev=>!prev)}>
           <Link className={style.link} href="/collections/yoga-incense">
           <p>Yoga Incense</p></Link>
           </li>
            <li>
            <FontAwesomeIcon onClick={()=> setIsSearchChecked(true)} icon={faSearch} className={style.searchIcon}  />
            </li>
        </ul>
        
    </div>}
  </div>
)
}
export default ResponsiveNav