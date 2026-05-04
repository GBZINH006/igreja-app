// src/pages/CadastroMembro.jsx
import { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/api";

/* ===========================
   UTILIDADES
=========================== */
const toISO = (v) => (v ? new Date(v).toISOString().split("T")[0] : null);

const buscarCEP = async (cep) => {
  const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return r.json();
};

const validarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += cpf[i] * (10 - i);
  let r = (s * 10) % 11;
  if (r === 10) r = 0;
  if (r !== +cpf[9]) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += cpf[i] * (11 - i);
  r = (s * 10) % 11;
  if (r === 10) r = 0;
  return r === +cpf[10];
};

const validarTelefone = (t) => /^\d{10,11}$/.test(t.replace(/\D/g, ""));

/* ===========================
   SCHEMA 1:1 BANCO
=========================== */
const schema = [
  { key: "tipo_pessoa", label: "Tipo de Pessoa", type: "select", options: ["MEMBRO", "CONGREGADO"] },
  { key: "congregacao", label: "Congregação", type: "text" },
  { key: "setor", label: "Setor", type: "text" },
  { key: "nome", label: "Nome", type: "text" },
  { key: "sexo", label: "Sexo", type: "select", options: ["MASCULINO", "FEMININO"] },
  { key: "estado_civil", label: "Estado Civil", type: "text" },
  { key: "nome_pai", label: "Nome do Pai", type: "text" },
  { key: "nome_mae", label: "Nome da Mãe", type: "text" },
  { key: "data_nascimento", label: "Data de Nascimento", type: "date" },
  { key: "data_casamento", label: "Data de Casamento", type: "date" },
  { key: "cidade_nascimento", label: "Cidade Nascimento", type: "text" },
  { key: "estado_nascimento", label: "Estado Nascimento", type: "text" },
  { key: "email", label: "Email", type: "text" },
  { key: "tipo_sanguineo", label: "Tipo Sanguíneo", type: "text" },
  { key: "doador_sangue", label: "Doador de Sangue", type: "check" },

  { key: "endereco", label: "Endereço", type: "text" },
  { key: "complemento", label: "Complemento", type: "text" },
  { key: "bairro", label: "Bairro", type: "text" },
  { key: "cidade", label: "Cidade", type: "text" },
  { key: "cep", label: "CEP", type: "text" },
  { key: "estado", label: "Estado", type: "text" },

  { key: "telefone_residencial", label: "Telefone Residencial", type: "text" },
  { key: "telefone_comercial", label: "Telefone Comercial", type: "text" },
  { key: "telefone_celular", label: "Telefone Celular", type: "text" },

  { key: "profissao", label: "Profissão", type: "text" },
  { key: "ocupacao_atual", label: "Ocupação Atual", type: "text" },
  { key: "escolaridade", label: "Escolaridade", type: "text" },

  { key: "cpf", label: "CPF", type: "text" },
  { key: "rg", label: "RG", type: "text" },

  { key: "forma_recebimento", label: "Forma de Recebimento", type: "select", options: ["BATISMO", "TRANSFERENCIA", "PROFISSAO"] },
  { key: "data_batismo", label: "Data do Batismo", type: "date" },
  { key: "igreja_batismo", label: "Igreja do Batismo", type: "text" },
  { key: "cidade_batismo", label: "Cidade do Batismo", type: "text" },

  { key: "pastor", label: "Pastor", type: "text" },
  { key: "igreja_origem", label: "Igreja de Origem", type: "text" },
  { key: "cidade_origem", label: "Cidade de Origem", type: "text" },
  { key: "data_carta", label: "Data da Carta", type: "date" },
  { key: "data_aprovacao", label: "Data de Aprovação", type: "date" },
  { key: "batizado_es_santo", label: "Batizado no Espírito Santo", type: "check" },
  { key: "cargo", label: "Cargo", type: "text" },
  { key: "data_apresentacao", label: "Data de Apresentação", type: "date" },

  { key: "dirigente_congregacao", label: "Dirigente Congregação", type: "check", dateKey: "dirigente_congregacao_data" },
  { key: "lider_circulo_oracao", label: "Líder Círculo de Oração", type: "check", dateKey: "lider_circulo_oracao_data" },
  { key: "lider_mocidade", label: "Líder Mocidade", type: "check", dateKey: "lider_mocidade_data" },
  { key: "professor_ebd", label: "Professor EBD", type: "check", dateKey: "professor_ebd_data" },
  { key: "lider_missoes", label: "Líder Missões", type: "check", dateKey: "lider_missoes_data" },
  { key: "coordenador_geral", label: "Coordenador Geral", type: "check", dateKey: "coordenador_geral_data" },
  { key: "lider_evangelismo", label: "Líder Evangelismo", type: "check", dateKey: "lider_evangelismo_data" },
  { key: "lider_culto_familiar", label: "Líder Culto Familiar", type: "check", dateKey: "lider_culto_familiar_data" },
  { key: "lider_discipulado", label: "Líder Discipulado", type: "check", dateKey: "lider_discipulado_data" },

  { key: "funcao_extra1", label: "Função Extra 1", type: "text" },
  { key: "funcao_extra2", label: "Função Extra 2", type: "text" },

  { key: "chefe_familia", label: "Chefe da Família", type: "check" },
  { key: "nome_conjuge", label: "Nome do Cônjuge", type: "text" },
  { key: "filhos_quantidade", label: "Quantidade de Filhos", type: "text" },

  { key: "computador_casa", label: "Computador em Casa", type: "check" },
  { key: "acessa_internet", label: "Acessa Internet", type: "check" },

  { key: "observacoes", label: "Observações", type: "textarea" },
  { key: "data_preenchimento", label: "Data de Preenchimento", type: "date" },
  { key: "assinatura", label: "Assinatura", type: "text" }
];

/* ===========================
   COMPONENTE
=========================== */
export default function CadastroMembro() {
  const toast = useRef(null);

  const [form, setForm] = useState(
    Object.fromEntries(schema.map(s => [s.key, s.type === "check" ? false : ""]))
  );

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const enviar = async () => {
    const payload = { ...form };
    Object.keys(payload).forEach(k => {
      if (payload[k] instanceof Date) payload[k] = toISO(payload[k]);
    });

    if (!validarCPF(payload.cpf)) {
      toast.current.show({ severity: "error", summary: "CPF inválido" });
      return;
    }

    if (!validarTelefone(payload.telefone_celular)) {
      toast.current.show({ severity: "error", summary: "Telefone inválido" });
      return;
    }

    await api.post("/cadastro", payload);

    toast.current.show({
      severity: "success",
      summary: "Cadastro enviado",
      detail: "Registro salvo com sucesso"
    });
  };

  return (
    <motion.div
      className="min-h-screen p-5 flex justify-content-center"
      style={{ backgroundImage: "url(/igreja-bg.jpg)", backgroundSize: "cover" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Toast ref={toast} />
      <div className="surface-card p-5 shadow-6 border-round-xl w-10">
        <h2 className="text-center mb-4 text-primary">
          Cadastro Geral de Membros e Congregados
        </h2>

        {schema.map(f => (
          <div key={f.key} className="mb-4">
            <label className="block mb-2 font-bold">{f.label}</label>

            {f.type === "text" && (
              <InputText
                className="w-full"
                value={form[f.key]}
                onChange={e => set(f.key, e.target.value)}
              />
            )}

            {f.type === "textarea" && (
              <InputTextarea
                className="w-full"
                rows={3}
                value={form[f.key]}
                onChange={e => set(f.key, e.target.value)}
              />
            )}

            {f.type === "select" && (
              <Dropdown
                className="w-full"
                options={f.options}
                value={form[f.key]}
                onChange={e => set(f.key, e.value)}
              />
            )}

            {f.type === "date" && (
              <Calendar
                className="w-full"
                value={form[f.key]}
                onChange={e => set(f.key, e.value)}
                dateFormat="dd/mm/yy"
              />
            )}

            {f.type === "check" && (
              <>
                <Checkbox
                  checked={form[f.key]}
                  onChange={e => set(f.key, e.checked)}
                />{" "}
                <span className="ml-2">SIM</span>

                {f.dateKey && form[f.key] && (
                  <Calendar
                    className="w-full mt-2"
                    value={form[f.dateKey]}
                    onChange={e => set(f.dateKey, e.value)}
                    dateFormat="dd/mm/yy"
                  />
                )}
              </>
            )}

            <Divider />
          </div>
        ))}

        <Button label="Salvar Cadastro Completo" className="w-full p-button-lg" onClick={enviar} />
      </div>
    </motion.div>
  );
}
