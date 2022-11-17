import Image from "next/image";
const Images = [
  "Shoe_Duramo_F",
  "Shoe_Duramo_M",
  "Shoe_eq19_F",
  "Shoe_Supernova_2_F",
  "Shoe_Supernova_2_M",
  "Shoe_Supernova_M",
];
import Link from "next/link";

import styles from "../styles/cards.module.css";

function Cards() {
  return (
    <div className={styles.cardContainer}>
      <h1>Adidas</h1>
      {/* fazendo um map e colocando os produtos em cards juntamente com os nomes das imagens */}
      <div className={styles.container_cards}>
        {Images.map((i, index) => (
          <Link href={`/shoes/${i}`} key={index}>
            <div>
              <Image
                src={`/assets/${i}_Front.png`}
                width={100}
                height={100}
                className={styles.cards}
                alt={i}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Cards;
