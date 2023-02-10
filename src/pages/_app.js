import '@/styles/globals.css'
import '@/styles/collectionsPage.css'
import '@/styles/collectionPage.css'
import '@/styles/product.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'aos/dist/aos.css';
import AOS from 'aos'
import { useEffect } from 'react';
import { ProductsContextProvider } from '@/components/ProductsContext'
import { ToastContainer } from 'react-toastify'

export default function App({ Component, pageProps }) {

  
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loader = document.getElementById('globalLoader');
            if (loader)
                loader.style.display = 'none';
                AOS.init();
        }
    }, []);

    return  <ProductsContextProvider>
        <Component {...pageProps }  />
        <ToastContainer theme="dark" autoClose= {2000} hideProgressBar={true}toastStyle={{ backgroundColor: "#001F3D" }} />
    </ProductsContextProvider> 
  

}