import React from "react";
import Cards from "../../components/Cards";
import styles from "../../styles/colections.module.css";
const Colections = () => {
  return (
    <div>
      <div className={styles.container}>
        <Cards />
      </div>
    </div>
  );
};

export default Colections;
