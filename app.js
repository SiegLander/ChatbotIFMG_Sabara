const express = require("express");
const mysql = require("mysql");

// Criando a conexão
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chatbot",
});

// Conexão
db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("MySQL Conectado...");
  }
});

const app = express();
app.use(express.json());

// Inserindo dados na tabela de palavras-chave
app.post("/keyword", (req, res) => {
  let sql = `INSERT INTO palavras_chave(atualizado_em, criado_em, deletado_em, nome) VALUES (null,CURRENT_TIMESTAMP, null, '${req.body.nome}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Insert funcionou...");
  });
});
// Deletar dados na tabela de palavras-chave
app.delete("/keyword", (req, res) => {
  let sql = "DELETE FROM palavras_chave WHERE id=1";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Delete funcionou...");
  });
});
// Atualizando dados na tabela de palavras-chave
app.put("/keyword", (req, res) => {
  let sql = 'UPDATE palavras_chave SET nome = "Histórico" WHERE id=1';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Update funcionou...");
  });
});
// Visualizando dados na tabela de palavras-chave
app.get("/keyword", (req, res) => {
  let sql = "SELECT * FROM palavras_chave";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Get funcionou...");
  });
});

// Autorizando login do admin
app.post("/auth", (req, res) => {
  var body = req.body;
  let sql = `SELECT * FROM admins WHERE numero_identificacao = ${body.numId} AND senha = '${body.pass}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
