import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Chatbot from "../Components/Chatbot/Chatbot";
const Home = () => {
  return (
    <>
      <nav className={styles.nav}>
        <Link className={styles.adm} to="/login">
          Administrativo
        </Link>
      </nav>
      <main className={`${styles.main}`}>
        <div className={styles.menuLateral}></div>
        <div className={styles.divisoria}>
          <div className={styles.cabecalho}></div>
          <h2>Lorem Ipsum, Lorem Ipsum, Lorem Ipsum.!</h2>
          <p>
            Apenas um texto de descrição daquele jeito talvez, talvez por favor
            é isso.
          </p>
          <div className={styles.conteudo}></div>
        </div>
        <Chatbot />
      </main>
    </>
  );
};

export default Home;
