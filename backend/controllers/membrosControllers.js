<<<<<<< Updated upstream
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
=======
const fs = require("fs");
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
      membros
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erro ao listar membros"
    });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const db = await initDB();
    const stmt = db.prepare("SELECT * FROM membros WHERE id = ?");
    stmt.bind([req.params.id]);

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

    res.status(200).json({
      success: true,
      membro
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar membro"
    });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const db = await initDB();
    const campos = Object.keys(req.body);
    const valores = Object.values(req.body);

    const setSQL = campos.map(c => `${c} = ?`).join(", ");

    const stmt = db.prepare(
      `UPDATE membros SET ${setSQL} WHERE id = ?`
    );

    stmt.run([...valores, req.params.id]);
    stmt.free();

    const data = db.export();
    fs.writeFileSync("IGREJA.db", Buffer.from(data));

    res.status(200).json({
      success: true,
      message: "Membro atualizado"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar membro"
    });
  }
};

exports.deletar = async (req, res) => {
  try {
    const db = await initDB();
    const stmt = db.prepare("DELETE FROM membros WHERE id = ?");
    stmt.run([req.params.id]);
    stmt.free();

    const data = db.export();
    fs.writeFileSync("IGREJA.db", Buffer.from(data));

    res.status(200).json({
      success: true,
      message: "Membro removido"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erro ao remover membro"
    });
  }
};
>>>>>>> Stashed changes
