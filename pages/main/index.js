import React from 'react'
import Image from 'next/image'
import styles from '../../styles/main.module.css'
import Cards from '../../components/cards.js'
function Main() {
  return (
    <div className={styles.container}>
            <Cards/>
    </div>
  )
}

export default Main