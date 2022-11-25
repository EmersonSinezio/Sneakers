import React, { useState, useEffect } from 'react'
import styles from '../styles/cart.module.css'
import {MdOutlineRemoveShoppingCart, MdOutlineShoppingCart} from 'react-icons/md'


function buy(e){
  let [product, setProduct] = useState(true)
  const c = document.getElementById('cart')
  console.log(c.id)
  console.log(c.classList)
  
}


function Cart({value, p}) {
  const [price, setPrice] = useState(value)
  return (
    <div className={styles.cartContainer} id='cart'>
        <h1>Valor Total: {price}</h1>
        <div>
        <MdOutlineShoppingCart className={styles.icon} onClick={()=>buy()}/>
        <span>Finalizar Compra?</span>
        </div>
        <div>
        <MdOutlineRemoveShoppingCart className={styles.icon}/>
        <span>Remover produto?</span>
        </div>
    </div>
)
      
}


export default Cart