import { initMongoose } from "lib/mongoose"
import { findAllCollections } from "../api/collections"
import CollectionList from "../../components/CollectionList"
import { findAllProducts } from "../api/products"
import Layout from "@/components/Layout"

function Collections ({products,collections}){


    return <Layout products={products}>
    <CollectionList all={true}collections={collections} />
    </Layout>
 
}
export default Collections
export async function getServerSideProps(){
  await initMongoose()
  return {
    props:{
     collections: JSON.parse(JSON.stringify(await findAllCollections())),
     products: JSON.parse(JSON.stringify(await findAllProducts())),
    }
  }
}