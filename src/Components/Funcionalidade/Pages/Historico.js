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

import { FaEye, FaEdit, FaTrash, FaReplyAll } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import * as AiIcons from "react-icons/ai";

const Historico = () => {
  const baseURLUser = "http://localhost:3000/historicoUser";
  const baseURLBot = "http://localhost:3000/historicoBot";

  const [chave, setChave] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
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
    const res = await axios.get(baseURLUser);
    const teste = res.data;
    const chave = teste.map((item) => {
      item.criado_em = item.criado_em
        .substr(0, 10)
        .split("-")
        .reverse()
        .join("/");
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

  async function mensagemBot(id) {}

  const columns = [
    {
      title: "Mensagem",
      dataIndex: "texto_Mensagens",
      key: "msg",
    },
    {
      title: "Enviada em",
      dataIndex: "criado_em",
      key: "age",
    },
    {
      title: "Ip",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Arquivo",
      dataIndex: "caminho",
      key: "file",
      render: (text, record) => {
        return (
          <>
            <a
              style={{ fontSize: "28px" }}
              href={`http://localhost:3000/${text}`}
              target="_blank"
            >
              <AiIcons.AiOutlineFolderView />
            </a>
          </>
        );
      },
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
                icon={<FaReplyAll />}
                onClick={(event) => mensagemBot(record.id)}
              />
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
        title="Histórico"
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

export default Historico;
