import Layout from "@/components/Layout";
import { initMongoose } from "lib/mongoose";
import { findAllCollections } from "../api/collections";
import { findAllProducts } from "../api/products";

export default function Privacy({products,collections}){
    return(
        <Layout collections={collections} products={products}>
           <div className="pageContainer">
           <h2>Privacy Policy</h2>
            <h4>Introduction</h4>
            <p>At yogawitholynda, we take the privacy of our customers seriously and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share the information we gather about you when you use our website and products. By using our Service, you agree to the collection and use of your information as described in this Privacy Policy.</p>
            <h4>Information Collection and Use</h4>
            <p>We may collect the following information about you:</p>
            <ul><li>Personal Information: This includes information such as your name, email address, postal address, and telephone number, which you provide to us when you place an order, sign up for our newsletter, or contact us for support.</li>
            <li>Payment Information: This includes information such as your credit card number but currently we are only taking cash on delivery and billing address, which you provide when you make a purchase through the Service. This information is used for processing payments and for billing purposes.</li></ul>
            <p>We use the information we collect to:</p>
            <ul><li>Provide, maintain, and improve the Service</li>
            <li>Process transactions and send you related information, including confirmations, invoices, and receipts</li>
            <li>Respond to your customer support requests</li>
            <li>Communicate with you about new products, services, and promotions</li>
            <li>Analyze your use of the Service to improve our offerings and enhance your experience</li>
            </ul>
            <h4>Information Sharing and Disclosure</h4>
            <p>We do not sell or rent your personal information to third parties for their marketing purposes. However, we may share your information with third parties as follows:</p>
            <ul><li>Service Providers: We may share your information with service providers who perform services on our behalf, such as payment processing, signing up and customer service.</li>
            <li>Legal Reasons: We may disclose your information if we believe it is necessary to comply with the law, such as in response to a subpoena, court order, or government request.</li>
                </ul>
            <h4>Cookies and Tracking Technologies</h4>
            <p>We use cookies and other tracking technologies to improve the performance of the Service and your experience. Cookies are small text files that are stored on your device when you access the Service. You can configure your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
            <h4>Data Security</h4>
            <p>We have implemented reasonable physical, electronic, and administrative safeguards to protect the personal information we collect. However, no security measures are perfect and we cannot guarantee the security of your personal information.</p>
            <h4>Changes to this Privacy Policy</h4>
            <p>We may revise this Privacy Policy from time to time. The most current version of the Privacy Policy will always be posted on the Service. If we make a material change to the Privacy Policy, we will notify you by email or through a notice on the Service. Your continued use of the Service following the posting of changes will mean that you accept and agree to the revised Privacy Policy.</p>
            <h4>Contact Information</h4>
            <p>If you have any questions or concerns about our Privacy Policy, please contact us at support@yogawitholynda.com.</p>
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