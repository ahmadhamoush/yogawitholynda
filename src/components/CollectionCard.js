import style from '@/styles/Collection.module.css'
import Image from 'next/image'
function Card(props){
    return (
        <div className={style.cardContainer}>
              <Image src={props.bg} alt={props.name} fill sizes='100%' className={style.image} />
            <div className={style.content}>
                <h3>{props.name}</h3>
                <button>Shop Now</button>
            </div>
            <div className={style.overlay}></div>
        </div>
    )
}
export default Card  