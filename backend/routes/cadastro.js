const express = require('express');
const router = express.Router();
const cadastroController = require("../controllers/cadastroControllers");

console.log("✅ ROTA /cadastro FOI CARREGADA");

router.post("/", cadastroController.cadastrar)

module.exports = router;