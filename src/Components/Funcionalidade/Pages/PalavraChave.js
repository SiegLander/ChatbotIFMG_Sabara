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
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

const PalavraChave = () => {
  const baseURL = "http://localhost:3010/palavrachave";
  const [chave, setChave] = React.useState([]);
  const history = useNavigate();

  async function getChaves() {
    const res = await axios.get(baseURL);

    setChave(res.data);
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

  const onFinish = async (values) => {
    console.log(values);
    const id = new Date();
    await axios.post("http://localhost:3010/palavrachave", {
      nome: values.palavra,
    });
    getChaves();
  };

  const columns = [
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
              <Button icon={<FaEdit />} />
              <Popconfirm
                placement="top"
                title={"Confirma a exclusão ?"}
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
        title="Palavra Chave"
        subTitle="Digite a palavra Chave"
      />

      <Form onFinish={onFinish}>
        <Row>
          <Col sm={20}>
            <Form.Item
              name="palavra"
              rules={[{ required: true, message: "Palavra chave Obrigatoria" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={4}>
            <Button htmlType="submit">Enviar</Button>
          </Col>
        </Row>
      </Form>

      <Table dataSource={chave} columns={columns}></Table>
    </>
  );
};

export default PalavraChave;
