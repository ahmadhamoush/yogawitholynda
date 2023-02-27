import Image from "next/image"
import Link from "next/link"

function ProductsCarousel ({products}){

    return(
       <div className="productsCarouselContainer">
        <div className="productsCarousel">
        <div  className="box">
        {products.filter(product=>product.category==='yoga-mats-bags').map((product,i)=>{
            return  <Link key={product._id} href='/product/[productId]' as={`/product/${encodeURIComponent(props.name)}`}>
            <span style={{ "--i": i+1 }}>
                <Image className="carouselImg" alt={product.name} src={product.image} width={300} height={300}/>
                </span></Link>
       
        })}
             </div>
            
       </div>
        <h2>Select A Yoga Bag!</h2>
       </div>
    )
}
export default ProductsCarousel