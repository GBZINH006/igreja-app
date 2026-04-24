const initDB = require('../db');
const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/auth")

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

        console.log("EMAIL:", email);
        console.log("SENHA:", senha);
        console.log("HASH BANCO:", admin.senha_hash);

        const senhaValida = await bcrypt.compare(
            senha,
            admin.senha_hash
        );

        console.log("CONFERE:", senhaValida);
    
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

        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email,
                role: admin.role,
                congregacao: admin.congregacao,
                setor: admin.setor
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            success: true,
            message: "Olá Seja bem vindo Pastor/Admin",
            token
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