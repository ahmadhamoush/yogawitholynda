import Layout from "@/components/Layout";
import { initMongoose } from "lib/mongoose";
import { findAllCollections } from "../api/collections";
import { findAllProducts } from "../api/products";

export default function Refund({products,collections}){
    return(
        <Layout collections={collections} products={products}>
           <div className="pageContainer">
           <h2>Return and Refund Policy</h2>
           <h4>No Refund</h4>
            <p>At yogawitholynda, we want you to be completely satisfied with your purchase. However, due to the nature of our products, we cannot accept returns or issue refunds.</p>
            <p>Once a product has been opened, we cannot accept it for return or refund, as it is no longer in its original condition. This policy is in place to ensure the safety and quality of our products for all customers.</p>
            <h4>
            Damaged or Defective Products
            </h4>
            <p>If you receive a damaged or defective product, please contact us at support@yogawitholynda.com within 14 days of delivery and provide a photo of the damage or defect. We will replace the product at no cost to you or provide a full refund if a replacement is not possible.</p>
            <div style={{marginTop: '10px'}}>
            <p>If you have any questions or concerns about our products or your purchase, please contact us at support@yogawitholynda.com and we will do our best to assist you.</p>
            <p>Thank you for choosing yogawitholynda!</p>
            </div>
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