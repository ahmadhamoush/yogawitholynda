import { useState,useEffect, Children } from 'react';
import { useRouter } from 'next/router';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
function Filters({children}){
    const [range,setRage] = useState({min:0, max:100})
    const router  = useRouter()

    return(
        <div className="filters">
                    <div className="filterContainer">
                    <div className="filterHeading">
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
                    <div className="filterContainer">
                    <div className="filterHeading">
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
                   {children}
                </div>
    )
}
export default Filters