import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../app/components/ui/button";

import { obtenerErroresProyecto } from "../services/historialService";
import HistoryCard from "../app/components/dashboard/HistoryCard";
import type { RegistroError } from "../types/RegistroError";
import { exportarHistorialErrores } from "../services/exportService";

export default function ProyectoErroresPage() {
  const { id } = useParams();
  const [errores, setErrores] = useState<RegistroError[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        setErrores(await obtenerErroresProyecto(Number(id)));
      } catch (error) {
        console.error(error);
      }
    }

    cargar();
  }, [id]);

  const erroresFiltrados = errores.filter(
    (e) =>
      e.codError.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.descripcionError.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.tipoError.nombreTipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.etapa.nombreEtapa.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div>
      <h1>Historial de Errores</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <span>Total registros: {erroresFiltrados.length}</span>

        <Button onClick={() => exportarHistorialErrores(erroresFiltrados)}>
          Exportar TXT
        </Button>
      </div>

      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          marginBottom: "20px",
          border: "1px solid #dbe2ea",
          borderRadius: "8px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "30px",
          alignItems: "start",
        }}
      >
        {erroresFiltrados.map((error) => (
          <HistoryCard key={error.idError} tipo="error" item={error} />
        ))}
      </div>
    </div>
  );
}
