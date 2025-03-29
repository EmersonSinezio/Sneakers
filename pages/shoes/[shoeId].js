import styles from "../../styles/shoes.module.css";
import Shoes from "../../components/Shoes";
import ShoesRight from "../../components/ShoesRight";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
const addToCart = () => {
  toast.success("🎉 Compra realizada com sucesso!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

function Shoe() {
  const router = useRouter();
  const shoeId = router.query.shoeId;
  return (
    //Criando a parte de vizualização do produto com o clique e a tela ficando cheia
    <div className={styles.containerShoes}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className={styles.div_left}>
        <Shoes
          imageSrc={"/assets/" + shoeId + "_Front.png"}
          imageSrcB={"/assets/" + shoeId + "_Back.png"}
        />
        <div className={styles.addCart}>
          <button id={styles.addCart} onClick={addToCart}>
            Comprar
          </button>
        </div>
      </div>
      {/* Lado direito do produto que contem informações sobre o mesmo e o botao para add no cart juntamente com a escolha de quantos produtos */}
      <div className={styles.div_rigth}>
        <ShoesRight price={125} />
      </div>
    </div>
  );
}

export default Shoe;
