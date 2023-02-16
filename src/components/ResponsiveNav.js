import { useContext, useState } from "react"
import { ProductsContext } from "./ProductsContext"
import Link from "next/link"
import style from '@/styles/ResponsiveNav.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons"
function ResponsiveNav(){
const {isMenuChecked,setIsMenuChecked} = useContext(ProductsContext)
const {isSearchChecked, setIsSearchChecked, setSearchText} = useContext(ProductsContext)

function handleSearch(e){
    setSearchText(e.target.value)
    setIsSearchChecked(true)
  }
  
return (
  <div>
   
    {<div className={style.container} style={{width: isMenuChecked ? '100%': '0'}}>
    <FontAwesomeIcon onClick={()=>{setIsMenuChecked(false)}} icon={faClose} className={style.closeIcon}  />

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
            
        </ul>
        <div className={style.search}>
        <input onChange={handleSearch} type="text" name="" placeholder='Search' id="" />
      <FontAwesomeIcon icon={faSearch} className={style.searchIcon}  />
      </div>
    </div>}
  </div>
)
}
export default ResponsiveNav