import '@/styles/globals.css'
import '@/styles/collectionsPage.css'
import '@/styles/collectionPage.css'
import '@/styles/product.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loader = document.getElementById('globalLoader');
            if (loader)
                loader.style.display = 'none';
        }
    }, []);

    return <Component {...pageProps }
    />
}