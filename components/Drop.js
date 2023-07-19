import styles from "../styles/dropdown.module.css";
import { CgDetailsMore } from "react-icons/cg";
import { useState } from "react";
import Link from "next/link";

function Drop() {
  let [change, setChange] = useState(false);
  return (
    //DropDown Menu
    <div className={styles.Container}>
      <div className={styles.dropMenu}>
        <div
          className={styles.dropIcon}
          onClick={() =>
            change == false
              ? setChange((change = true))
              : setChange((change = false))
          }
        >
          <CgDetailsMore size={35} className={styles.Icon} />
        </div>
        {change == false ? null : (
          <div className={styles.ContainerDrop}>
            <ul className={styles.drop}>
              <Link href="/" className={styles.link}>
                <li>Collections</li>
              </Link>
              <Link href="/about" className={styles.link}>
                <li>About</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drop;
