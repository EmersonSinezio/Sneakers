import styles from '../styles/shoes.module.css'
import Image from 'next/image'
import {useState} from 'react'

function Shoes({imageSrc, imageSrcB}) {
  let [image,setImage] = useState(imageSrc)
  
  return (
    <div className={styles.left_container}>
        <div>
        <Image
          alt='Shoe'
          src={image}
          width={500}
          height={500}
          className={styles.fullImage}
          />
        <div>
        </div>
        {/* Parte de baixo das imagens (Imagens pequenas) */}
          <div className={styles.bottomImages}>
            <Image
              src={imageSrc}
              width={100}
              height={100}
              className={styles.previewImages}
              onClick={()=>setImage(image = imageSrc)}
              alt='Shoe'
            />
            <Image
              src={imageSrcB}
              width={100}
              height={100}
              className={styles.previewImages}
              alt='Shoe'
              onClick={()=>setImage(image = imageSrcB)}
            />  
          </div>
        </div>
    </div>
  )
}

export default Shoes