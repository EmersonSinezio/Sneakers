import Image from "next/image";
import styles from "../../styles/shoes.module.css";
import Shoes from "../../components/Shoes";
import ShoesRight from "../../components/ShoesRight";
import {useRouter} from 'next/router'

function Shoe() {
    const router = useRouter()
    const shoeId = router.query.shoeId
  return (
    //Criando a parte de vizualização do produto com o clique e a tela ficando cheia
    <div className={styles.containerShoes}>
      <div className={styles.div_left}>
        <Shoes
          imageSrc={"/assets/"+shoeId+"_Front.png"}
          imageSrcB={"/assets/"+shoeId+"_Back.png"}
        />
      </div>
      {/* Lado direito do produto que contem informações sobre o mesmo e o botao para add no cart juntamente com a escolha de quantos produtos */}
      <div className={styles.div_rigth}>
        <ShoesRight price={125} />
      </div>
    </div>
  );
}

export default Shoe;
