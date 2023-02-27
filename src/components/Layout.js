import Head from "next/head";
import Announcement from "./Announcement";
import Footer from "./Footer";
import Navbar from "./Navbar";


function Layout({children,products}){
    return (
       <>
         <Head>
        <title>YOGAWITHOLYNDA</title>
        <meta name="description" content="Yoga Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light only" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <Announcement />
        <Navbar products={products}/>
        {children}
        <Footer />
        </>
    )
}
export default Layout