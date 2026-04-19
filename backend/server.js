const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express()
app.use(cors())
app.use(express.json());

const db = new sqlite3.Database("./IGREJA.db", (err) => {
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
            telefone_celular,
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
            filhos_quantidade,
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
        data.telefone_residencial,
        data.telefone_comecial,
        data.telefone_celular,
        data.profissao,
        data.ocupacao_atual,
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
        data.cargo,
        data.data_apresentacao,
        data.dirigente_congregacao,
        data.dirigente_congregacao_data,
        data.lider_mocidade,
        data.lider_mocidade_data,
        data.professor_ebd,
        data.professor_ebd_data,
        data.lider_missoes,
        data.lider_missoes_data,
        data.coordenador_geral,
        data.coordenador_geral_data,
        data.lider_evangelismo,
        data.lider_evangelismo_data,
        data.lider_culto_familiar,
        data.lider_culto_familiar_data,
        data.lider_discipulado,
        data.lider_discipulado_data,
        data.funcao_extra1,
        data.funcao_extra2,
        data.chefe_familia,
        data.nome_conjuge,
        data.filhos_quantidade,
        data.computador_casa,
        data.acessa_internet,
        data.observacoes,
        data.data_preenchimento,
        data.assinatura,
        data.created_at
    ]
    db.run(sql, values, function (err) {
        if (err) {
            return res.status(500).json({ message: err.message})
        }
    })
})