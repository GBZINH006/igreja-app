import { useState, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const entrar = async () => {
    const { data } = await api.post("/admin/login", { email, senha });
    login(data.token);
    navigate("/");
  };

  return (
    <motion.div
      className="min-h-screen flex justify-content-center align-items-center"
      style={{ backgroundImage: "url(/igreja-bg.jpg)", backgroundSize: "cover" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="surface-card p-4 shadow-4 border-round w-25">
        <h2>Login Admin</h2>

        <InputText className="w-full mb-2" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />

        <Password className="w-full mb-3" placeholder="Senha" feedback={null}
          value={senha} onChange={e => setSenha(e.target.value)} />

        <Button label="Entrar" className="w-full mb-2" onClick={entrar} />

        <Button
          label="Sou membro / Quero me cadastrar"
          className="w-full p-button-outlined"
          onClick={() => navigate("/cadastro")}
        />
      </div>
    </motion.div>
  );
}
