import { createContext, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useSession } from "next-auth/react";

export const ProductsContext = createContext({})

export function ProductsContextProvider({children}){
    const session = useSession()
    const [selectedProducts, setSelectedProducts] = useLocalStorageState('cart', {defaultValue :[]})
    const [searchText, setSearchText] = useState('')
    const [isMenuChecked, setIsMenuChecked] = useState(false)
    const [isSearchChecked, setIsSearchChecked] = useState(false)
    const [isProfileChecked, setIsProfileChecked] = useState(false)
    const [searchedProducts, setSearchedProducts] = useState('')

    if (typeof window !== 'undefined') {
        if(isMenuChecked || isSearchChecked){
            document.querySelector('body').style.overflow ='hidden'
        }
        else{
            document.querySelector('body').style.overflow ='unset'
        }
        if(isProfileChecked && session.status==='authenticated'){
            document.querySelector('body').style.overflow ='unset'
        }
        else if(!isProfileChecked){
            document.querySelector('body').style.overflow ='unset'
        }
        else{
            document.querySelector('body').style.overflow ='hidden'
        }

    }
    
    
    return(
       <ProductsContext.Provider value={{selectedProducts, setSelectedProducts,searchedProducts,setSearchedProducts,isMenuChecked,setIsMenuChecked,isSearchChecked,setIsSearchChecked,searchText,setSearchText,isProfileChecked,setIsProfileChecked}}>{children}</ProductsContext.Provider>
    )
}