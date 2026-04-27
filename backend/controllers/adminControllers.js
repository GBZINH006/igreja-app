const fs = require("fs");
const initDB = require("../db");
const PDFDocument = require("pdfkit");
const path = require("path");

exports.gerarPdf = async (req, res) => {
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

    const doc = new PDFDocument({ size: "A4", margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ficha_membro_${membro.id}.pdf`
    );

    doc.pipe(res);

    /* ========== TÍTULO ========== */
    doc.fontSize(18).text("FICHA CADASTRAL DE MEMBRO", { align: "center" });
    doc.moveDown(2);

    /* ========== IDENTIFICAÇÃO ========== */
    doc.fontSize(14).text("IDENTIFICAÇÃO", { underline: true });
    doc.moveDown();
    doc.fontSize(11);
    doc.text(`Tipo: ${membro.tipo_pessoa}`);
    doc.text(`Congregação: ${membro.congregacao}`);
    doc.text(`Setor: ${membro.setor}`);
    doc.text(`Nome: ${membro.nome}`);
    doc.text(`Sexo: ${membro.sexo}`);
    doc.text(`Estado Civil: ${membro.estado_civil}`);
    doc.moveDown();

    /* ========== FAMILIA ========== */
    doc.fontSize(14).text("FAMÍLIA", { underline: true });
    doc.moveDown();
    doc.fontSize(11);
    doc.text(`Pai: ${membro.nome_pai}`);
    doc.text(`Mãe: ${membro.nome_mae}`);
    doc.text(`Cônjuge: ${membro.nome_conjuge}`);
    doc.text(`Chefe da Família: ${membro.chefe_familia}`);
    doc.text(`Quantidade de Filhos: ${membro.filhos_quantidade}`);
    doc.moveDown();

    /* ========== DADOS PESSOAIS ========== */
    doc.fontSize(14).text("DADOS PESSOAIS", { underline: true });
    doc.moveDown();
    doc.fontSize(11);
    doc.text(`Nascimento: ${membro.data_nascimento}`);
    doc.text(`Casamento: ${membro.data_casamento}`);
    doc.text(`Cidade de Nascimento: ${membro.cidade_nascimento}`);
    doc.text(`Estado de Nascimento: ${membro.estado_nascimento}`);
    doc.text(`Tipo Sanguíneo: ${membro.tipo_sanguineo}`);
    doc.text(`Doador de Sangue: ${membro.doador_sangue}`);
    doc.moveDown();

    /* ========== ENDEREÇO ========== */
    doc.fontSize(14).text("ENDEREÇO", { underline: true });
    doc.moveDown();
    doc.fontSize(11);
    doc.text(`Endereço: ${membro.endereco}`);
    doc.text(`Complemento: ${membro.complemento}`);
    doc.text(`Bairro: ${membro.bairro}`);
    doc.text(`Cidade: ${membro.cidade}`);
    doc.text(`CEP: ${membro.cep}`);
    doc.text(`Estado: ${membro.estado}`);
    doc.moveDown();

    /* ========== CONTATOS ========== */
    doc.fontSize(14).text("CONTATOS", { underline: true });
    doc.moveDown();
    doc.fontSize(11);
    doc.text(`Telefone Residencial: ${membro.telefone_residencial}`);
    doc.text(`Telefone Comercial: ${membro.telefone_comercial}`);
    doc.text(`Telefone Celular: ${membro.telefone_celular}`);
    doc.text(`Email: ${membro.email}`);
    doc.moveDown();

    /* ========== PROFISSÃO / ESCOLARIDADE ========== */
    doc.fontSize(14).text("PROFISSÃO E ESCOLARIDADE", { underline: true });
    doc.moveDown();
    doc.fontSize(11);
    doc.text(`Profissão: ${membro.profissao}`);
    doc.text(`Ocupação Atual: ${membro.ocupacao_atual}`);
    doc.text(`Escolaridade: ${membro.escolaridade}`);
    doc.moveDown();

    /* ========== DOCUMENTOS ========== */
    doc.fontSize(14).text("DOCUMENTOS", { underline: true });
    doc.moveDown();
    doc.fontSize(11);
    doc.text(`CPF: ${membro.cpf}`);
    doc.text(`RG: ${membro.rg}`);
    doc.moveDown();

    /* ========== SITUAÇÃO ESPIRITUAL ========== */
    doc.fontSize(14).text("SITUAÇÃO ESPIRITUAL", { underline: true });
    doc.moveDown();
    doc.fontSize(11);
    doc.text(`Forma de Recebimento: ${membro.forma_recebimento}`);
    doc.text(`Batizado em Águas: ${membro.data_batismo}`);
    doc.text(`Igreja do Batismo: ${membro.igreja_batismo}`);
    doc.text(`Cidade do Batismo: ${membro.cidade_batismo}`);
    doc.text(`Pastor: ${membro.pastor}`);
    doc.text(`Batizado no Espírito Santo: ${membro.batizado_es_santo}`);
    doc.moveDown();

    /* ========== CARTA / APROVAÇÃO ========== */
    doc.fontSize(14).text("CARTA / APROVAÇÃO", { underline: true });
    doc.moveDown();
    doc.fontSize(11);
    doc.text(`Igreja de Origem: ${membro.igreja_origem}`);
    doc.text(`Cidade de Origem: ${membro.cidade_origem}`);
    doc.text(`Data da Carta: ${membro.data_carta}`);
    doc.text(`Data de Aprovação: ${membro.data_aprovacao}`);
    doc.moveDown();

    /* ========== LIDERANÇA / FUNÇÕES ========== */
    doc.fontSize(14).text("LIDERANÇA / FUNÇÕES", { underline: true });
    doc.moveDown();
    doc.fontSize(11);
    doc.text(`Cargo: ${membro.cargo}`);
    doc.text(`Data de Apresentação: ${membro.data_apresentacao}`);
    doc.text(`Dirigente de Congregação: ${membro.dirigente_congregacao}`);
    doc.text(`Líder Mocidade: ${membro.lider_mocidade}`);
    doc.text(`Professor EBD: ${membro.professor_ebd}`);
    doc.text(`Líder Missões: ${membro.lider_missoes}`);
    doc.text(`Coordenador Geral: ${membro.coordenador_geral}`);
    doc.text(`Líder Evangelismo: ${membro.lider_evangelismo}`);
    doc.text(`Líder Culto Familiar: ${membro.lider_culto_familiar}`);
    doc.text(`Líder Discipulado: ${membro.lider_discipulado}`);
    doc.text(`Função Extra 1: ${membro.funcao_extra1}`);
    doc.text(`Função Extra 2: ${membro.funcao_extra2}`);
    doc.moveDown();

    /* ========== TECNOLOGIA ========== */
    doc.fontSize(14).text("TECNOLOGIA", { underline: true });
    doc.moveDown();
    doc.fontSize(11);
    doc.text(`Computador em Casa: ${membro.computador_casa}`);
    doc.text(`Acesso à Internet: ${membro.acessa_internet}`);
    doc.moveDown();

    /* ========== OBSERVAÇÕES ========== */
    doc.fontSize(14).text("OBSERVAÇÕES", { underline: true });
    doc.moveDown();
    doc.fontSize(11);
    doc.text(membro.observacoes || "-");
    doc.moveDown(2);

    /* ========== METADADOS ========== */

    doc.moveDown(3);
    doc.fontSize(12);
    doc.text("____________________________________________");
    doc.text("Assinatura do Responsável");
    doc.moveDown();

    doc.text(`Nome: ${membro.nome}`);
    doc.text(`Data: ${new Date().toLocaleDateString("pt-BR")}`);


    doc.end();

  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao gerar PDF"
    });
  }
};

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
  res.json({ message: "Membro criado com sucesso" })
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
