import { useContext, useReducer } from "react"
import { ProductsContext } from "./ProductsContext"
import ProductCard from "./ProductCard"
import style from '@/styles/Search.module.css'
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Search ({products}){

    const {isSearchChecked,setIsSearchChecked, setIsMenuChecked,setSearchText,searchText} = useContext(ProductsContext)

    const [state , dispatch] = useReducer(reducer, {foundProducts :products, searchString :searchText })

    function reducer(state,action){
        console.log(state)

        if(action.type==='search'){
            return {foundProducts: products.filter(product=> product.name.toLowerCase().includes(state.searchString.toLowerCase())), searchString: action.search}
        }
        }
      function handleSearch(e){
        setSearchText(e.target.value)
        console.log(searchText)
                search()
      }

      function search(){
            dispatch({type:'search', search: searchText})
            console.log('dispatched')
      }
      
        return(
            <div className={style.container} style={{transform: isSearchChecked? 'scale(1)' : 'scale(0)'}}>
                <FontAwesomeIcon onClick={()=>{setIsSearchChecked(!isSearchChecked);setIsMenuChecked(false)}} icon={faClose} className={style.closeIcon}  />
            <div className={style.search}>
        <input value={searchText} onChange={handleSearch} type="text" name="" placeholder='Search' id="" />
      <FontAwesomeIcon  icon={faSearch} className={style.searchIcon}  />
      </div>
                {state.foundProducts.length>0 && searchText.length>1 ?
                 <div className={style.results}> 
                 {state.foundProducts.map((product,index)=>{
                    return <div key={index} onClick={()=>setIsSearchChecked(prev=>!prev)}><ProductCard  id={product._id} category={product.category} name={product.name} price={product.price} image={product.image} stock={product.stock} /></div>
                 })}
                 </div> :<p className={style.message}>No Products Found</p>}
            </div>
        )
}
export default Search