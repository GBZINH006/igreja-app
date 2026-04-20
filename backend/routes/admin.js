const express = require('express');
const router = express.Router();
const adminControllers = require("../controllers/adminControllers")

router.get('/membros', adminControllers.listar)
router.post('/membros', adminControllers.criar)
router.put('/membros/:id', adminControllers.atualizar)
router.delete('/membros/:id', adminControllers.deletar)

module.exports = router;    