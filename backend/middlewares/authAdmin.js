const initDB = require("../db");

const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Acesso negado. Token não informado"
            })
        }

        const [, email] = authHeader.split(" ");

        if (!email) {
            return res.status(401).json({
                success: false,
                message: "Token inválido"
            });
        }

        const db = await initDB();

        const stmt = db.prepare(
            "SELECT * FROM admins WHERE email = ?"
        );

        stmt.bind([email]);

        let admin = null;

        if (stmt.step()) {
            admin = stmt.getAsObject();
        }

        stmt.free();

        if(!admin) {
            return res.status(403).json({
                success: false,
                message: "Administrador não autorizado"
            });
        }

        if (admin.ativo !== "SIM") {
            return res.status(403).json({
                success: false,
                message: "Admin desativado"
            });
        }

        req.admin = {
            id: admin.id,
            nome: admin.nome,
            email: admin.email,
            role: admin.role,
            congregacao: admin.congregacao,
            setor: admin.setor
        };

        next();
    } catch (error) {
        console.error("Erro no authAdmin:", error);
        return res.status(500).json({
            success: false,
            message: "Erro interno na autenticação"
        });
    }
};

module.exports = authAdmin;