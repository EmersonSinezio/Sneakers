import styles from '../styles/dropdown.module.css'
import {CgDetailsMore} from 'react-icons/cg'
import Link from 'next/link'



function Drop() {
    function drop(){
        let drop = document.getElementById('drop')
        if(drop.className == 'dropdown_drop__fRujW active'){
            drop.classList.remove('active')
        }else{
            drop.classList.add('active')
        }
      }
  return (
    <div>
        <div className={styles.dropMenu}>
            <button>
              <CgDetailsMore size={35} className={styles.dropicon} onClick={()=>drop()}/>
            </button>
              <ul className={styles.drop} id='drop'>
              <Link href='/' className={styles.link}><li>Collections</li></Link>
              <Link href='/about' className={styles.link}><li>About</li></Link>
              <Link href='/contact' className={styles.link}> <li>Contact</li></Link>
            </ul>
              </div>
    </div>
  )
}

export default Drop