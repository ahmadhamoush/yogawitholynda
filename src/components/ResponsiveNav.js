import { useContext } from "react"
import { ProductsContext } from "./ProductsContext"
import Link from "next/link"
import style from '@/styles/ResponsiveNav.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Navbar from "./Navbar"
function ResponsiveNav(){
const {isMenuChecked} = useContext(ProductsContext)
const {isSearchChecked, setIsSearchChecked, setSearchedProducts} = useContext(ProductsContext)
function handleSearch(e){
    setSearchedProducts(e.target.value)
    setIsSearchChecked(true)
  }
return (
  <div>
   
    {<div className={style.container} style={{width: isMenuChecked ? '100%': '0'}}>
    <Navbar />

        <ul>
            <li>
            <Link className={style.link} href="/collections/yoga-mats">
           <p>Yoga Mats</p></Link>
           </li>
           <li>
           <Link className={style.link} href="/collections/yoga-socks">
           <p>Yoga Socks</p></Link>
           </li>
           <li>
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