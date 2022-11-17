import Link from 'next/link'
import styles from '../styles/header.module.css'
import {HiOutlineShoppingCart} from 'react-icons/hi'
function Header() {
  return (
    // NavBar
    <div className={styles.header}>
        <nav>
            <div className={styles.buttons}>
            <Link href='/' className={styles.link}><h1><span>Sneak</span>ers</h1></Link>
            <ul>
                <li><Link href='/' className={styles.link}>Collections</Link></li>
                <li><Link href='/about' className={styles.link}>About</Link></li>
                <li><Link href='/contact' className={styles.link}>Contact</Link></li>
            </ul>
            </div>
        </nav>
        <div className={styles.icons}>
                <HiOutlineShoppingCart className={styles.icon}/>
                <span>Cart</span>
        </div>
    </div>
  )
}

export default Header