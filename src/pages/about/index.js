import Layout from "@/components/Layout";
import { initMongoose } from "lib/mongoose";
import { findAllCollections } from "../api/collections";
import { findAllProducts } from "../api/products";

export default function About({products,collections}){
    return(
        <Layout collections={collections} products={products}>
           <div className="pageContainer">
           <h2>About Us</h2>
            <p>
            Our mission is to unite the yoga community in Lebanon and provide products and services to all yoginis in Lebanon. We are a female owned and female run business whose goal is to make people’s lives richer and less stressful.
            </p>
            
           </div>
        </Layout>
    )
}

export async function getServerSideProps(){
    await initMongoose()
      const products = await findAllProducts()
      const collections = await findAllCollections()
      return{
          props:{
              products: JSON.parse(JSON.stringify(products)),
              collections:JSON.parse(JSON.stringify(collections))
          }
      }
  }