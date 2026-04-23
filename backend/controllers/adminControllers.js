const initDB = require("../db");

exports.listar = async (req, res) => {
    try {
        const db = await initDB();

        const stmt = db.prepare("SELECT * FROM membros");
        const membros = [];

        while (stmt.step()) {
            membros.push(stmt.getAsObject());
        }

        stmt.free();

        res.status(200).json({
            success: true,
            total: membros.length,
            membros
        });
    } catch (error) {
        console.error("Erro ao listar Membros:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao listar membros :("
        });
    }
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

exports.buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await initDB();

        const stmt = db.prepare(
            "SELECT * FROM membros WHERE id = ?"
        );

        stmt.bind([id]);

        let membro = null;

        if (stmt.step()) {
            membro = stmt.getAsObject();
        }

        stmt.free();

        if (!membro) {
            return res.status(404).json({
                success: false,
                message: "Membro não encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            membro
        });
    } catch (error) {
        console.error("Erro ao buscar membro:", error);
        return res.status(500).json({
            success: false,
            message: "Erro ao buscar membro"
        })
    }
};

