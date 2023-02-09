import style from '@/styles/Product.module.css'
import Image from "next/image"
import Link from 'next/link';
import AOS from 'aos';
import { useEffect } from 'react';

function ProductCard (props){
 
  
    return(
    
    <div data-aos="zoom-in"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className={style.cardContainer}>
           <div style={{position:'relative'}}>
           <Link href='/product/[productId]' as={`/product/${encodeURIComponent(props.name)}`}>
             <div className={style.imgContainer}>
                <Image src={props.image} alt={`${props.name}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1200px) 55vw,33vw"  className={style.image}  />
            </div>
            </Link>    
            <button className={style.add}>+</button>
           </div>
          
            <div className={style.details}>
            <p>{props.name.toUpperCase()}</p>
            <p>${props.price}</p>
            </div>   
        </div>
 
 

        
    )
}
export default ProductCard