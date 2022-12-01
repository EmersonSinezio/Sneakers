import Image from "next/image";
//Imagens dos tenis
const Images = [
  { name: "Duramo_F" },
  { name: "Duramo_M" },
  { name: "eq19_F" },
  { name: "Supernova_2_F" },
  { name: "Supernova_2_M"},
  { name: "Supernova_M" },
];
import Link from "next/link";

import styles from "../styles/cards.module.css";

function Cards() {
  return (
    <div className={styles.cardContainer}>
      {/* fazendo um map e colocando os produtos em cards juntamente com os nomes das imagens */}
      <div className={styles.container_cards}>
        {Images.map((i, index) => (
          <Link href={`/shoes/${i.name}`} key={index} className={styles.link}>
            <div className={styles.product}>
              <Image
                src={`/assets/${i.name}_Front.png`}
                width={150}
                height={150}
                className={styles.cards}
                alt={i.name}
              />
              <h3>{i.name}</h3>
              <h2>$125</h2> 
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Cards;
