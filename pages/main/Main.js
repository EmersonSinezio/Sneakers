import Link from "next/link";
import React from "react";
import styles from "../../styles/main.module.css";
function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src="/assets/JORDAN.png" className={styles.image} />
      </div>
      <div className={styles.right}>
        <div className={styles.right_container}>
          <div className={styles.description}>
            <h3>Sneakers</h3>
            <p>
              Explore nossa ampla variedade de marcas renomadas e modelos
              exclusivos que combinam desempenho conforto e estilo. Desde tênis
              de corrida de alto desempenho até opções casuais e estilosas temos
              tudo o que você precisa para se movimentar com confiança.
            </p>
            <p id={styles.description}>
              Explore nossa ampla variedade de marcas renomadas e modelos
              exclusivos que combinam desempenho conforto e estilo.
            </p>
          </div>
          <Link href="/colections">
            <button className={styles.btn}>Visitar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
