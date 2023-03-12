import { useContext, useState } from "react"
import { ProductsContext } from "./ProductsContext"
import Link from "next/link"
import style from '@/styles/ResponsiveNav.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
function ResponsiveNav({collections}){
const {isMenuChecked,setIsMenuChecked} = useContext(ProductsContext)
const {isSearchChecked, setIsSearchChecked} = useContext(ProductsContext)
const router = useRouter()
return (
  <div>
   
    {<div className={style.container} style={{height: isMenuChecked ? 'auto': '0'}}>
        <ul>
        {collections?.map(collection=> <Link onClick={()=>setIsMenuChecked(prev=>!prev)} key={collection._id} href={collection.href}>
    <li className={ router.asPath === collection.href ? style.selected :style.link}>{collection.name.split('Mats').join(' ')}</li>
    </Link>
  )}
            <li>
            <FontAwesomeIcon onClick={()=> setIsSearchChecked(true)} icon={faSearch} className={style.searchIcon}  />
            </li>
        </ul>
        
    </div>}
  </div>
)
}
export default ResponsiveNav