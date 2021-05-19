import {
  PageHeader,
  Form,
  Input,
  Button,
  Row,
  Col,
  Table,
  Space,
  Popconfirm,
  message,
  Modal,
} from "antd";

import { FaEye, FaCheck, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

const Avaliacoes = () => {
  const baseURL = "http://localhost:3000/avaliacoes";
  const baseURLArquivo = "http://localhost:3000/arquivos";

  const [chave, setChave] = React.useState([]);
  const [dados, setDados] = React.useState("");
  const [idp, setIdp] = React.useState();
  const [nomeEd, setNomeEd] = React.useState();
  const [form] = Form.useForm();

  React.useEffect(() => {
    setIdp(dados.id);
    setNomeEd(dados.nome);
  }, [dados]);

  const history = useNavigate();

  async function getChaves() {
    const res = await axios.get(baseURL);
    const teste = res.data;
    const chave = teste.map((item) => {
      item.criado_em = item.criado_em
        .substr(0, 10)
        .split("-")
        .reverse()
        .join("/");
      if (item.Lido_em != null) {
        item.Lido_em = item.Lido_em.substr(0, 10)
          .split("-")
          .reverse()
          .join("/");
      }
      if (item.Terminado_em != null) {
        item.Terminado_em = item.Terminado_em.substr(0, 10)
          .split("-")
          .reverse()
          .join("/");
      }

      return item;
    });
    console.log(chave);
    setChave(chave);
  }
  React.useEffect(() => {
    getChaves();
  }, []);

  function getId(id) {
    console.log(id);
  }

  async function onDelete(id) {
    const res = await axios.delete(`${baseURL}/${id}`);
    if (res.status === 200) {
      message.success("Lista deletada com sucesso");
    } else {
      message.error("Lista não encontrada");
    }
    getChaves();
  }

  async function visualizar(caminho, id) {
    console.log(caminho);
    window.open("http://localhost:3000/" + caminho, "_blank");
    const resLido = await axios.put(`${baseURL}Lido/${id}`);
  }

  async function finalizar(id) {
    const res = await axios.put(`${baseURL}Terminado/${id}`);
  }

  const columns = [
    {
      title: "Mensagem",
      dataIndex: "texto_Mensagens",
      key: "name",
    },
    {
      title: "Enviada em",
      dataIndex: "criado_em",
      key: "age",
    },
    {
      title: "Lido em",
      dataIndex: "Lido_em",
      key: "age_read",
    },
    {
      title: "Terminado em",
      dataIndex: "Terminado_em",
      key: "age_finished",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        return (
          <>
            <Space>
              <Button
                icon={<FaEye />}
                onClick={(event) => visualizar(record.caminho, record.evalId)}
              />
              <Popconfirm
                placement="top"
                title={`_ Confirma a finalização ?`}
                onConfirm={(e) => finalizar(record.evalId)}
                okText="Sim"
                cancelText="Não"
              >
                <Button
                  icon={<FaCheck />}
                  onClick={(event) => getId(record.evalId)}
                />
              </Popconfirm>
              <Popconfirm
                placement="top"
                title={`_ Confirma a exclusão ?`}
                onConfirm={(e) => onDelete(record.evalId)}
                okText="Sim"
                cancelText="Não"
              >
                <Button
                  icon={<FaTrash />}
                  onClick={(e) => getId(record.evalId)}
                />
              </Popconfirm>
              ,
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Avaliações"
        subTitle=""
        style={{ marginLeft: 260 + "px" }}
      />

      <Table
        pagination={{
          defaultPageSize: 4,
          showSizeChanger: true,
          pageSizeOptions: ["4", "8", "12"],
        }}
        dataSource={chave}
        columns={columns}
        style={{ marginLeft: 260 + "px" }}
      ></Table>
    </>
  );
};

export default Avaliacoes;
