const db = require("../db");

exports.listar = (req, res) => {
    db.all("SELECT * FROM membros", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json({ total: rows.length, membros: rows })
    })
}
exports.buscarPorId = (req, res) => {
    const { id } = req.params

    db.get("SELECT * FROM membros WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (!row) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        res.status(200).json({ membros: row })
    })
}

exports.deletar = (req, res) => {
    const { id } = req.params

    db.run("DELETE FROM membros WHERE id = ?", [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json({ message: "Membro Deletado!" })
    })
}

exports.atualizar = (req, res) => {
    const { id } = req.params
    const data = req.body

    const campos = [];
    const valores = [];

    Object.keys(data).forEach(campo => {
        campos.push(`${campo} = ?`);
        valores.push(data[campo]);
    });

    valores.push(id);

    db.run(`UPDATE membros SET ${campos.join(", ")} WHERE id = ?`, valores, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.status(200).json({ message: "Membro Atualizado com sucesso!" })
    })
}