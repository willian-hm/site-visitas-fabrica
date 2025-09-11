const express = require("express");
const router = express.Router();
const visitaController = require("../controllers/visitaController");
const tokenAuth = require("../middlewares/tokenAuth");

// Página inicial
router.get("/", visitaController.paginaInicial);

// Enviar visita
router.post("/enviar", visitaController.enviarVisita);

// Página de visitas (autenticada)
router.get("/visitas", tokenAuth, visitaController.listarVisitas);

module.exports = router;
