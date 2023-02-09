import Link from "next/link"
import Image from "next/image"
import style from '@/styles/PreFooter.module.css'
import img1 from '../../public/bg6.jpg'
import img2 from '../../public/benefits.png'
function PreFooter(){
    return (
        <div className={style.container}>
            <div data-aos="fade-up"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className={style.aboutUs}>
            <Link href='/about'>
            <Image src={img1} alt='Yoga Mats' fill sizes="(max-width: 640px) 100vw,   (max-width: 1200px) 50vw,  33vw"className={style.image} />
            <div className={style.content}>
                <h2>About Us</h2>
            </div>
            <div className={style.overlay}></div>
            </Link>
            </div>
            <div data-aos="fade-up"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className="benefits">
                <Image src={img2} className={style.image} placeholder='blur'  alt='yoga benefits'  fill  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw,33vw"></Image>
 
            </div>
        </div>
    )
}
export default PreFooter