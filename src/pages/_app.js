import '@/styles/globals.css'
import '@/styles/collectionPage.css'
import '@/styles/cart.css'
import '@/styles/order.css'
import '@/styles/admin.css'
import '@/styles/product.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import AOS from 'aos'
import { useEffect, useState } from 'react';
import { ProductsContextProvider } from '@/components/ProductsContext'
import { ToastContainer } from 'react-toastify'
import Login from '@/components/Login'
import { SessionProvider } from "next-auth/react";

export function reportWebVitals(metric) {
    console.log(metric)
  }
  
export default function App({ Component, pageProps, products }) {


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loader = document.getElementById('globalLoader');
            if (loader)
                loader.style.display = 'none';
                AOS.init();
        }
    }, []);

    return  <SessionProvider>
        <ProductsContextProvider >
        <Component {...pageProps }  />
        <Login />
        <ToastContainer theme="dark"  autoClose= {2000} hideProgressBar={true}toastStyle={{ backgroundColor: "#001F3D" }} />
    </ProductsContextProvider> 
    </SessionProvider>
  
}
 