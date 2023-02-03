import Navbar from "../components/Navbar"
function Collection ({title}){

    return (
        <div className="container">
             <Navbar/>Collection {title}
        </div>
    )
}
export default Collection
export  async function getServerSideProps(context){
const {query} = context;
const collectionName = query.collectionName
console.log(query)
 const collections = ['yoga-mats', 'yoga-socks', 'yoga-incense']
 
 if(!collections.includes(collectionName)){
    return {
        notFound:true
    }
 }

return {
    props:{
        title:collectionName
    }
}
}