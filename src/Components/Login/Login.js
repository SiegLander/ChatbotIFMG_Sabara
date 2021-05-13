import React from "react";
import { useNavigate } from "react-router-dom";
import loginrca from "./img/imagem.jpg";
import styles from "./Login.module.css";
import $ from "jquery";

const Login = () => {
  const navigate = useNavigate();

  function auth() {
    const url = "http://localhost:3000/auth";
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        numId: $("#numId").val(),
        pass: $("#pass").val(),
      }),
    })
      .then((resp) => resp.json())
      .then((ret) => {
        if (ret) {
          navigate("../funcionalidade");
        } else {
          alert("Errou o login!");
        }
      });
  }

  return (
    <>
      <div className={styles.loginpage}>
        <div className={styles.imagem}>
          <img src={loginrca} alt="" />
          <p className={styles.nome}>RCA</p>
        </div>
      </div>
      <div className={styles.form}>
        <p className={styles.titulo}>Acesso ao chatbot</p>
        <form className={styles.loginform}>
          <input id="numId" type="text" placeholder="Número de identificação" />
          <input id="pass" type="password" placeholder="Senha" />
          <button onClick={auth}>Entrar</button>
          <p className={styles.message}>
            <p>Esqueceu a senha</p>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
