import Card from "./CollectionCard"
import style from '@/styles/Collection.module.css'
import Link from "next/link"
function CollectionList({collections,all}){
    return(     
        <div className={style.listContainer}>
            <h2 data-aos="fade-up"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">Collection List</h2>
            <div className={style.cards}>
                {collections.map(collection=>{
                    return(
                        all ? <Link key={collection._id}  href={collection.href}>
                        <Card name={collection.name} bg={collection.image} />
                        </Link>: collection.featured && <Link key={collection._id}  href={collection.href}>
                        <Card name={collection.name} bg={collection.image} />
                        </Link>
                        
                    )
                })}            
            </div>
        </div>
    )
}
export default CollectionList