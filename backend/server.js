const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express()
app.use(cors())
app.use(express.json());

const db = new sqlite3.Database("./IGREJA.db", () => {
    if (err) {
        console.log("Erro ao conectar banco de dados")
    } else {
        console.log("Banco de dados conectado com sucesso")
    }
})

app.get("/", (req, res) => {
    res.json({ status: 'API da igreja rodando' });
});

app.post("/membros", (req, res) => {
    const data = req.body;

    const sql = `
        INSERT INTO membros (
            tipo_pessoa,
            congregacao,
            setor,
            nome,
            sexo,
            estado_civil,
            data_nascimento,
            cidade_nascimento,
            estado_nascimento,
            email,
            tipo_sanguineo,
            doador_sangue,
            endereco,
            complemento,
            bairro,
            cidade,
            cep,
            estado,
            telefone_residencial,
            telefone_comercial,
            telefone celular,
            profissao,
            ocupacao_atual
            escolaridade,
            cpf,
            rg,
            forma_recebimento,
            data_batismo,
            igreja_batismo,
            cidade_batismo,
            pastor,
            igreja_origem,
            cidade_origem,
            data_carta,
            data_aprovacao,
            batizado_es_santo,
            cargo,
            data_apresentacao,
            dirigente_congregacao,
            dirigente_congregacao_data,
            lider_mocidade,
            lider_mocidade_data,
            professor_ebd,
            professor_ebd_data,
            lider_missoes,
            lider_missoes_data,
            coordenador_geral,
            coordenador_geral_data,
            lider_evangelismo,
            lider_evangelismo_data,
            lider_culto_familiar,
            lider_culto_familiar_data,
            lider_discipulado,
            lider_discipulado_data,
            funcao_extra1,
            funcao_extra2,
            chefe_familia,
            nome_conjuge,
            filhos_quantidade
            computador_casa,
            acessa_internet,
            observacoes,
            data_preencimento,
            assinatura,
            created_at
        ) VALUES (
            ?,?,?,?,?,?,
            ?,?,?,?,?,?,
            ?,?,?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,?,?,
            ?,?,?,?,?,?,
            ?,?,?,?,?,?,
            ?,?,?,?,?,?,
            ?,?,?,?,?,?,
            ?,?,?,?,?
         )
    `;

    const values = [
        data.tipo_pessoa,
        data.congregacao,
        data.setor,
        data.nome,
        data.sexo,
        data.estado_civil,
        data.data_nascimento,
        data.cidade_nascimento,
        data.estado_nascimento,
        data.email,
        data.tipo_sanguineo,
        data.doador_sangue,
        data.endereco,
        data.complemento,
        data.bairro,
        data.cidade,
        data.cep,
        data.estado,
        data.escolaridade,
        data.cpf,
        data.rg,
        data.forma_recebimento,
        data.data_batismo,
        data.igreja_batismo,
        data.cidade_batismo,
        data.pastor,
        data.igreja_origem,
        data.cidade_origem,
        data.data_carta,
        data.data_aprovacao,
        data.batizado_es_santo,
        data.chefe_familia,
        data.computador_casa,
        data.acessa_internet,
        data.data_preenchimento,
        data.assinatura,
        data.lider_evangelismo,
        data.lider_evangelismo_data,
    ]
})