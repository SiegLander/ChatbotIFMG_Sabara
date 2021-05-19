import React from "react";
import { useNavigate } from "react-router-dom";
import loginrca from "./img/imagem.jpg";
import styles from "./Login.module.css";
import $ from "jquery";

const Login = () => {
  const navigate = useNavigate();

  function auth() {
    if ($("#numId").val().length > 0 && $("#pass").val().length > 0) {
      const url = "http://chatifmg-com.umbler.net/auth";
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
            console.log("errou");
            navigate("../funcionalidade");
          } else {
            alert("Errou o login!");
          }
        });
    } else {
      alert("Dados inválidos!");
    }
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
        <div className={styles.loginform}>
          <input
            id="numId"
            type="number"
            placeholder="Número de identificação"
            required
          />
          <input id="pass" type="password" placeholder="Senha" required />
          <button onClick={auth}>Entrar</button>
          <p className={styles.message}>
            <p>Esqueceu a senha</p>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
