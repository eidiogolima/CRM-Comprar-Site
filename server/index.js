const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Teste@123",
  database: "table_test",
});

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

app.get('/api/get', (req, res)=>{
  const sqlSelect =
    "SELECT * FROM client_info";
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  });
})
app.post("/api/insert", (req, res) => {

  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const cpf = req.body.cpf;
  const cnpj = req.body.cnpj;
  const empresa = req.body.empresa;
  const gasto = req.body.gasto;
  const fatura = req.body.fatura;
  const boletos = req.body.boletos;
  const hospedagem = req.body.hospedagem;
  const pendencia = req.body.pendencia;

  const sqlInsert =
    "INSERT INTO client_info (nome, email, telefone, cpf, cnpj, empresa, gasto, fatura, boletos, hospedagem, pendencia) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  db.query(sqlInsert, [nome, email, telefone, cpf, cnpj, empresa, gasto, fatura, boletos, hospedagem, pendencia ], (err, result) => {
    console.log(err)
    if(err)
    return res.sendStatus(400)
    else return res.sendStatus(200)
  });
});


app.delete('/api/delete/:nome', (req, res)=>{
  const nome = req.params.nome;
  const sqlDelete =
  "DELETE FROM client_info WHERE nome = ?";
  db.query(sqlDelete, nome, (err, result)=>{
    if (err) console.log(err);
    });
    res.send("Registro deletado com sucesso!");
})



app.put('/api/update', (req, res)=>{
  const nome = req.body.nome;
  const email = req.body.email;

  const sqlUpdate =
    "UPDATE client_info SET nome = ? WHERE nome = ?";
  db.query(sqlUpdate,[nome, email], (err, result)=>{
    if (err) console.log(err);
    console.log(result);
    res.send("Registro atualizado com sucesso!");
  });    
});


app.listen(3001, () => {
  console.log("running on port 3001");
});

