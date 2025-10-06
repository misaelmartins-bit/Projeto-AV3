const express = require('express');
const cors  = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./clinica.db', (err) =>{
    if (err) console.error(err.message);
    else console.log ('Conectado ao banco de dados');
});

db.run (`CREATE TABLE IF NOT EXISTS clientes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT NOT NULL,
    dataNascimento DATE NOT NULL,
    email TEXT NOT NULL
    )`);


app.get('/clientes', (req, res) => {
    db.all('SELECT * FROM clientes', [], (err, rows) => {
        if (err) res.status(500).json({error: err.message});
        else res.json(rows);
    });
});


app.get('/clientes/login', (req, res) => {
  const { nome, cpf, dataNascimento, email } = req.query;

  if (!nome || !cpf || !dataNascimento || !email) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  const sql = `
    SELECT * FROM clientes 
    WHERE nome = ? AND cpf = ? AND dataNascimento = ? AND email = ?
  `;

  db.get(sql, [nome, cpf, dataNascimento, email], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (row) {
      res.json({ message: "Login realizado com sucesso!", cliente: row });
    } else {
      res.status(404).json({ error: "Nenhum cliente encontrado com essas informações." });
    }
  });
});

app.post('/clientes', (req, res) => {
  const { nome, cpf, dataNascimento, email } = req.body;

  const sqlCheck = `SELECT * FROM clientes WHERE cpf = ? OR email = ?`;
  db.get(sqlCheck, [cpf, email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (row) {
      return res.status(400).json({ error: "Já existe um cliente com este CPF ou e-mail!" });
    }

    const sqlInsert = `
      INSERT INTO clientes (nome, cpf, dataNascimento, email)
      VALUES (?, ?, ?, ?)
    `;
    db.run(sqlInsert, [nome, cpf, dataNascimento, email], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          message: "Cliente cadastrado com sucesso!",
          id: this.lastID,
          nome,
          cpf,
          dataNascimento,
          email
        });
      }
    });
  });
});


app.listen(3000, () => console.log ("Servidor rodando em http://localhost:3000"));