import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "./ProductsContext"
import ProductCard from "./ProductCard"
import style from '@/styles/Search.module.css'
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Search ({products}){

    const {searchedProducts, setSearchedProducts} = useContext(ProductsContext)
    const {isSearchChecked,setIsSearchChecked, setIsMenuChecked} = useContext(ProductsContext)
    const [foundProducts, setFoundProducts] = useState([products])

    function handleSearch(e){
        setSearchedProducts(e.target.value)
      }

    useEffect(()=>{
     setFoundProducts( products.filter(product=> product.name.toLowerCase().includes(searchedProducts)))   
     console.log(foundProducts)
    }, [searchedProducts])
        return(
            <div className={style.container} style={{width: isSearchChecked? '100%' : '0'}}>
                <FontAwesomeIcon onClick={()=>{setIsSearchChecked(!isSearchChecked);setIsMenuChecked(false)}} icon={faClose} className={style.closeIcon}  />
            <div className={style.search}>
        <input value={searchedProducts} onChange={handleSearch} type="text" name="" placeholder='Search' id="" />
      <FontAwesomeIcon  icon={faSearch} className={style.searchIcon}  />
      </div>
                {foundProducts.length>0 && searchedProducts ?
                 <div className={style.results}> 
                 {foundProducts.map((product,index)=>{
                    return <ProductCard key={index} id={product._id} category={product.category} name={product.name} price={product.price} image={product.image} />
                 })}
                 </div> :<p className={style.message}>No Products Found</p>}
            </div>
        )
}
export default Search