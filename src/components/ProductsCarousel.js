import Image from "next/image"
import { useRouter } from "next/router"

function ProductsCarousel ({products}){

    const router = useRouter()
    return(
       <div className="productsCarouselContainer">
        <div className="productsCarousel">
        <div  className="box">
        {products.filter(product=>product.category==='yoga-mats-bags').map((product,i)=>{
            return <span key={product._id} onClick={()=>{router.push(`/product/${encodeURIComponent(product.name)}`)}} style={{ "--i": i+1 }}>
                <Image className="carouselImg" alt={product.name} src={product.image} width={300} height={300}/>
                <Image className="carouselImgReflection" alt={product.name} src={product.image} width={300} height={300}/>
                </span>
       
        })}
             </div>
            
       </div>
        <h2>Select A Yoga Bag!</h2>
       </div>
    )
}
export default ProductsCarousel