import Membros from "./Membros";
import { Button } from "primereact/button";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <div className="flex justify-content-between align-items-center p-3 bg-primary text-white">
        <h1>Admin Igreja</h1>

        <Button
          label="Sair"
          icon="pi pi-sign-out"
          severity="secondary"
          onClick={logout}
        />
      </div>

      <Membros />
    </div>
  );
}