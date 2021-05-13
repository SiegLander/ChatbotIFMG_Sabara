import React from "react";
import styles from "./Chatbot.module.css";
import logoifmg from "./image/ifmg.png";
import { ReactComponent as Logo } from "./image/ifmg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";

const Chatbot = () => {
  const [icon, setIcon] = React.useState(true);

  function handleClick(event) {
    event.preventDefault();
    console.log("clicou aqui");
    setIcon(!icon);
    !icon
      ? $(".chatbot").animate({ height: "52" })
      : $(".chatbot").animate({ height: "470" });
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
          <div
            style={{
              backgroundColor: "green",
              margin: "auto",
              padding: 10 + "px",
              borderRadius: 50 + "px",
              marginTop: 22 + "px",
            }}
          >
            <FontAwesomeIcon
              icon="user-secret"
              style={{ color: "white", fontSize: 18 + "px" }}
            />
          </div>
          <div className={styles.messageBot}>
            Sou o assistente virtual do IFMG, estou aqui para tirar suas dúvidas
            e receber solicitações. Sobre o que deseja falar?
          </div>
        </div>
        <div className={styles.messageClient}>
          📅 Quero o calendário de 2021
        </div>
      </div>
    </>
  );
};

export default Chatbot;
