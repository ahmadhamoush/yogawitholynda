import style from '@/styles/Announcement.module.css'
function Announcement(){
    return (
        <div data-aos="fade-down"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className={style.container}>
            <p>Super Deal! ! Free Shipping  on Orders over 50$</p>
        </div>
    )
}
export default Announcement