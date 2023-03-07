import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Search from "./Search";

function Layout({children,products,collections}){
    return (
       <div className="layout">
         <Head>
        <title>YOGAWITHOLYNDA</title>
        <meta name="description" content="Yoga Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#ffffff"/>
        <link rel="icon" href="/logo.jpg" />
      </Head>
        <Navbar collections={collections}/>
        <Search products={products} />
        {children}
        <Footer collections={collections} />
        </div>
    )
}
export default Layout