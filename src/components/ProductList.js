import ProductCard from './ProductCard'
import style from '@/styles/Product.module.css'



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

function ProductList({products,featured}){

    return(
        
        <div className={style.listContainer}>
            <h2 data-aos="fade-up"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">{featured ? 'Featured' : 'Similar'} Products</h2>
          
              <div className={style.productsSnapping}>
                      
                {
                  products.map((product,index)=>{
                    if(featured){
                      return product.featured &&  <ProductCard key={index} id={product._id} category={product.category} name={product.name} price={product.price} image={product.image} />
                    }
                    else{ 
                      return  <ProductCard key={index} id={product._id} category={product.category} name={product.name} price={product.price} image={product.image} />
                    }
                
                  })
                }
                               
            </div>
               
        </div>
    )
}
export default ProductList