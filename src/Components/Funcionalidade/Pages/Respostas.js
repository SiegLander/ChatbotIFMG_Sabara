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
  Select,
} from "antd";

import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import PalavraChave from "./PalavraChave";
import * as AiIcons from "react-icons/ai";

const { Option } = Select;
const Respostas = () => {
  const baseURLPalavraChave = "http://localhost:3000/palavrachave";
  const baseURLIntencoes = "http://localhost:3000/intencoes";
  const baseURLRespostas = "http://localhost:3000/respostas";
  const baseURLArquivo = "http://localhost:3000/arquivos";

  const [chave, setChave] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [idp, setIdp] = React.useState();
  const [nomeEd, setNomeEd] = React.useState();
  const [intencoes, setIntecoes] = React.useState();
  const [dadosPalavra, setDadosPalavra] = React.useState("");
  const [arquivo, setArquivos] = React.useState("");
  const [resposta, setResposta] = React.useState("");
  const [textoResposta, setTextoResposta] = React.useState();
  const [form] = Form.useForm();

  React.useEffect(() => {
    setIdp(dadosPalavra.id);
    setNomeEd(dadosPalavra.texto_respostas);
  }, [dadosPalavra, textoResposta]);

  const history = useNavigate();

  async function getChaves() {
    const resChave = await axios.get(baseURLPalavraChave);
    const resIntencoes = await axios.get(baseURLIntencoes);
    const resArquivo = await axios.get(baseURLArquivo);
    const resResposta = await axios.get(baseURLRespostas);

    const teste = resResposta.data;
    const resposta = teste.map((item) => {
      item.criado_em = item.criado_em
        .substr(0, 10)
        .split("-")
        .reverse()
        .join("/");
      return item;
    });
    setResposta(resposta);
    setChave(resChave.data);
    setIntecoes(resIntencoes.data);
    setArquivos(resArquivo.data);
  }
  React.useEffect(() => {
    getChaves();
  }, []);

  function getId(id) {
    console.log(id);
  }

  async function handleChange() {
    console.log("Mudou");
  }

  async function handleOk() {
    const res = await axios.put(`${baseURLRespostas}/${idp}`, {
      texto_respostas: nomeEd,
    });
    if (res.status == 200) {
      getChaves();
    } else {
      console.log("Não encontrou ");
    }
    setIsModalVisible(false);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }
  async function onDelete(id) {
    const res = await axios.delete(`${baseURLRespostas}/${id}`);
    if (res.status === 200) {
      message.success("Lista deletada com sucesso");
    } else {
      message.error("Lista não encontrada");
    }
    getChaves();
  }
  async function editar(id) {
    setIsModalVisible(true);
    const res = await axios.get(`${baseURLRespostas}/${id}`);
    if (res.status == 200) {
      const palavras = res.data;
      setDadosPalavra(palavras);
      console.log(palavras);
    } else {
      console.log("error");
    }
  }

  const onFinish = async (values) => {
    console.log(values);
    values.texto_respostas = textoResposta;
    console.log(values);

    await axios.post(baseURLRespostas, {
      ...values,
    });
    getChaves();
    form.resetFields();
  };

  const columns = [
    {
      title: "Texto Resposta",
      dataIndex: "texto_respostas",
      key: "name",
    },
    {
      title: "Intencao",
      dataIndex: "nomeIntencao",
      key: "age",
    },
    {
      title: "PalavraChave",
      dataIndex: "nomePalavra",
      key: "age",
    },
    {
      title: "Caminho do Arquivo",
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
      title: "Criado em",
      dataIndex: "criado_em",
      key: "age",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        return (
          <>
            <Space>
              {/* <Button
                icon={<FaEdit />}
                onClick={(event) => editar(record.id)}
              /> */}
              <Popconfirm
                placement="top"
                title={`_ Confirma a exclusão ?`}
                onConfirm={(e) => onDelete(record.id)}
                okText="Sim"
                cancelText="Não"
              >
                <Button icon={<FaTrash />} onClick={(e) => getId(record.id)} />
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
        title="Resposta"
        subTitle="Digite a resposta"
        style={{ marginLeft: 260 + "px" }}
      />

      <Form
        onFinish={onFinish}
        style={{ marginLeft: 260 + "px" }}
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="id_intencao"
          rules={[{ required: true, message: "Campo Obrigatorio" }]}
        >
          <Select
            onChange={handleChange}
            placeholder="Selecione a Intenção"
            style={{ width: 280 }}
          >
            {intencoes &&
              intencoes.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.nome}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="id_PalavrasChave"
          rules={[{ required: true, message: "Campo Obrigatorio" }]}
        >
          <Select
            onChange={handleChange}
            placeholder="Selecione a palavra chave"
            style={{ width: 280 }}
          >
            {chave &&
              chave.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.nome}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="Arquivo_id"
          rules={[{ required: true, message: "Campo Obrigatorio" }]}
        >
          <Select
            onChange={handleChange}
            placeholder="Selecione o arquivo"
            style={{ width: 280 }}
          >
            {arquivo &&
              arquivo.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.nome}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Input
            value={textoResposta}
            onChange={(event) => setTextoResposta(event.target.value)}
          ></Input>
        </Form.Item>

        <Col sm={4}>
          <Button htmlType="submit">Enviar</Button>
        </Col>
      </Form>

      <Table
        pagination={{
          defaultPageSize: 4,
          showSizeChanger: true,
          pageSizeOptions: ["4", "8", "12"],
        }}
        dataSource={resposta}
        columns={columns}
        style={{ marginLeft: 260 + "px" }}
      ></Table>

      <Modal
        title="Editar Texto Resposta"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item>
            <Input
              value={dadosPalavra.texto_respostas}
              onChange={(event) =>
                setDadosPalavra((palavra) => {
                  return { ...palavra, texto_respostas: event.target.value };
                })
              }
            ></Input>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Respostas;
