import Link from "next/link";
import styles from "../../styles/about.module.css";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
function About() {
  return (
    <div className={styles.About}>
      <div className={styles.about_description}>
        <h1>Sobre</h1>
        <p>
          Bem-vindo ao site Sneakers! Aqui você encontrará uma seleção incrível
          de tênis para todos os gostos e estilos. Nossa paixão é proporcionar a
          você uma experiência única ao escolher seus calçados. Explore nossa
          variedade de modelos e encontre o tênis perfeito para acompanhar você
          em todas as suas jornadas. Descubra qualidade, conforto e estilo em
          cada par de tênis que oferecemos. Seja bem-vindo e aproveite sua
          visita!
        </p>
      </div>
      <div className={styles.footer}>
        <div className={styles.icons_container}>
          <Link
            href="https://github.com/EmersonSinezio"
            className={styles.icon}
          >
            <FiGithub id={styles.icon} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/emerson-sineziio"
            className={styles.icon}
          >
            <FiLinkedin id={styles.icon} />
          </Link>
          <Link
            href="mailto:emerson.sineziio@gmail.com"
            className={styles.icon}
          >
            <AiOutlineMail id={styles.icon} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
