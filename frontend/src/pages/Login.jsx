import { useState, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import api from "../api/api"; 
import { AuthContext } from "../auth/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = async () => {
        const res = await api.post("/admin/login", { email, senha });
        login(res.data.token);
    };

    return (
        <motion.div
            className="flex justify-content-center align-items-center min-h-screen"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0}}
        >
            <div className="p-4 surface-card shadow-2 border-round w-25">
                <h2>Login Admin</h2>
                

                <InputText 
                    placeholder="E-mail"
                    className="w-full mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputText 
                    placeholder="Senha"
                    className="w-full mb-3"
                    feedback={false}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <Button 
                    label="Entrar"
                    className="w-full"
                    onClick={handleLogin}
                /> 
            </div>
        </motion.div>
    )
}