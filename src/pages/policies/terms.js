import Layout from "@/components/Layout";
import { initMongoose } from "lib/mongoose";
import { findAllCollections } from "../api/collections";
import { findAllProducts } from "../api/products";

export default function Refund({products,collections}){
    return(
        <Layout collections={collections} products={products}>
           <div className="pageContainer">
           <h2>Terms of Service for yogawitholynda</h2>
           <p>Welcome to yogawitholynda, a website for buying yoga-related products. These Terms of Service (the &quot;Terms&quot;) govern your use of the yogawitholynda website (the &quot;Service&quot;). By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy, which is incorporated into these Terms. If you do not agree to these Terms, you may not use the Service.</p>
            <h4>Product Description</h4>
            <p>yogawitholynda sells yoga-related products through the Service. We strive to provide accurate information about the products we offer, including their features and specifications. However, we do not guarantee the accuracy of the information and reserve the right to modify it at any time without prior notice.</p>
            <h4>Order Processing and Payment</h4>
            <p>To purchase a product through the Service, you must follow the ordering process provided on the website. Once you have placed an order, we will send you an email confirming the details of your purchase. You agree to pay the price indicated for the product, as well as any shipping and handling charges. We accept payment through the payment methods indicated on the website.</p>
            <h4>Delivery and Risk of Loss</h4>
            <p>We will make commercially reasonable efforts to deliver the products you have ordered in a timely manner. The risk of loss for the products will pass to you upon delivery. If you do not receive your order or if you receive a damaged product, please contact us at support@yogawitholynda.com.</p>
            <h4>Refunds and Returns</h4>
            <p>At yogawitholynda, we want you to be completely satisfied with your purchase. However, due to the nature of our products, we cannot accept returns or issue refunds.</p>
            <p>Once a product has been opened, we cannot accept it for return or refund, as it is no longer in its original condition. This policy is in place to ensure the safety and quality of our products for all customers.</p>
            <h4>Intellectual Property</h4>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of yogawitholynda and its licensors. The Service is protected by copyright, trademark, and other laws of both Lebanon and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of yogawitholynda.</p>
            <h4>Disclaimer of Warranties</h4>
            <p>The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. yogawitholynda makes no representations or warranties of any kind, express or implied, as to the operation of the Service or the information, content, materials, or products included on the Service. You expressly agree that your use of the Service is at your sole risk.</p>
            <h4>Limitation of Liability</h4>
            <p>In no event shall yogawitholynda or its affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the Service or your inability to use the Service, or for any other claim related in any way to your use of the Service, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the Service, any unauthorized access to or alteration of your transmissions or data, any statements or conduct of any third party on the Service, or any other matter relating to the Service.</p>
            <h4>Governing Law</h4>
            <p>These Terms and your use of the Service will be governed under the laws of Lebanon, without reference to its choice of law provisions. Any dispute arising from these
            terms or your use of the Service will be resolved exclusively in the courts located in Lebanon. You agree to submit to the jurisdiction of these courts for the purpose of litigating all such claims or disputes.
            </p>
            <h4>Changes to the Terms</h4>
            <p>yogawitholynda reserves the right to modify these Terms at any time without prior notice. Any changes to the Terms will be effective immediately upon posting the updated Terms on the Service. Your continued use of the Service following the posting of changes will mean that you accept and agree to the revised Terms.</p>
            <h4>Entire Agreement</h4>
            <p>These Terms, together with the Privacy Policy, constitute the entire agreement between you and yogawitholynda with respect to the use of the Service. If any provision of these Terms is found to be invalid, the remaining provisions will remain in full force and effect.</p>
            <h4>Contact Information</h4>
            <p>If you have any questions about these Terms, please contact us at support@yogawitholynda.com.</p>
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