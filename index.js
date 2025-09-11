require('dotenv').config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const visitaRoutes = require("./routes/visitaRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Criar pasta uploads se não existir
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Middlewares
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(uploadDir));

// Rotas
app.use("/", visitaRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


// require('dotenv').config();
// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const pool = require("./db");

// const app = express();
// const port = process.env.PORT || 3000;
// const validarLocalizacao = process.env.VALIDAR_LOCALIZACAO === 'true';

// const router = express.Router();

// app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// app.use(express.json({ limit: "10mb" }));
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // servir fotos

// // Criar pasta uploads se não existir
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Funções de geolocalização (Haversine)
// function toRad(value) {
//   return (value * Math.PI) / 180;
// }

// function calcularDistancia(lat1, lon1, lat2, lon2) {
//   const R = 6371e3; // raio da Terra em metros
//   const φ1 = toRad(lat1);
//   const φ2 = toRad(lat2);
//   const Δφ = toRad(lat2 - lat1);
//   const Δλ = toRad(lon2 - lon1);

//   const a =
//     Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//     Math.cos(φ1) * Math.cos(φ2) *
//     Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c; // distância em metros
// }

// // Página inicial
// router.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // Salvar visita
// router.post("/enviar", async (req, res) => {
//   try {
//     const { nome, email, motivo, empresa, fotoBase64, lat, lng } = req.body;

//     if (validarLocalizacao) {

//       // Coordenadas fixas do local permitido
//       const targetLat = parseFloat(process.env.LAT);
//       const targetLng = parseFloat(process.env.LON);

//       if (!lat || !lng) {
//         return res.status(400).send("Localização não enviada.");
//       }

//       const dist = calcularDistancia(parseFloat(lat), parseFloat(lng), targetLat, targetLng);

//       if (dist > 600) {
//         return res.status(403).send("Fora do raio permitido (100m). Registro bloqueado.");
//       }
//     }

//     // Salvar foto
//     let imageName = "default.png";
//     if (fotoBase64 && fotoBase64.startsWith("data:image")) {
//       const base64Data = fotoBase64.replace(/^data:image\/png;base64,/, "");
//       imageName = `foto_${Date.now()}.png`;
//       fs.writeFileSync(path.join(uploadDir, imageName), base64Data, "base64");
//     }

//     await pool.query(
//       "INSERT INTO visita (nome, email, motivo, empresa, dataentrada, foto) VALUES ($1, $2, $3, $4, NOW(), $5)",
//       [nome, email, motivo, empresa, imageName]
//     );

//     // Redireciona para a página de sucesso
//     res.sendFile(path.join(__dirname, "views", "sucesso.html"));
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Erro ao salvar visita.");
//   }
// });

// const TOKEN = process.env.ACCESS_TOKEN;

// // middleware
// const tokenAuth = (req, res, next) => {
//   const token = req.query.token || req.headers['x-access-token'];
//   if (token === TOKEN) {
//     next();
//   } else {
//     res.status(403).sendFile(path.join(__dirname, "public", "negado.html"))
//   }
// };

// // Página de visitas (com dados já carregados)
// router.get("/visitas", tokenAuth, async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM visita ORDER BY dataentrada DESC");

//     // Monta as linhas da tabela
//     const linhas = result.rows.map(v => `
//       <tr>
//         <td><img src="/uploads/${v.foto}" width="100" height="92" style="border-radius:50%;" alt="Foto"></td>
//         <td>${v.nome}</td>
//         <td>${v.email}</td>
//         <td>${v.empresa ?? "-"}</td>
//         <td>${v.motivo}</td>
//         <td>${new Date(v.dataentrada).toLocaleString("pt-BR")}</td>
//       </tr>
//     `).join("");

//     // Carrega o template visitas.html e injeta as linhas
//     let html = fs.readFileSync(path.join(__dirname, "public", "visitas.html"), "utf-8");
//     html = html.replace("<!-- preenchido via JS -->", linhas);

//     res.send(html);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Erro ao buscar visitas.");
//   }
// });

// app.use("/", router);

// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
// });
