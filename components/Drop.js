// components/Drop.js
import { useState, useRef, useEffect } from "react";
import { CgDetailsMore } from "react-icons/cg";
import Link from "next/link";
import styles from "../styles/dropdown.module.css";

function Drop() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.button}>
        <CgDetailsMore size={35} className={styles.icon} />
      </button>

      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
        <Link href="/colections" className={styles.link}>
          <span className={styles.menuItem}>Collections</span>
        </Link>
        <Link href="/about" className={styles.link}>
          <span className={styles.menuItem}>About</span>
        </Link>
        {/* Adicione mais itens conforme necessário */}
      </div>
    </div>
  );
}

export default Drop;
