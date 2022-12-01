import styles from "../styles/shoes.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {MdOutlineRemoveShoppingCart, MdOutlineShoppingCart} from 'react-icons/md'
import { React, useState } from "react";


function ShoesRight({ price}) {
  const [value, setValue] = useState(price);
  const [quantity, setQuantity] = useState(1);
  let [product, setProduct] = useState(false)
  let [buy, setBuy] = useState(false)

  function handleChange(e) {
    if (e.target.id == "dec") {
      if (value <= price) {
      } else {
        setValue(value - price);
        setQuantity(quantity - 1);
      }
    } else {
      setValue(value + price);
      setQuantity(quantity + 1);
    }
  }
  function purchaseMade(){
    setProduct(product = false)
    setBuy(buy = true)
    setTimeout(() => {
      setBuy(buy = false)
    }, 3000);
  }
  return (
    <div className={styles.container_Rigth}>
      <p className={styles.company}>Sneakers Company</p>
      <h1>
        Fall <span>Limited</span> edition Sneakers
      </h1>
      <div className={styles.description}>
        <p id={styles.info}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur
          natus vero perspiciatis dolorum quidem? Ipsam eligendi aspernatur
          optio molestias!
        </p>
        {/* Value */}
        <div className={styles.price}>
          <p>
            ${value}.00 <span>50%</span>
          </p>
          <p id={styles.defaultPrice}>${value * 2}.00</p>
          {/* Div dos botoes */}
          <div className={styles.buttonsContainer}>
            <div className={styles.buttonsDiv}>
              <button id="add" onClick={(e) => handleChange(e)}>
                +
              </button>
              <div id={styles.result}>{quantity}</div>
              <button id="dec" onClick={(e) => handleChange(e)}>
                -
              </button>
            </div>
            {/* Adc ao cart */}
            <div className={styles.addCart}>
              <button onClick={() => setProduct((product = true))}>
                Add to cart
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
                <MdOutlineRemoveShoppingCart className={styles.cartIcon} onClick={() => setProduct(product = false)}/>
                <span>Remover produto?</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {buy == false ? null : <div className={styles.buyScreen}>Compra efetuada com sucesso!</div>}
    </div>
  );
}

export default ShoesRight;
