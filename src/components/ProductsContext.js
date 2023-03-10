import { createContext, useState } from "react";
import { useSession } from "next-auth/react";
import useSessionStorageState from 'use-session-storage-state'

export const ProductsContext = createContext({})

export function ProductsContextProvider({children}){
    const session = useSession()
    const [selectedProducts, setSelectedProducts] = useSessionStorageState('cart', {defaultValue :[]})
    const [searchText, setSearchText] = useState('')
    const [isMenuChecked, setIsMenuChecked] = useState(false)
    const [isSearchChecked, setIsSearchChecked] = useState(false)
    const [isProfileChecked, setIsProfileChecked] = useState(false)
    const [searchedProducts, setSearchedProducts] = useState('')
    const[editing,setEditing] = useState(false)

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
       <ProductsContext.Provider value={{selectedProducts, setSelectedProducts,searchedProducts,setSearchedProducts,isMenuChecked,setIsMenuChecked,isSearchChecked,setIsSearchChecked,searchText,setSearchText,isProfileChecked,setIsProfileChecked,editing,setEditing}}>{children}</ProductsContext.Provider>
    )
}