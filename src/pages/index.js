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
import Layout from '@/components/Layout'


export default function Home({collections,products}) {
  return (
    <>  
     <Layout products={products}>
      <Landing />
      <CollectionList all={false} collections={collections} />
      <ProductList featured={true}  products={products} />
      <Link href ='/collections/all-products'><button className='viewAll'>View All Products</button></Link>        
      <PreFooter />
     </Layout>

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
