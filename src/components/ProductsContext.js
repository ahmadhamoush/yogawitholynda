import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext({ })

export function ProductsContextProvider({children}){
    const [selectedProducts, setSelectedProducts] = useState([])
    const [searchText, setSearchText] = useState('')
    const [isMenuChecked, setIsMenuChecked] = useState(false)
    const [isSearchChecked, setIsSearchChecked] = useState(false)
    const [searchedProducts, setSearchedProducts] = useState('')
    return(
       <ProductsContext.Provider value={{selectedProducts, setSelectedProducts,searchedProducts,setSearchedProducts,isMenuChecked,setIsMenuChecked,isSearchChecked,setIsSearchChecked,searchText,setSearchText}}>{children}</ProductsContext.Provider>
    )
}