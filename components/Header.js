import Link from "next/link";
import styles from "../styles/header.module.css";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Drop from "./Drop";

function Header() {
  return (
    // NavBar
    <div className={styles.header}>
      <nav>
        <div className={styles.Links}>
          <Link href="/" className={styles.link}>
            <h1>
              <span>Sneak</span>ers
            </h1>
          </Link>
          <div>
            <ul className={styles.menu}>
              <li>
                <Link href="/colections" className={styles.link}>
                  Coleções
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.link}>
                  Sobre
                </Link>
              </li>
            </ul>
          </div>
          {/* DropDown */}
          <div>
            <Drop />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
