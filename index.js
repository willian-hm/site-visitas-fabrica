const express = require("express");
const path = require("path");
const fs = require("fs");
const pool = require("./db");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // servir fotos

// Criar pasta uploads se não existir
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Salvar visita
app.post("/enviar", async (req, res) => {
  try {
    const { nome, email, motivo, empresa, fotoBase64 } = req.body;

    let imageName = "default.png";
    if (fotoBase64 && fotoBase64.startsWith("data:image")) {
      const base64Data = fotoBase64.replace(/^data:image\/png;base64,/, "");
      imageName = `foto_${Date.now()}.png`;
      fs.writeFileSync(path.join(uploadDir, imageName), base64Data, "base64");
    }

    const result = await pool.query(
      "INSERT INTO visita (nome, email, motivo, empresa, dataentrada, foto) VALUES ($1, $2, $3, $4, NOW(), $5) RETURNING idvisita",
      [nome, email, motivo, empresa, imageName]
    );

    res.send(`<h1>Visita registrada com sucesso!</h1>
              <p>ID: ${result.rows[0].idvisita}</p>
              <a href="/">Voltar</a>`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao salvar visita.");
  }
});

// Página de visitas
app.get("/visitas", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "visitas.html"));
});

// API de visitas
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
