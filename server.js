const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());

// Carregar dados
let data = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

// Rotas
app.get('/usuarios', (req, res) => {
  res.json(data.usuarios);
});

app.post('/usuarios', (req, res) => {
  const novoUsuario = req.body;
  novoUsuario.id = Date.now();
  data.usuarios.push(novoUsuario);
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
  res.status(201).json(novoUsuario);
});

app.get('/produtos', (req, res) => {
  res.json(data.produtos);
});

app.post('/produtos', (req, res) => {
  const novoProduto = req.body;
  novoProduto.id = Date.now();
  data.produtos.push(novoProduto);
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
  res.status(201).json(novoProduto);
});


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
