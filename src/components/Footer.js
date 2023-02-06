import Link from "next/link"
import Image from "next/image"
import style from '@/styles/Footer.module.css'
import logo from '../../public/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope ,faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"

function Footer(){
    return (
        <div className={style.container}>
           
          <div className={style.linksContainer}>
                  
          <Link href='/'>
            <Image className={style.logo} src={logo} width={100} height={100} alt="logo" placeholder='blur'/>
            </Link>
            
          <div className={style.links}>
                <h3>Links</h3>
                <ul>
                    <li>
                        About Us
                    </li>
                    <li>
                        Yoga Mats
                    </li>
                    <li>
                        Yoga Socks
                    </li>
                    <li>
                        Yoga Incense
                    </li>
                    <li>
                        Yoga Accessories
                    </li>
                    <li>
                        Shop All
                    </li>
                </ul>
            </div>
            <div className={style.policies}>
            <h3>Policies</h3>
                <ul>
                    <li>
                    Returns & Refund Policy
                    </li>
                    <li>
                    Terms of Service
                    </li>
                    <li>
                    Privacy Policy
                    </li>
                    <li>
                    Shipping Policy
                    </li>
                </ul>
            </div>
            <div className={style.contact}>
            <h3>Contact</h3>
                <ul>
                    <li>
                    <FontAwesomeIcon icon={faEnvelope} className={style.icon}  />
                    <p>mail@domain.com</p>
                    </li>
                    <li>
                    <FontAwesomeIcon icon={faPhone} className={style.icon}  />
                    <p>+961 3 456 789</p>
                    </li>
                  <li>
                    <FontAwesomeIcon icon={faInstagram} className={style.icon}  />
                        <p>@user</p>  
                    </li>
                    <li>
                    <FontAwesomeIcon icon={faFacebook} className={style.icon}  />
                    <p>FB Account</p>
                    </li>
         
                  
                </ul>
            </div>
            <div className={style.attributions}>
            <h3>Attribution</h3>
                <ul>
                    <li>
                        Link 1 
                    </li>
                    <li>
                        Link 2 
                    </li>
                </ul>
            </div>

          </div>
            <div className={style.credits}>
            <p>Designed & Developed By <span>Hamoush</span></p>
            <p>100% MONEY BACK GUARANTEE</p>
            <p>© 2023, Yoga With Olynda</p>
            </div>
           
        </div>
    )
}
export default Footer