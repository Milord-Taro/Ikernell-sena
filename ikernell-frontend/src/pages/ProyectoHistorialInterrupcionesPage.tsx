import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../app/components/ui/button";

import { exportarHistorialInterrupciones } from "../services/exportService";
import { obtenerInterrupcionesProyecto } from "../services/historialService";
import HistoryCard from "../app/components/dashboard/HistoryCard";
import type { Interrupcion } from "../types/Interrupcion";

export default function ProyectoInterrupcionesPage() {
  const { id } = useParams();
  const [interrupciones, setInterrupciones] = useState<Interrupcion[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        setInterrupciones(await obtenerInterrupcionesProyecto(Number(id)));
      } catch (error) {
        console.error(error);
      }
    }

    cargar();
  }, [id]);

  const interrupcionesFiltrados = interrupciones.filter(
    (i) =>
      i.codInterrupcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      i.descripcionInterrupcion
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      i.tipoInterrupcion.nombreTipoInterrupcion
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      i.etapa.nombreEtapa.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div>
      <h1>Historial de Interrupciones</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <span>Total registros: {interrupcionesFiltrados.length}</span>

        <Button
          onClick={() =>
            exportarHistorialInterrupciones(interrupcionesFiltrados)
          }
        >
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
        {interrupciones.length === 0 ? (
          <p>No hay interrupciones registradas.</p>
        ) : (
          interrupcionesFiltrados.map((interrupcion) => (
            <HistoryCard
              key={interrupcion.idInterrupcion}
              tipo="interrupcion"
              item={interrupcion}
            />
          ))
        )}
      </div>
    </div>
  );
}
