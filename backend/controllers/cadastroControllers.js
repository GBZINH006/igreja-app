const fs = require("fs");
const initDB = require("../db");

exports.cadastrar = async (req, res) => {
  try {
    const dadosRecebidos = req.body;
    const dados = {};

<<<<<<< Updated upstream
   
    const camposObrigatorios = [
      "tipo_pessoa",
      "congregacao",
      "setor",
      "nome",
      "sexo",
      "estado_civil",
      "nome_pai",
      "nome_mae",
      "data_nascimento",
      "data_casamento",
      "cidade_nascimento",
      "estado_nascimento",
      "email",
      "tipo_sanguineo",
      "doador_sangue",
      "endereco",
      "complemento",
      "bairro",
      "cidade",
      "cep",
      "estado",
      "telefone_residencial",
      "telefone_comercial",
      "telefone_celular",
      "profissao",
      "ocupacao_atual",
      "escolaridade",
      "cpf",
      "rg",
      "forma_recebimento",
      "data_batismo",
      "igreja_batismo",
      "cidade_batismo",
      "pastor",
      "igreja_origem",
      "cidade_origem",
      "data_carta",
      "data_aprovacao",
      "batizado_es_santo",
      "cargo",
      "data_apresentacao",
      "dirigente_congregacao",
      "dirigente_congregacao_data",
      "lider_mocidade",
      "lider_mocidade_data",
      "professor_ebd",
      "professor_ebd_data",
      "lider_missoes",
      "lider_missoes_data",
      "coordenador_geral",
      "coordenador_geral_data",
      "lider_evangelismo",
      "lider_evangelismo_data",
      "lider_culto_familiar",
      "lider_culto_familiar_data",
      "lider_discipulado",
      "lider_discipulado_data",
      "funcao_extra1",
      "funcao_extra2",
      "chefe_familia",
      "nome_conjuge",
      "filhos_quantidade",
      "computador_casa",
      "acessa_internet",
      "observacoes",
      "data_preenchimento",
      "assinatura"
    ];

    const camposFaltando = camposObrigatorios.filter(
      campo =>
        dados[campo] === undefined ||
        dados[campo] === null ||
        dados[campo] === ""
    );

    if (camposFaltando.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Ficha incompleta. Todos os campos são obrigatórios.",
        campos_faltando: camposFaltando
      });
    }

    /* =====================================================
       2. CAMPOS PERMITIDOS (SEGURANÇA)
    ===================================================== */
    const camposPermitidos = [
      "tipo_pessoa",
      "congregacao",
      "setor",
      "nome",
      "sexo",
      "estado_civil",
      "nome_pai",
      "nome_mae",
      "data_nascimento",
      "data_casamento",
      "cidade_nascimento",
      "estado_nascimento",
      "email",
      "tipo_sanguineo",
      "doador_sangue",
      "endereco",
      "complemento",
      "bairro",
      "cidade",
      "cep",
      "estado",
      "telefone_residencial",
      "telefone_comercial",
      "telefone_celular",
      "profissao",
      "ocupacao_atual",
      "escolaridade",
      "cpf",
      "rg",
      "forma_recebimento",
      "data_batismo",
      "igreja_batismo",
      "cidade_batismo",
      "pastor",
      "igreja_origem",
      "cidade_origem",
      "data_carta",
      "data_aprovacao",
      "batizado_es_santo",
      "cargo",
      "data_apresentacao",
      "dirigente_congregacao",
      "dirigente_congregacao_data",
      "lider_mocidade",
      "lider_mocidade_data",
      "professor_ebd",
      "professor_ebd_data",
      "lider_missoes",
      "lider_missoes_data",
      "coordenador_geral",
      "coordenador_geral_data",
      "lider_evangelismo",
      "lider_evangelismo_data",
      "lider_culto_familiar",
      "lider_culto_familiar_data",
      "lider_discipulado",
      "lider_discipulado_data",
      "funcao_extra1",
      "funcao_extra2",
      "chefe_familia",
      "nome_conjuge",
      "filhos_quantidade",
      "computador_casa",
      "acessa_internet",
      "observacoes",
      "data_preenchimento",
      "assinatura",
      ...camposObrigatorios
    ];

    /* =====================================================
       3. MONTAR INSERT DINÂMICO
    ===================================================== */
    const colunas = [];
    const valores = [];

    camposPermitidos.forEach((campo) => {
      colunas.push(campo);
      valores.push(dados[campo]);
=======
    // normalizar dados
    Object.entries(dadosRecebidos).forEach(([key, value]) => {
      if (typeof value === "boolean") dados[key] = value ? "SIM" : "NAO";
      else if (value === "") dados[key] = null;
      else dados[key] = value;
>>>>>>> Stashed changes
    });

    if (!dados.data_preenchimento) {
      dados.data_preenchimento = new Date().toISOString().split("T")[0];
    }

    if (!dados.assinatura) {
      dados.assinatura = "CADASTRO_PUBLICO";
    }

    const colunas = Object.keys(dados);
    const valores = Object.values(dados);
    const placeholders = colunas.map(() => "?").join(", ");

    const sql = `
      INSERT INTO membros (${colunas.join(", ")})
      VALUES (${placeholders})
    `;

    const db = await initDB();
    const stmt = db.prepare(sql);
    stmt.run(valores);
    stmt.free();

    const data = db.export();
    fs.writeFileSync("IGREJA.db", Buffer.from(data));

    return res.status(201).json({
      success: true,
      message: "Cadastro realizado com sucesso"
    });

  } catch (error) {
    console.error("ERRO CADASTRO:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno"
    });
  }
};
