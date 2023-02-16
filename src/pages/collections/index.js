import { initMongoose } from "lib/mongoose"
import { findAllCollections } from "../api/collections"
import CollectionList from "../../components/CollectionList"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import { findAllProducts } from "../api/products"
import Search from "@/components/Search"

function Collections ({collections,products}){


    return <>

    <Navbar isCollection={true} />
    <Search products={products} />
  <CollectionList all={true}collections={collections} />
  <Footer />
 </>
}
export default Collections
export async function getServerSideProps(){
  await initMongoose()
  return {
    props:{
     collections: JSON.parse(JSON.stringify(await findAllCollections())),
     products: JSON.parse(JSON.stringify(await findAllProducts()))
    }
  }
}