import Image from "next/image";
//Imagens dos tenis
const Images = [
  { name: "Duramo_F", price: 125 },
  { name: "Duramo_M", price: 130 },
  { name: "eq19_F", price: 280 },
  { name: "Supernova_2_F", price: 280 },
  { name: "Supernova_2_M", price: 80 },
  { name: "Supernova_M", price: 180 },
];
import Link from "next/link";

import styles from "../styles/cards.module.css";

function Cards() {
  return (
    <div className={styles.cardContainer}>
      {/* fazendo um map e colocando os produtos em cards juntamente com os nomes das imagens */}
      <div className={styles.container_cards}>
        {Images.map((i, index) => (
          <Link href={`/shoes/Shoe_${i.name}`} key={index} className={styles.link}>
            <div className={styles.product}>
              <Image
                src={`/assets/${i.name}_Front.png`}
                width={150}
                height={150}
                className={styles.cards}
                alt={i.name}
              />
              <h3>{i.name}</h3>
              <h2>${i.price}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Cards;
