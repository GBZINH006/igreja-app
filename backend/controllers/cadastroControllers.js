const initDB = require("../db");

exports.cadastrar = async (req, res) => {
    try {
        const dados = req.body
        const camposObrigatorios = [
            "tipo_pessoa",
            "nome",
            "cpf",
            "sexo",
            "data_nascimento",
            "forma_recebimento"
        ];
        const camposFaltando = camposObrigatorios.filter(
            (campo) => !dados[campo]
        );

        if (camposFaltando.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Campos obrigatórios não preenchido",
                campos_faltando: camposFaltando
            });
        }

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
      "assinatura"
        ];
        const colunas = [];
        const valores = [];

        camposPermitidos.forEach((campo) => {
            if (dados[campo] !== undefined && dados[campo] !== null) {
                colunas.push(campo);
                valores.push(dados[campo])
            }
        });

        if (colunas.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Nenhum campo válido para cadastro"
            });
        }

        const placeholders = colunas.map(() => "?").join(", ");
        const sql = `
            INSERT INTO membros (${colunas.join(", ")})
            VALUES (${placeholders})
        `;
        const db = await initDB();
        const stmt = db.prepare(sql);
        stmt.run(valores);
        stmt.free();

        res.status(201).json({
            success: true,
            message: "Cadastro realizado com sucesso"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Erro interno estamos fazendo o possivel pra que tudo volte ao normal"
        });
    }
};