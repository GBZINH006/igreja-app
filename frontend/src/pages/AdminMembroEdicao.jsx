// src/pages/AdminMembroEdicao.jsx
// campos dinâmicos (função → data)
import { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";

export default function AdminCamposDinamicos({ form, update }) {
  return (
    <>
      <Checkbox checked={form.lider_mocidade === "SIM"}
        onChange={(e) => update("lider_mocidade", e.checked ? "SIM" : null)} />
      {form.lider_mocidade === "SIM" && (
        <Calendar value={form.lider_mocidade_data}
          onChange={(e) => update("lider_mocidade_data", e.value)} />
      )}
    </>
  );
}
``