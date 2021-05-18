import React from "react";
import ReactDOM from "react-dom";
import styles from "./Chatbot.module.css";
import logoifmg from "./image/ifmg.png";
import { ReactComponent as Logo } from "./image/ifmg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import axios from "axios";

const Chatbot = () => {
  const [icon, setIcon] = React.useState(true);
  const baseURL = "http://localhost:3000/chatbot";

  function handleClick(event) {
    event.preventDefault();
    console.log("clicou aqui");
    setIcon(!icon);
    !icon
      ? $(".chatbot").animate({ height: "52" })
      : $(".chatbot").animate({ height: "470" });
  }

  function sendMessage(op) {
    console.log(op);
    const res = axios.post(baseURL, {
      texto_Mensagens: op,
    });

    var element = document.createElement("div");
    element.innerHTML = op;
    element.setAttribute(
      "style",
      "margin-top: 20px;padding: 3%;width: 214px;height: auto;background: white;box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);border-radius: 6px;font-family: Open Sans;font-style: normal;font-weight: normal;font-size: 11px;line-height: 15px;margin-left: auto;margin-right: 21px;text-align: left;"
    );
    document.getElementById("aux").appendChild(element);

    if (op > 3) {
      console.log("REQ");
    }
  }

  return (
    <>
      <div
        className={`${styles.chatbot} chatbot`}
        style={{ height: icon ? 52 + "px" : 470 + "px" }}
      >
        <div className={styles.headerRow} onClick={handleClick}>
          <img
            src={logoifmg}
            className="logoifmg"
            width="21"
            style={{ marginLeft: 6 + "px" }}
          />
          <h2 className={styles.chatbotTitle}>Chatbot</h2>
          <FontAwesomeIcon
            icon={icon ? "chevron-down" : "chevron-up"}
            style={{ color: "white", margin: "auto" }}
          />
        </div>

        <div className={styles.gridBot}>
          {/* <div
            style={{
              backgroundColor: "green",
              margin: "auto",
              padding: 10 + "px",
              borderRadius: 50 + "%",
              marginTop: 29 + "px",
              height: 36 + "px",
              width: 36 + "px,",
            }}
          >
            <FontAwesomeIcon
              icon="user-secret"
              style={{ color: "white", fontSize: 18 + "px" }}
            />
          </div> */}

          <div className={styles.messageBot}>
            Sou o assistente virtual do IFMG, estou aqui para tirar suas dúvidas
            e receber solicitações. Sobre o que deseja falar?
          </div>
        </div>

        <div className={styles.messageClient}>
          <span onClick={() => sendMessage(1)} className={styles.spanLink}>
            &gt; 📖Aproveitamento de Estudos
          </span>
          <br></br>
          <div className={styles.spaceDiv}></div>
          <span onClick={() => sendMessage(2)} className={styles.spanLink}>
            &gt; 🎓Colação de Grau
          </span>
          <br></br>
          <div className={styles.spaceDiv}></div>
          <span onClick={() => sendMessage(3)} className={styles.spanLink}>
            &gt; 🏫Declaração de Matricula ou Histórico
          </span>
          <br></br>
          <div className={styles.spaceDiv}></div>
          <span onClick={() => sendMessage(4)} className={styles.spanLink}>
            &gt; 🔒Trancamento de Matricula{" "}
          </span>
          <br></br>
          <div className={styles.spaceDiv}></div>
          <span
            onClick={() => sendMessage("Quero o Calendário Acadêmico de 2021.")}
            className={styles.spanLink}
          >
            &gt; 📅Calendário Acadêmico
          </span>
          <br></br>
          <div className={styles.spaceDiv}></div>
          <span onClick={() => sendMessage(6)} className={styles.spanLink}>
            &gt; ⌛ Horário de Aula e de Monitorias
          </span>
          <br></br>
        </div>
        <div id="aux"></div>
      </div>
    </>
  );
};

export default Chatbot;
