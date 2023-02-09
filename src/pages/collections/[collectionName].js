import Announcement from "../../components/Announcement";
import Navbar from "../../components/Navbar"
import ProductCard from "../../components/ProductCard";
import Filters from '../../components/Filters';
import Footer from "../../components/Footer";
import { initMongoose } from "lib/mongoose";
import { findAllProducts,listCollection } from "../api/products";
import {findAllCollections } from "../api/collections";

function Collection ({title, isProducts,products}){

    return (
        <div className="container">
            <Announcement  />
             <Navbar isCollection={true} />
            <div data-aos="fade-up"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className="collectionDesc">
            <h2>{title}</h2>
             <p>Transform your yoga practice with our premium collection of yoga mats. Designed with the modern yogi in mind, each mat offers unparalleled comfort and stability to help you achieve your best poses. Our mats are made with high-quality, non-slip materials that provide a safe and supportive surface, so you can focus on your breath and movement. Choose from a range of thicknesses, sizes, and colors to find the perfect mat that matches your personal style and needs. Whether you are a beginner or a seasoned pro, investing in a quality yoga mat is the key to unlocking your full potential on the mat. Elevate your yoga journey today with our collection of yoga mats.</p>
            </div>
            <div data-aos="fade-up"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className="collectionContainer">
             <div className="responsiveFilter">
                <button>Filters</button>
             </div>
             <div className="collectionFlex">
             <div className="sortFlex">
            <p>Home / Collections / Yoga Mats </p>
            <div className="box filters">
            <label htmlFor="select">Sort By:</label>
            <select id='select'>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
                <option>Option 5</option>
            </select>
            </div>
            </div>
               <div className="filterFlex">
               <Filters>
               {isProducts && (
                <div className="filterContainer">
                <div className="filterHeading">
                <label  htmlFor="showCategories">Categories</label>
                <input type="checkbox" className='showFilter' id="showCategories"></input>
                <label htmlFor="showCategories"></label>
                <div className="checkboxes">
                  <div className="checkbox">
                  <input type="checkbox" id="mats" />
                    <label htmlFor="mats">Yoga Mats</label> 
                    </div>    
                    <div className="checkbox">
                  <input type="checkbox" id="socks" />
                    <label htmlFor="socks">Yoga Socks</label> 
                    </div> 
                    <div className="checkbox">
                  <input type="checkbox" id="incense" />
                    <label htmlFor="incense">Yoga Incense</label> 
                    </div> 
                    <div className="checkbox">
                  <input type="checkbox" id="acc" />
                    <label htmlFor="acc">Accessories</label> 
                    </div> 
               
                     </div> 
                </div>

                     <hr />
           
                </div>
               )
}
               </Filters>
                  <div className="products">
                {products.map(product=>{
                  return <ProductCard key={product._id} name={product.name} price={product.price} image={product.image} />
                })}
                </div>
               </div>
             </div>
      
            </div>
            <Footer />
        </div>
    )
}
export default Collection

export  async function getServerSideProps(context){
  await initMongoose()
const {query} = context;
const collectionName = query.collectionName
let products;
 products  = await listCollection(collectionName)
if(collectionName === 'all-products'){
   products  = await findAllProducts()
}
let isProducts = false;
console.log(query)

//  const collections = ['yoga-mats-bags', 'yoga-socks', 'yoga-incense', 'all-products']
  const collections = await findAllCollections()

  let paths =['all-products']
  collections.forEach(collection => {
    let pathName = collection.href.split('/')
    paths.push(pathName[pathName.length-1])
  });
  if(!paths.includes(collectionName)){
    return {
        notFound:true
    }
 }


return {
    props:{
        title:collectionName.toUpperCase().replace('-',' '),
        isProducts: isProducts,
        products:JSON.parse(JSON.stringify(products))

    }
}
}