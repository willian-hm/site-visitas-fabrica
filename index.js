const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Middleware para ler dados do formulário
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (css, imagens, js)
app.use(express.static(path.join(__dirname, "public")));

// Rota principal -> mostra o form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota POST -> recebe dados do form
app.post("/enviar", (req, res) => {
  const { nome, email } = req.body;
  // Exemplo: salvar em banco, enviar email, etc.
  res.send(`
    <h1>Formulário recebido!</h1>
    <p>Nome: ${nome}</p>
    <p>Email: ${email}</p>
    <a href="/">Voltar</a>
  `);
});

// Exemplo de rota que carrega um HTML específico
app.get("/sucesso", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "sucesso.html"));
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
