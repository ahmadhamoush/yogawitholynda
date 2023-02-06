import { initMongoose } from "lib/mongoose"
import { findAllCollections } from "../api/collections"
import CollectionList from "../../components/CollectionList"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
function Collections ({collections}){
    return <>
    <Navbar isCollection={true} />
  <CollectionList all={true}collections={collections} />
  <Footer />
 </>
}
export default Collections
export async function getServerSideProps(){
  await initMongoose()
  return {
    props:{
     collections: JSON.parse(JSON.stringify(await findAllCollections()))
    }
  }
}