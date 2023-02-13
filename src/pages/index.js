import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Announcement from '../components/Announcement'
import Landing from '../components/Landing'
import Navbar from '../components/Navbar'
import CollectionList from '../components/CollectionList'
import ProductList from '../components/ProductList'
import PreFooter from '../components/PreFooter'
import Footer from '../components/Footer'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { findAllCollections } from './api/collections'
import { findAllProducts } from './api/products'
import Search from '../components/Search'


export default function Home({collections,products}) {
  return (
    <>
      <Head>
        <title>YOGAWITHOLYNDA</title>
        <meta name="description" content="Yoga Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <Announcement />
      <Navbar />
      <Search products={products} />
      <Landing />
      <CollectionList all={false} collections={collections} />
      <ProductList featured={true}  products={products} />
      <Link href ='/collections/all-products'><button className='viewAll'>View All Products</button></Link>        
      <PreFooter />
      <Footer />
    </>   
  )
}
export async function getServerSideProps(){
  const collections = await findAllCollections()
  const products = await findAllProducts()
 

  return{
    props:{
      collections: JSON.parse(JSON.stringify(collections)),
      products: JSON.parse(JSON.stringify(products))
    }
  }
}
