import style from '@/styles/Product.module.css'
import Image from "next/image"

function ProductCard (props){
    return(
        <div className={style.cardContainer}>
            <div className={style.imgContainer}>
                <Image src={props.image} alt={`${props.name}`} width={300} height={300} className={style.image} />
            </div>
            <div className={style.details}>
            <p>{props.name}</p>
            <p>{props.price}</p>
            </div>
        </div>
    )
}
export default ProductCard