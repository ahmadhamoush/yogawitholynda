import Card from "./CollectionCard"
import style from '@/styles/Collection.module.css'
function List(){
    return(
        
        <div className={style.listContainer}>
            <h1>Collection List</h1>
            <div className={style.cards}>
            <Card title='Yoga Mats' bg='/collection1.png' />
            <Card title='Yoga Socks' bg='/collection2.png'/>
            <Card title='Yoga Incense' bg='/collection3.png' />
            </div>
        </div>
    )
}
export default List