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

const Respostas = () => {
  const baseURL = "http://localhost:3000/respostas";
  const baseURLIntencoes = "http://localhost:3000/intecoes";
  const baseURLPalavras = "http://localhost:3000/palavrachave";
  const baseURLArquivo = "http://localhost:3000/arquivos";

  const [chave, setChave] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [dadosPalavra, setDadosPalavra] = React.useState("");
  const [idp, setIdp] = React.useState();
  const [nomeEd, setNomeEd] = React.useState();
  const [form] = Form.useForm();

  React.useEffect(() => {
    setIdp(dadosPalavra.id);
    setNomeEd(dadosPalavra.nome);
  }, [dadosPalavra]);

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

  async function handleOk() {
    const res = await axios.put(`${baseURL}/${idp}`, {
      nome: nomeEd,
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
    const res = await axios.delete(`${baseURL}/${id}`);
    if (res.status === 200) {
      message.success("Lista deletada com sucesso");
    } else {
      message.error("Lista não encontrada");
    }
    getChaves();
  }
  async function editar(id) {
    setIsModalVisible(true);
    const res = await axios.get(`${baseURL}/${id}`);
    if (res.status == 200) {
      const palavras = res.data;
      setDadosPalavra(palavras);
    } else {
      console.log("error");
    }
  }

  const onFinish = async (values) => {
    console.log(values);
    const id = new Date();
    await axios.post(baseURL, {
      texto_respostas: values.palavra,
    });
    getChaves();
    form.resetFields();
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "texto_respostas",
      key: "name",
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
              <Button
                icon={<FaEdit />}
                onClick={(event) => editar(record.id)}
              />
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
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      createIn: "23/12",
      dataIndex: "03/12/2021 as 23:50",
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
        <Row>
          <Col sm={6}>
            <Form.Item
              name="palavra"
              rules={[{ required: true, message: "Campo Obrigatorio" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={2}>
            <Form.Item
              name="intencao"
              rules={[{ required: true, message: "Campo Obrigatorio" }]}
            >
              <select>
                <option selected value="laranja">
                  Laranja
                </option>
                <option value="limao">Limão</option>
                <option value="coco">Coco</option>
                <option value="manga">Manga</option>
              </select>
            </Form.Item>
          </Col>
          <Col sm={2}>
            <Form.Item
              name="palavra_chave"
              rules={[{ required: true, message: "Campo Obrigatorio" }]}
            >
              {/* <Select>
                <Option value="lucy">lucy</Option>
              </Select> */}
            </Form.Item>
          </Col>
          <Col sm={2}>
            <Form.Item
              name="arquivo"
              rules={[{ required: true, message: "Campo Obrigatorio" }]}
            >
              <select>
                <option selected value="laranja">
                  Laranja
                </option>
                <option value="limao">Limão</option>
                <option value="coco">Coco</option>
                <option value="manga">Manga</option>
              </select>
            </Form.Item>
          </Col>
          <Col sm={4}>
            <Button htmlType="submit">Enviar</Button>
          </Col>
        </Row>
      </Form>

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

      <Modal
        title="Editar resposta"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item>
            <Input
              value={dadosPalavra.nome}
              onChange={(event) =>
                setDadosPalavra((palavra) => {
                  return { ...palavra, nome: event.target.value };
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
