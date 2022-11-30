import styles from '../../styles/contact.module.css'
import {AiOutlineGithub, AiOutlineLinkedin} from 'react-icons/ai'
import Link from 'next/link'

function index() {
  return (
    <div className={styles.container}>
        <Link href='https://www.linkedin.com/in/emerson-mesquita-317a81258?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B7N26%2Bv0TQomJlQ6K%2Ft4ZvQ%3D%3D' className={styles.link}>
            <AiOutlineLinkedin className={styles.icon}/>
        </Link>
        <Link href='https://github.com/EmersonSinezio' className={styles.link}>
            <AiOutlineGithub className={styles.icon}/>
        </Link>
        <div className={styles.link}>
            <h2>Email</h2>
            <p>emerson.sineziio@gmail.com</p>
        </div>
    </div>
  )
}

export default index