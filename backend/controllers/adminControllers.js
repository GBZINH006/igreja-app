const fs = require("fs");
const initDB = require("../db");
const PDFDocument = require("pdfkit");
const path = require("path");

exports.gerarPdf = async(req, res) => {
    try {
        const  { id } = req.params;
        const db = await initDB();

        const stmt = db.prepare("SELECT * FROM membros WHERE id = ?");
        stmt.nind([id]);

        let membro = null;
        if (stmt.step()) {
            membro = stmt.getAsObject();
        }
        stmt.free();

        if (!membro) {
            return res.status(404).json({
                success: false,
                message: "Membro não encontrado :("
            });
        }

        const doc = new PDFDocument({ size: "A4", margin: 40 });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=ficha_membro_${membro.id}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(18).text("Ficha Cadastral", { align: "center" });
        doc.moveDown(2);

        doc.fontSize(12);
        doc.text(`Membro/Congregado: ${membro.tipo_pessoa}`);
        doc.text(`Congregação: ${membro.congregacao}`);
        doc.text(`Setor: ${membro.setor}`);
        doc.text(`Nome: ${membro.nome}`);
        doc.text(`Sexo: ${membro.sexo}`);
        doc.text(`Estado Civil: ${membro.estado_civil}`);
        doc.text(`Pai: ${membro.nome_pai}`);
        doc.text(`Mae: ${membro.nome_mae}`);
        doc.text(`Data Nascimento: ${membro.data_nascimento}`);
        doc.text(`Data Casamento: ${membro.data_casamento}`);
        doc.text(`Cidade Nascimento: ${membro.cidade_nascimento}`);
        doc.text(`Estado: ${membro.estado_nascimento}`);
        doc.text(`E-mail: ${membro.email}`);
        doc.text(`Tipo Sanguìneo: ${membro.tipo_sanguineo}`);
        doc.text(`Doador de Sangue? ${membro.doador_sangue}`);
        doc.text(`Endereço: ${membro.endereco}`);
        doc.text(`Complemento: ${membro.complemento}`);
        doc.text(`Bairro: ${membro.bairro}`);
        doc.text(`Cidade: ${membro.cidade}`);
        doc.text(`CEP: ${membro.cep}`);
        doc.text(`Estado: ${estado}`);
        doc.text(`Telefone Residencial: ${membro.telefone_residencial}`);
        doc.text(`Telefone Comercial: ${membro.telefone_comercial}`);
        doc.text(`Telefone Celular: ${membro.telefone_celular}`);
        doc.text(`Profissão: ${membro.profissao}`);
        doc.text(`Ocupação Atual: ${membro.ocupacao_atual}`);
        doc.text(`Escolaridade ${membro.escolaridade}`);
        doc.text(`CPF: ${membro.cpf}`);
        doc.text(`RG: ${membro.rg}`);
        doc.text(`Forma de Recebimento ${membro.forma_recebimento}`);
        doc.text(`Data do Batismo: ${membro.data_batismo}`);
        doc.text(`Igreja: ${membro.igreja_batismo}`);
        doc.text(``)
    }
}

exports.listar = async (req, res) => {
  try {
    const db = await initDB();
    const stmt = db.prepare("SELECT * FROM membros");
    const membros = [];

    while (stmt.step()) {
      membros.push(stmt.getAsObject());
    }

    stmt.free();

    return res.status(200).json({
      success: true,
      total: membros.length,
      membros
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao listar membros"
    });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await initDB();

    const stmt = db.prepare("SELECT * FROM membros WHERE id = ?");
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
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar membro"
    });
  }
};

exports.criar = async (req, res) => {
    res.json({ message: "Membro criado com sucesso"})
}

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    const camposPermitidos = [
      "congregacao",
      "setor",
      "nome",
      "sexo",
      "estado_civil",
      "email",
      "endereco",
      "bairro",
      "cidade",
      "cep",
      "estado",
      "telefone_celular",
      "profissao",
      "ocupacao_atual",
      "cargo",
      "observacoes"
    ];

    const campos = [];
    const valores = [];

    camposPermitidos.forEach(campo => {
      if (dados[campo] !== undefined) {
        campos.push(`${campo} = ?`);
        valores.push(dados[campo]);
      }
    });

    if (campos.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nenhum campo válido para atualização"
      });
    }

    valores.push(id);

    const db = await initDB();
    const stmt = db.prepare(
      `UPDATE membros SET ${campos.join(", ")} WHERE id = ?`
    );

    stmt.run(valores);
    stmt.free();

    const data = db.export();
    fs.writeFileSync("IGREJA.db", Buffer.from(data));

    return res.status(200).json({
      success: true,
      message: "Ficha atualizada com sucesso"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar ficha"
    });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await initDB();

    const stmt = db.prepare("DELETE FROM membros WHERE id = ?");
    stmt.run([id]);
    stmt.free();

    const data = db.export();
    fs.writeFileSync("IGREJA.db", Buffer.from(data));

    return res.status(200).json({
      success: true,
      message: "Membro removido com sucesso"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao remover membro"
    });
  }
};
