import style from '@/styles/Product.module.css'
import Image from "next/image"
import Link from 'next/link';
import { useContext} from 'react';
import { ProductsContext } from './ProductsContext';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {toast } from 'react-toastify';
import { useRouter } from 'next/router';

function ProductCard (props){
 
const  {setSelectedProducts} = useContext(ProductsContext)
const productAddedNoti = () => toast(`${props.name} added to cart!`)
const router = useRouter()
  async function addProduct (){
        if(props.stock===0){
          toast('Out of Stock')
        }
        else{
          setSelectedProducts(prev=> [...prev,props.id])
        productAddedNoti()
        router.push('/cart')
        }
  }
    return(
        // data-aos="zoom-in"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600"
    <div  className={style.cardContainer}>
           <div style={{position:'relative'}}>
           <Link href='/product/[productId]' as={`/product/${encodeURIComponent(props.name)}`}>
             <div className={style.imgContainer}>
                <Image style={{opacity : props.stock === 0 ? '0.5' : '1'}} src={props.image} alt={`${props.name}`} fill sizes="100%"  className={style.image}  />
                {props.stock === 0 && <p className={style.outOfStock}>Out of Stock</p>}
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