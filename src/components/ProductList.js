import ProductCard from './ProductCard'
import style from '@/styles/Product.module.css'
import Link from "next/link"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 670 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 670, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

function ProductList(){
    return(
        
        <div className={style.listContainer}>
            <h2>Featured Products</h2>
          
                <Carousel  containerClass={style.carouselContainer}
                itemClass={style.carouselItem} responsive={responsive}>
                      
               
                <ProductCard category={'Yoga Socks'} name='Non-slip yoga socks' price='16$' image='/product2.png' />
             
        
                <ProductCard name='CHIN MUDRA - YOGA MAT BAG' price='40$' image='/product1.png' />
        
        
       <ProductCard name='Natural Bamboo Incense Stick Holder' price='20$' image='/product3.png' />
              
                 
                <ProductCard name='CHIN MUDRA - YOGA MAT BAG' price='40$' image='/product1.png' />
           
               
               
                <ProductCard name='Natural Bamboo Incense Stick Holder' price='20$' image='/product3.png' />
               
                <ProductCard name='Non-slip yoga socks' price='15$' image='/product2.png' />
           
                
                <ProductCard name='CHIN MUDRA - YOGA MAT BAG' price='40$' image='/product1.png' />
              
                 
                
                <ProductCard name='Non-slip yoga socks' price='15$' image='/product2.png' />
              
                 
           
                <ProductCard name='Natural Bamboo Incense Stick Holder' price='20$' image='/product3.png' />
               
                
                </Carousel>
                <Link href ='/collections/all-products'>
                <button className={style.btn}>View All Products</button>  
                </Link>
              
        </div>
    )
}
export default ProductList