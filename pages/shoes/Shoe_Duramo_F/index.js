import Image from "next/image";
import styles from "../../../styles/shoes.module.css";
import Shoes from "../../../components/Shoes";
import ShoesRight from "../../../components/ShoesRight";

function index() {
  return (

    //Criando a parte de vizualização do produto com o clique e a tela ficando cheia
    <div className={styles.containerShoes}>
        <div className={styles.div_left}>
        <Shoes imageSrc = {'/assets/Shoe_Duramo_F_Front.png'} imageSrcB={'/assets/Shoe_Duramo_F_Back.png'}/>
      </div>
      {/* Lado direito do produto que contem informações sobre o mesmo e o botao para add no cart juntamente com a escolha de quantos produtos */}
      <div className={styles.div_rigth}>
        <ShoesRight price={125}/>
      </div>
    </div>
  );
}

export default index;
