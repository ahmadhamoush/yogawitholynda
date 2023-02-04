import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard";
import { useState,useEffect } from 'react';
function Collection ({title}){
const [range,setRage] = useState({min:0, max:100})
useEffect(()=>     console.log('range: ' ,range), [range])
    return (
        <div className="container">
            <Announcement  />
             <Navbar isCollection={true} />
            <div className="collectionDesc">
            <h2>{title}</h2>
             <p>Transform your yoga practice with our premium collection of yoga mats. Designed with the modern yogi in mind, each mat offers unparalleled comfort and stability to help you achieve your best poses. Our mats are made with high-quality, non-slip materials that provide a safe and supportive surface, so you can focus on your breath and movement. Choose from a range of thicknesses, sizes, and colors to find the perfect mat that matches your personal style and needs. Whether you are a beginner or a seasoned pro, investing in a quality yoga mat is the key to unlocking your full potential on the mat. Elevate your yoga journey today with our collection of yoga mats.</p>
            </div>
            <div className="collectionContainer">
             <div className="responsiveFilter">
                <button>Filters</button>
             </div>
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
               <div className="filterFlex">
               <div className="filters">
                    <div className="availabilityContainer">
                    <div className="availability">
                    <label  htmlFor="showStock">Availability</label>
                    <input type="checkbox" className='showFilter' id="showStock"></input>
                    <label htmlFor="showStock"></label>
                    <div className="checkboxes">
                      <div className="checkbox">
                      <input type="checkbox" id="inStock" />
                        <label htmlFor="inStock">In Stock</label> 
                        </div>    
                      <div className="checkbox">
                      <input disabled type="checkbox" id="outOfStock" />
                        <label style={{opacity:0.5}} htmlFor="outOfStock">Out of Stock</label>
                        </div>
                   
                         </div> 
                    </div>
 
                         <hr />
               
                    </div>
                    <div className="availabilityContainer">
                    <div className="availability">
                    <label  htmlFor="showPrice">Price</label>
                    <input type="checkbox" className='showFilter' id="showPrice"></input>
                    <label htmlFor="showPrice"></label>
                        <div className='rangeContainer'>
                        <div className='prices'>
                            <div className='priceContainer'>
                                <p>Min</p>
                                <input type="text" disabled value ={range.min} />
                            </div>
                            <div className='priceContainer'>
                                <p>Max</p>
                                <input type="text" disabled value ={range.max} />
                            </div>
                        </div>
                        <RangeSlider min={0} max={100} step={1}  id="range-slider-yellow" onInput ={(e)=>{
                        setRage({min:e[0],max:e[1]})
                        console.log('eveent: ',e)
                    }} />
                        </div>
                    </div>
 
                         <hr />
               
                    </div>
                </div>
                <div className="products">
                <ProductCard name='CHIN MUDRA - YOGA MAT BAG' price='40$' image='/product1.png' />
                <ProductCard name='CHIN MUDRA - YOGA MAT BAG' price='40$' image='/product1.png' />
                <ProductCard name='CHIN MUDRA - YOGA MAT BAG' price='40$' image='/product1.png' />
                <ProductCard name='CHIN MUDRA - YOGA MAT BAG' price='40$' image='/product1.png' />
                <ProductCard name='CHIN MUDRA - YOGA MAT BAG' price='40$' image='/product1.png' />
                <ProductCard name='CHIN MUDRA - YOGA MAT BAG' price='40$' image='/product1.png' />
                <ProductCard name='CHIN MUDRA - YOGA MAT BAG' price='40$' image='/product1.png' />
                <ProductCard name='CHIN MUDRA - YOGA MAT BAG' price='40$' image='/product1.png' />
                <ProductCard name='CHIN MUDRA - YOGA MAT BAG' price='40$' image='/product1.png' />
                </div>
               </div>
            </div>
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