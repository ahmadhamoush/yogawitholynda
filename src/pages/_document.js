import { ProductsContext } from '@/components/ProductsContext';
import { Html, Head, Main, NextScript } from 'next/document'
import { useContext } from 'react';
import loader from "../loader";


export default function Document() {
  const {isMenuSelected} = useContext(ProductsContext)
  return (
    <Html lang="en">
 
                    <style>
                        {loader}
                    </style>
          
      <Head />
      <body>
      <div id={'globalLoader'}>
                     <div className="loader">
                        <div/>
                        <div/>
                    </div>
                </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
