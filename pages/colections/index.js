import Image from "next/image";

//Imagens dos tenis
const products = [
  { name: "Duramo_F" },
  { name: "Duramo_M" },
  { name: "eq19_F" },
  { name: "Supernova_2_F" },
  { name: "Supernova_2_M" },
  { name: "Supernova_M" },
];
import Link from "next/link";
import styles from "../../styles/cards.module.css";
function Collections() {
  return (
    <section className={styles.container}>
      <div className={styles.cardsWrapper}>
        {products.map((product, index) => (
          <div key={index} className={styles.cardItem}>
            {product.discount && (
              <span className={styles.discountRibbon}>
                Save {product.discount}
              </span>
            )}

            <Link href={`/shoes/${product.name}`} className={styles.link}>
              <div className={styles.imageContainer}>
                <Image
                  src={`/assets/${product.name}_Front.png`}
                  fill
                  className={styles.image}
                  alt={product.name}
                />
              </div>

              <div className={styles.details}>
                <h2 className={styles.title}>{product.name}</h2>
                <p className={styles.description}>{product.description}</p>
                <span className={styles.ctaButton}>Ver mais</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Collections;
