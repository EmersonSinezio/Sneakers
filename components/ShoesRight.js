import styles from "../styles/shoes.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  MdOutlineRemoveShoppingCart,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { React, useState } from "react";

function ShoesRight({ price }) {
  const [value, setValue] = useState(price);
  let [product, setProduct] = useState(false);
  let [buy, setBuy] = useState(false);

  function purchaseMade() {
    setProduct((product = false));
    setBuy((buy = true));
    setTimeout(() => {
      setBuy((buy = false));
    }, 3000);
  }
  return (
    <div className={styles.container_Rigth}>
      <p className={styles.company}>Sneakers Company</p>
      <h1>
        Tênis de edição <span>Limitada</span>
      </h1>
      <div className={styles.description}>
        <p id={styles.info}>
          Uma verdadeira revolução em conforto e desempenho. Este tênis leve e
          elegante é projetado para acompanhar você em todas as suas aventuras
          diárias. Com sua entressola de alta absorção de impacto e sola de
          tração durável, oferece um amortecimento suave e uma aderência firme
          em qualquer superfície.
        </p>
        {/* Value */}
        <div className={styles.price}>
          <p>
            ${value}.00 <span>50%</span>
          </p>
          <p id={styles.defaultPrice}>${value * 2}.00</p>
          {/* Div dos botoes */}
          <div className={styles.buttonsContainer}>
            {/* Adc ao cart */}
            <div className={styles.addCart}>
              <button onClick={() => setProduct((product = true))}>
                Add carrinho
                <AiOutlineShoppingCart size={30} className={styles.icon} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {product == false ? null : (
          <div>
            <div className={styles.cartContainer} id="cart">
              <h1>Valor Total: {value}</h1>
              <div>
                <MdOutlineShoppingCart
                  className={styles.cartIcon}
                  onClick={() => purchaseMade()}
                />
                <span>Finalizar Compra?</span>
              </div>
              <div>
                <MdOutlineRemoveShoppingCart
                  className={styles.cartIcon}
                  onClick={() => setProduct((product = false))}
                />
                <span>Remover produto?</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {buy == false ? null : (
        <div className={styles.buyScreen}>Compra efetuada com sucesso!</div>
      )}
    </div>
  );
}

export default ShoesRight;
