import style from '@/styles/Product.module.css'
import Image from "next/image"
import Link from 'next/link';
import { useContext} from 'react';
import { ProductsContext } from './ProductsContext';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProductCard (props){
 
  const  {setSelectedProducts} = useContext(ProductsContext)
    const productAddedNoti = () => toast(`${props.name} added to cart!`)

  function addProduct (){
        setSelectedProducts(prev=> [...prev,props.id])
        productAddedNoti()
  }
    return(
        // data-aos="zoom-in"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600"
    <div  className={style.cardContainer}>
           <div style={{position:'relative'}}>
           <Link href='/product/[productId]' as={`/product/${encodeURIComponent(props.name)}`}>
             <div className={style.imgContainer}>
                <Image src={props.image} alt={`${props.name}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1200px) 55vw,33vw"  className={style.image}  />
            </div>
            </Link>    
            <button onClick={addProduct} className={style.add}>
             <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
            </button>
     
           </div>
          
            <div className={style.details}>
            <p>{props.name.toUpperCase()}</p>
            <p>${props.price}</p>
            </div>   
        </div>
    
 

        
    )
}
export default ProductCard