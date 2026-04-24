const express = require('express');
const router = express.Router();
const adminControllers = require("../controllers/adminControllers")
const authAdmin  = require("../middlewares/authAdmin")

router.get('/membros', authAdmin, adminControllers.listar)
router.get('/membros/:id', authAdmin, adminControllers.buscarPorId);
router.post('/membros', authAdmin, adminControllers.criar)
router.put("/membros/:id", authAdmin, adminControllers.atualizar);
router.delete('/membros/:id', authAdmin, adminControllers.deletar)

module.exports = router;    