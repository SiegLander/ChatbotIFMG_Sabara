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
  const baseURL = "http://chatifmg-com.umbler.net/chatbot";
  const baseURLRespostas = "http://chatifmg-com.umbler.net/respostas";
  const baseURLArquivos = "http://chatifmg-com.umbler.net/arquivos";
  const baseURLAvaliacoes = "http://chatifmg-com.umbler.net/avaliacoes";

  function handleClick(event) {
    event.preventDefault();
    setIcon(!icon);
    !icon
      ? $(".chatbot").animate({ height: "52" })
      : $(".chatbot").animate({ height: "470" });
  }

  async function sendEval() {
    var fileReq = document.getElementById("fileReq");
    const formData = new FormData();
    formData.append("arquivo", fileReq.files[0]);
    await axios.post(baseURLArquivos + "/upload", formData);
    console.log(fileReq.value);
    const resFile = await axios.post(baseURLArquivos, {
      nome: fileReq.value.split("\\")[2].split(".")[0],
      caminho: "storage/files/" + fileReq.value.split("\\")[2],
    });
    console.log(resFile.data);
    const resMsg = await axios.post(baseURL, {
      Arquivo_id: resFile.data.insertId,
      texto_Mensagens: "Requirimento",
    });
    console.log(resMsg.data);
    const resEvaluation = await axios.post(baseURLAvaliacoes, {
      id_Mensagens: resMsg.data.insertId,
    });
    $("#sendFileBtn").hide();
  }

  async function sendMessage(msg, idResposta) {
    console.log(msg);
    const res = await axios.post(baseURL, {
      texto_Mensagens: msg,
    });

    var element = document.createElement("div");
    element.innerHTML = msg;
    element.setAttribute(
      "style",
      "margin-top: 20px;padding: 3%;width: 214px;height: auto;background: white;box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);border-radius: 6px;font-family: Open Sans;font-style: normal;font-weight: normal;font-size: 11px;line-height: 15px;margin-left: auto;margin-right: 21px;text-align: left;"
    );
    document.getElementById("aux").appendChild(element);

    setTimeout(async function () {
      const resResposta = await axios.get(baseURLRespostas + "/" + idResposta);
      var dados = resResposta.data;
      var element = document.createElement("div");
      element.innerHTML = dados.texto_respostas;
      element.setAttribute(
        "style",
        "margin-top: 20px;padding: 3%;width: 265px;height: auto;background: white;box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);border-radius: 6px;font-family: Open Sans;font-style: normal;font-weight: normal;font-size: 11px;line-height: 15px;margin-left: 9px;text-align: left;"
      );
      document.getElementById("aux").appendChild(element);

      if (dados.caminho) {
        var downloadDiv = document.createElement("div");
        var fileName = dados.caminho.split("/")[2];
        element.appendChild(downloadDiv);
        var downloadBtn = document.createElement("a");
        var downloadIcon = document.createElement("i");

        downloadBtn.setAttribute(
          "href",
          "http://chatifmg-com.umbler.net/" + dados.caminho
        );
        downloadBtn.setAttribute("download", fileName);
        downloadBtn.setAttribute("target", "_blank");
        downloadBtn.setAttribute(
          "style",
          "color:#ff0202;font-size:15px;margin-left: 8px;"
        );
        downloadBtn.innerHTML = fileName;

        downloadIcon.setAttribute("class", "fa fa-download");
        downloadIcon.setAttribute(
          "style",
          "font-size:15px; float: right; margin-right:10px"
        );

        downloadDiv.setAttribute(
          "style",
          "width: 100%; height: 23px; background: #CBCBCB; border-radius: 2px; padding-top:4px; margin-top: 6px;"
        );
        downloadDiv.appendChild(downloadBtn);
        downloadDiv.appendChild(downloadIcon);
      }
    }, 1000);

    if (idResposta != 1 && idResposta != 6) {
      setTimeout(async function () {
        //input de arquivo
        var inputFile = document.createElement("input");
        inputFile.setAttribute("type", "file");
        inputFile.setAttribute("id", "fileReq");
        inputFile.setAttribute("style", "font-size:15px; margin-right:10px");
        document.getElementById("aux").appendChild(inputFile);
        $("#sendFileBtn").show();
      }, 1100);
    }
  }

  async function afterAnswer() {}

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
        <div
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            height: "412px",
            maxHeight: "412px",
          }}
        >
          <div className={styles.gridBot}>
            <div className={styles.messageBot}>
              Sou o assistente virtual do IFMG, estou aqui para tirar suas
              dúvidas e receber solicitações. Sobre o que deseja falar?
            </div>
          </div>

          <div className={styles.messageClient}>
            <span onClick={() => sendMessage(1, 2)} className={styles.spanLink}>
              &gt; 📖Aproveitamento de Estudos
            </span>
            <br></br>
            <div className={styles.spaceDiv}></div>
            <span onClick={() => sendMessage(2, 3)} className={styles.spanLink}>
              &gt; 🎓Colação de Grau
            </span>
            <br></br>
            <div className={styles.spaceDiv}></div>
            <span onClick={() => sendMessage(3, 4)} className={styles.spanLink}>
              &gt; 🏫Declaração de Matricula ou Histórico
            </span>
            <br></br>
            <div className={styles.spaceDiv}></div>
            <span
              onClick={() =>
                sendMessage(
                  "Desejo realizar o trancamento da minha matrícula.",
                  5
                )
              }
              className={styles.spanLink}
            >
              &gt; 🔒Trancamento de Matricula{" "}
            </span>
            <br></br>
            <div className={styles.spaceDiv}></div>
            <span
              onClick={() =>
                sendMessage("Quero o Calendário Acadêmico de 2021.", 1)
              }
              className={styles.spanLink}
            >
              &gt; 📅Calendário Acadêmico
            </span>
            <br></br>
            <div className={styles.spaceDiv}></div>
            <span onClick={() => sendMessage(6, 6)} className={styles.spanLink}>
              &gt; ⌛ Horário de Aula e de Monitorias
            </span>
            <br></br>
          </div>
          <div id="aux"></div>
          <button
            id="sendFileBtn"
            style={{ display: "none" }}
            onClick={() => sendEval()}
          >
            Enviar
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
