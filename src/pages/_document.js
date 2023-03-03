import Loader from '@/components/Loader';
import { Html, Head, Main, NextScript } from 'next/document'
import loader from "../loader";


export default function Document() {
  return (
    <Html lang="en">
 
                    <style>
                        {loader}
                    </style>
          
      <Head />
      <body>
      <Loader />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
