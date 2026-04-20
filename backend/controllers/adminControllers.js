const initDB = require("../db");

exports.listar = async (req, res) => {
    const db = await initDB();
    res.json({ message: "Listando todos os membros..."});
};

exports.criar = async (req, res) => {
    res.json({ message: "Membro sendo criado..."});
};

exports.atualizar = async (req, res) => {
    const { id } = req.params;
    res.json({ message: `Membro atualizado ${id}.`});
}

exports.deletar = async (req, res) => {
    const { id } = req.params;
    res.json({ message: `Membro deletado ${id}.`})
};

