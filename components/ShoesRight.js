import styles from "../styles/shoes.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { React, useState } from "react";
import Cart from "./Cart";


function ShoesRight({ price }) {
  const [value, setValue] = useState(price);
  const [quantity, setQuantity] = useState(1);
  let [product, setProduct] = useState(false)

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
  return (
    <div className={styles.container_Rigth}>
      <p>Sneakers Company</p>
      <h1>
        Fall <span>Limited</span> edition Sneakers
      </h1>
      <div className={styles.description}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur
          natus vero perspiciatis dolorum quidem? Ipsam eligendi aspernatur
          optio molestias!
        </p>
        {/* Value */}
        <div className={styles.price}>
          <p>
            {value}.00$ <span>50%</span>
          </p>
          <p id={styles.defaultPrice}>{value * 2}.00$</p>
          {/* Div dos botoes */}
          <div className={styles.buttonsContainer}>
            <div className={styles.buttonsDiv}>
              <button id="add" onClick={(e) => handleChange(e)}>
                +
              </button>
              <div>{quantity}</div>
              <button id="dec" onClick={(e) => handleChange(e)}>
                -
              </button>
            </div>
          {/* Adc ao cart */}
            <div className={styles.addCart}>
              <button onClick={()=> {setProduct(product = true)}}>
                Add to cart
                <AiOutlineShoppingCart size={30} className={styles.icon} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {product == false ? null : (<Cart value={value} p={product}/>)}
      </div>
    </div>
  );
}

export default ShoesRight;
