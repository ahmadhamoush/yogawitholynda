import Link from "next/link"
import Image from "next/image"
import style from '@/styles/Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope ,faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"

function Footer({collections}){

    return (
        <div className={style.container}>
           
          <div className={style.linksContainer}>
                  
          <Link  href='/'>
            <Image className={style.logo} src={'/logo.png'} width={100} height={100} alt="logo"/>
            </Link>
            
          <div className={style.links}>
                <h3>Links</h3>
                <ul>
              
                    <li>
                    <Link className={style.link}  href={'/about'}>
                       About Us
                       </Link>
                    </li>
                  
                   {collections.map(collection=>{
                    return  <li key={collection._id}>
                    <Link className={style.link}  href={collection.href}> 
                        {collection.name}
                        </Link>
                        </li>
                   })}
                    <li>
                       <Link className={style.link} href='/collections/all-products'>Shop All</Link>
                    </li>
                </ul>
            </div>
            <div className={style.policies}>
            <h3>Policies</h3>
                <ul>
                    <li>
                   <Link className={style.link}  href='/policies/refund'> Returns & Refund Policy</Link>
                    </li>
                    <li>
                    <Link className={style.link}  href='/policies/terms'>Terms of Service</Link>
                    </li>
                    <li>
                    <Link className={style.link}  href='/policies/privacy'>Privacy Policy</Link>
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
                    <Link className ={style.insta} href="https://www.instagram.com/yogawitholynda/">
                    <FontAwesomeIcon icon={faInstagram} className={style.icon}  />
                        <p>@yogawitholynda</p>  
                        </Link>
                    </li>
                    <li>
                    <FontAwesomeIcon icon={faFacebook} className={style.icon}  />
                    <p>FB Account</p>
                    </li>
         
                  
                </ul>
            </div>
   
          </div>
            <div  className={style.credits}>
        
            <p>100% MONEY BACK GUARANTEE</p>
            <p>© 2023, Yoga With Olynda</p>
            <p>Designed & Developed By <span>Hamoush</span></p>
            </div>
           
        </div>
    )
}
export default Footer