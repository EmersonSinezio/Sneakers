import styles from "../styles/shoes.module.css";
import {AiOutlineShoppingCart} from 'react-icons/ai'
function ShoesRight({price}) {
  return (
    <div className={styles.container_Rigth}>
      <p>Sneakers Company</p>
      <h1>
        Fall <span>Limited</span> edition Sneakers
      </h1>
      <div className={styles.description}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          consequuntur natus vero perspiciatis dolorum quidem? Ipsam eligendi
          aspernatur optio molestias!
        </p>
        {/* Value */}
        <div className={styles.price}>
          <p>
            {price}.00$ <span>50%</span>
          </p>
          <p id={styles.defaultPrice}>{price * 2}.00$</p>
          {/* Div dos botoes */}
          <div className={styles.buttonsContainer}>
          <div className={styles.buttonsDiv}>
            <button>+</button>
            <div>0</div>
            <button>-</button>
          </div> 
          <div className={styles.addCart}>
            <button>Add to cart <AiOutlineShoppingCart size={30} className={styles.icon}/></button>
          </div>
          </div>
          {/* Adc ao cart */}
         
        </div>
      </div>
    </div>
  );
}

export default ShoesRight;
