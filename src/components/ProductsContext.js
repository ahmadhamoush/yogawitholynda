import { createContext, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export const ProductsContext = createContext({})

export function ProductsContextProvider({children}){
    const [selectedProducts, setSelectedProducts] = useLocalStorageState('cart', {defaultValue :[]})
    const [searchText, setSearchText] = useState('')
    const [isMenuChecked, setIsMenuChecked] = useState(false)
    const [isSearchChecked, setIsSearchChecked] = useState(false)
    const [isProfileChecked, setIsProfileChecked] = useState(false)
    const [searchedProducts, setSearchedProducts] = useState('')

    if (typeof window !== 'undefined') {
        if(isMenuChecked || isProfileChecked || isSearchChecked){
            document.querySelector('body').style.overflow ='hidden'
        }
        else{
            document.querySelector('body').style.overflow ='unset'
        }
    }
    
    
    return(
       <ProductsContext.Provider value={{selectedProducts, setSelectedProducts,searchedProducts,setSearchedProducts,isMenuChecked,setIsMenuChecked,isSearchChecked,setIsSearchChecked,searchText,setSearchText,isProfileChecked,setIsProfileChecked}}>{children}</ProductsContext.Provider>
    )
}