
import styles from '../styles/shoes.module.css'
import Image from 'next/image'

function Shoes({imageSrc, imageSrcB}) {
  return (
    <div>
        <div>
        <Image
          alt='Shoe'
          src={imageSrc}
          width={500}
          height={500}
          className={styles.previewImage}
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
              alt='Shoe'
            />
            <Image
              src={imageSrcB}
              width={100}
              height={100}
              className={styles.previewImages}
              alt='Shoe'
            />
          </div>
        </div>
    </div>
  )
}

export default Shoes