const express = require("express");
const router = express.Router();

const adminControllers = require("../controllers/adminControllers");
const authAdmin = require("../middlewares/authAdmin");
const authorizeRole = require("../middlewares/authorizeRole");

// LISTAR
router.get(
  "/membros",
  authAdmin,
  adminControllers.listar
);

// BUSCAR POR ID
router.get(
  "/membros/:id",
  authAdmin,
  adminControllers.buscarPorId
);

// GERAR PDF
router.get(
  "/membros/:id/pdf",
  authAdmin,
  authorizeRole("PASTOR"),
  adminControllers.gerarPdf
);

// ATUALIZAR
router.put(
  "/membros/:id",
  authAdmin,
  authorizeRole("PASTOR"),
  adminControllers.atualizar
);

// DELETAR
router.delete(
  "/membros/:id",
  authAdmin,
  authorizeRole("PASTOR"),
  adminControllers.deletar
);

module.exports = router