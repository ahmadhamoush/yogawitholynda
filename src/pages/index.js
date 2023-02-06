import Head from 'next/head'
import Image from 'next/image'
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


export default function Home({collections}) {
  return (
    <>
      <Head>
        <title>YOGAWITHOLYNDA</title>
        <meta name="description" content="Yoga Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" />
    
      </Head>
      <Announcement />
      <Landing />
      <CollectionList all={false} collections={collections} />
      <ProductList />
      <PreFooter />
      <Footer />
    </>
  )
}
export async function getServerSideProps(){
  const collections = await findAllCollections()

  return{
    props:{
      collections: JSON.parse(JSON.stringify(collections))
    }
  }
}
