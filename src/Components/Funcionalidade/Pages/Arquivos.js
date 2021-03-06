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

import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import * as AiIcons from "react-icons/ai";

const Arquivos = () => {
  const baseURL = "http://chatifmg-com.umbler.net/arquivos";

  const [chave, setChave] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [dados, setdados] = React.useState("");
  const [idp, setIdp] = React.useState();
  const [nomeEd, setNomeEd] = React.useState();
  const [caminhoEd, setCaminhoEd] = React.useState();
  const [form] = Form.useForm();

  React.useEffect(() => {
    setIdp(dados.id);
    setNomeEd(dados.nome);
    setCaminhoEd(dados.caminho);
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
    if (file != "") {
      const formData = new FormData();
      formData.append("arquivo", file);
      formData.append("caminho", caminhoEd);
      await axios.post(`${baseURL}/upload`, formData);
    }
    const res = await axios.put(`${baseURL}/${idp}`, {
      nome: nomeEd,
      caminho: file != "" ? "storage/files/" + file.name : caminhoEd,
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
  async function onDelete(id, caminho) {
    const res = await axios.delete(`${baseURL}/${id}`, {
      data: {
        caminho: caminho,
      },
    });
    if (res.status === 200) {
      message.success("Lista deletada com sucesso");
    } else {
      message.error("Lista não encontrada");
    }
    getChaves();
  }
  async function editar(id) {
    file = "";
    console.log(file);
    setIsModalVisible(true);
    const res = await axios.get(`${baseURL}/${id}`);
    if (res.status == 200) {
      const arquivos = res.data;
      setdados(arquivos);
    } else {
      console.log("error");
    }
  }

  var file = "";
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    file = e.target.files[0];
    console.log("file:", file);
  };

  const onFinish = async (values) => {
    console.log(file);
    const formData = new FormData();
    formData.append("arquivo", file);
    await axios.post(`${baseURL}/upload`, formData);
    console.log(values);
    const id = new Date();
    await axios.post(baseURL, {
      nome: values.nome,
      caminho: "storage/files/" + values.arquivo.split("\\")[2],
    });
    getChaves();
    form.resetFields();
  };

  const columns = [
    {
      title: "Arquivo",
      dataIndex: "caminho",
      key: "file",
      render: (text, record) => {
        return (
          <>
            <a
              style={{ fontSize: "28px" }}
              href={`http://chatifmg-com.umbler.net/${text}`}
              target="_blank"
            >
              <AiIcons.AiOutlineFolderView />
            </a>
          </>
        );
      },
    },
    {
      title: "Nome",
      dataIndex: "nome",
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
                onConfirm={(e) => onDelete(record.id, record.caminho)}
                okText="Sim"
                cancelText="Não"
              >
                <Button icon={<FaTrash />} onClick={(e) => getId(record.id)} />
              </Popconfirm>
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
        title="Arquivo"
        subTitle="Digite um nome e adicione um arquivo"
        style={{ marginLeft: 260 + "px" }}
      />

      <Form
        onFinish={onFinish}
        style={{ marginLeft: 260 + "px" }}
        form={form}
        name="normal_file"
        encType="multipart/form-data"
        className="file-form"
        initialValues={{
          remember: true,
        }}
      >
        <Row>
          <Col sm={19}>
            <Form.Item
              name="nome"
              rules={[{ required: true, message: "Campo Obrigatoria" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="arquivo"
              rules={[{ required: true, message: "Campo Obrigatoria" }]}
            >
              <Input type="file" onChange={handleFileSelected} />
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
        title="Editar Arquivo"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form encType="multipart/form-data">
          <Form.Item>
            <Input
              value={dados.nome}
              onChange={(event) =>
                setdados((arquivo) => {
                  return { ...arquivo, nome: event.target.value };
                })
              }
            ></Input>
          </Form.Item>
          <Form.Item>
            <Input type="file" onChange={handleFileSelected} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Arquivos;
