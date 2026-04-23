const initDB = require('../db');
const bcrypt = require("bcrypt");
const fs = require("fs")

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                success: false,
                message: "Email e senha obrigatórios"
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

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Credenciais inválidas"
            });
        }

        if (admin.ativo !== "SIM") {
            return res.status(403).json({
                success: false,
                message: "Administrador desativado"
            })
        }

        const senhaValida = await bcrypt.compare(
            senha,
            admin.senha_hash
        );
        bcrypt.hash("adbelavist@9", "$2b$10$pXpg1AF4ke8qSdUto/2kFexZHxISF7At0i2jC8wERVA9AS0tJd7TC$2b$10$pXpg1AF4ke8qSdUto/2kFexZHxISF7At0i2jC8wERVA9AS0tJd7TC").then(console.log)

        if (!senhaValida) {
            return res.status(401).json({
                success: false,
                message: "Credenciais inválidas"
            });
        }

        const updateStmt = db.prepare(
            "UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?"
        );

        updateStmt.run([admin.id])
        updateStmt.free();

        const data = db.export();
        fs.writeFileSync("IGREJA.db", Buffer.from(data));

        return res.status(200).json({
            success: true,
            message: "Login realizado com sucesso",
            admin: {
                id: admin.id,
                nome: admin.nome,
                email: admin.email,
                role: admin.role,
                congregacao: admin.congregacao,
                setor: admin.setor
            }
        });
    } catch (error) {
        console.log("🔥 ERRO REAL DO LOGIN ADMIN 🔥");
        console.log(error);
        console.log("MESSAGE:", error.message);
        console.log("STACK:", error.stack);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    ``
};