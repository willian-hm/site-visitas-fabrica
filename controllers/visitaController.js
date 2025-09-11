const path = require("path");
const fs = require("fs");
const visitaModel = require("../models/visitaModel");
const geolocalizacaoService = require("../services/geolocalizacaoService");
const fotoService = require("../services/fotoService");

const validarLocalizacao = process.env.VALIDAR_LOCALIZACAO === 'true';
const uploadDir = path.join(__dirname, "../uploads");

const rootDir = path.resolve(__dirname, ".."); // /app

module.exports = {

    paginaInicial: (req, res) => {
        res.sendFile(path.join(__dirname, "public", "index.html"));
    },

    enviarVisita: async (req, res) => {
        try {
            const { nome, email, motivo, empresa, fotoBase64, lat, lng } = req.body;

            if (validarLocalizacao) {
                const targetLat = parseFloat(process.env.LAT);
                const targetLng = parseFloat(process.env.LON);

                if (!lat || !lng) return res.status(400).send("Localização não enviada.");

                const dist = geolocalizacaoService.calcularDistancia(parseFloat(lat), parseFloat(lng), targetLat, targetLng);
                if (dist > 600) return res.status(403).send("Fora do raio permitido (100m). Registro bloqueado.");
            }

            const imageName = await fotoService.salvarFoto(fotoBase64, uploadDir);
            console.log("Nome da imagem salva:", imageName);


            await visitaModel.salvarVisita({ nome, email, motivo, empresa, foto: imageName });

            res.sendFile(path.join(rootDir, "views", "sucesso.html"));
        } catch (err) {
            console.error(err);
            res.status(500).send("Erro ao salvar visita.");
        }
    },

    listarVisitas: async (req, res) => {
        try {
            const visitas = await visitaModel.obterVisitas();

            const linhas = visitas.map(v => `
        <tr>
          <td><img src="/uploads/${v.foto}" width="100" height="92" style="border-radius:50%;" alt="Foto"></td>
          <td>${v.nome}</td>
          <td>${v.email}</td>
          <td>${v.empresa ?? "-"}</td>
          <td>${v.motivo}</td>
          <td>${new Date(v.dataentrada).toLocaleString("pt-BR")}</td>
        </tr>
      `).join("");

            let html = fs.readFileSync(path.join(rootDir, "public", "visitas.html"), "utf-8");
            html = html.replace("<!-- preenchido via JS -->", linhas);

            res.send(html);
        } catch (err) {
            console.error(err);
            res.status(500).send("Erro ao buscar visitas.");
        }
    }
};
