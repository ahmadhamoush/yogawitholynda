import style from '@/styles/Product.module.css'
import Image from "next/image"
import Link from 'next/link';

function ProductCard (props){
    return(
       
        <div className={style.cardContainer}>
           <div style={{position:'relative'}}>
           <Link href={`/product/${encodeURIComponent('1')}`}>
             <div className={style.imgContainer}>
                <Image src={props.image} alt={`${props.name}`} fill sizes='100vw' className={style.image}  />
            </div>
            </Link>    
            <button className={style.add}>+</button>
           </div>
          
            <div className={style.details}>
            <p>{props.name}</p>
            <p>${props.price}</p>
            </div>   
        </div>
 
    )
}
export default ProductCard