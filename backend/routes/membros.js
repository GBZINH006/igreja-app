const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "Membros listados"})
})
router.get('/:id', (req, res) => {
    res.json({ message: "ID de membros abaixo:"})
})
router.put('/:id', (req, res) => {
    const data = req.body
    res.json({message: 'Usuário editado com sucesso'})
})
router.delete('/:id', (req, res) => {
    const { id } = req.params
    res.json({ message: 'Usuário deletado com sucesso'})
})

module.exports = router;    