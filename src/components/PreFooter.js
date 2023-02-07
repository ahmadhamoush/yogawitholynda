import Link from "next/link"
import Image from "next/image"
import style from '@/styles/PreFooter.module.css'
import img1 from '../../public/bg6.jpg'
import img2 from '../../public/benefits.png'
function PreFooter(){
    return (
        <div className={style.container}>
            <div className={style.aboutUs}>
            <Link href='/about'>
            <Image src={img1} alt='Yoga Mats' fill sizes='100%' className={style.image} />
            <div className={style.content}>
                <h2>About Us</h2>
            </div>
            <div className={style.overlay}></div>
            </Link>
            </div>
            <div className="benefits">
                <Image src={img2} className={style.image} placeholder='blur'  alt='yoga benefits'  sizes="100vw" fill></Image>
 
            </div>
        </div>
    )
}
export default PreFooter