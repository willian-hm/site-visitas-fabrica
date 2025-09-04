const express = require("express");
const path = require("path");
const pool = require("./db");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Página inicial com formulário
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Salvar visita no banco
app.post("/enviar", async (req, res) => {
  try {
    const { nome, email, motivo, empresa } = req.body;
    const result = await pool.query(
      "INSERT INTO visita (nome, email, motivo, empresa, dataentrada) VALUES ($1, $2, $3, $4, NOW()) RETURNING idvisita",
      [nome, email, motivo, empresa]
    );

    res.send(`<h1>Visita registrada com sucesso!</h1>
              <p>ID: ${result.rows[0].idvisita}</p>
              <a href="/">Voltar</a>`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao salvar visita.");
  }
});

// Página HTML de visitas
app.get("/visitas", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "visitas.html"));
});

// API de visitas (JSON)
app.get("/api/visitas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM visita ORDER BY dataentrada DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar visitas.");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
