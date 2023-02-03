import Card from "./CollectionCard"
import style from '@/styles/Collection.module.css'
import Link from "next/link"
function CollectionList(){
    return(
        
        <div className={style.listContainer}>
            <h1>Collection List</h1>
            <div className={style.cards}>
                <Link href="/collections/yoga-mats">
                <Card title='Yoga Mats' bg='/collection1.png' />
                </Link>
                <Link href="/collections/yoga-socks">
                <Card title='Yoga Socks' bg='/collection2.png'/>
                </Link>
                <Link href="/collections/yoga-incense">
                <Card title='Yoga Incense' bg='/collection3.png' />
                </Link>
            </div>
        </div>
    )
}
export default CollectionList