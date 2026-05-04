import { useEffect, useState } from "react";
import api from "../api/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function Membros() {
  const [membros, setMembros] = useState([]);

  useEffect(() => {
    api.get("/admin/membros").then((res) => {
      setMembros(res.data.membros);
    });
  }, []);

  const baixarPdf = (id) => {
    window.open(
      `http://localhost:3000/admin/membros/${id}/pdf`,
      "_blank"
    );
  };

  return (
    <div className="p-4">
      <h2>Membros Cadastrados</h2>

      <DataTable value={membros} paginator rows={10}>
        <Column field="nome" header="Nome" />
        <Column field="congregacao" header="Congregação" />
        <Column field="cargo" header="Cargo" />

        <Column
          header="Ações"
          body={(row) => (
            <Button
              icon="pi pi-file-pdf"
              label="Ficha"
              severity="danger"
              onClick={() => baixarPdf(row.id)}
            />
          )}
        />
      </DataTable>
    </div>
  );
}