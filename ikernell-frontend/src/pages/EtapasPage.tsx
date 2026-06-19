import { useEffect, useState } from "react";

import { Etapa } from "../types/Etapa";

import {
  obtenerEtapas,
  eliminarEtapa,
} from "../services/etapaService";

export default function EtapasPage() {
  const [etapas, setEtapas] = useState<Etapa[]>([]);

  useEffect(() => {
    cargarEtapas();
  }, []);

  async function cargarEtapas() {
    try {
      const data = await obtenerEtapas();
      setEtapas(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEliminar(id: number) {
    if (!confirm("¿Eliminar etapa?")) {
      return;
    }

    await eliminarEtapa(id);

    cargarEtapas();
  }

  return (
    <div>
      <h1>Etapas</h1>

      <table
        border={1}
        cellPadding={10}
        style={{
          width: "100%",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Proyecto</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {etapas.map((etapa) => (
            <tr key={etapa.idEtapa}>
              <td>{etapa.codEtapa}</td>

              <td>{etapa.nombreEtapa}</td>

              <td>
                {etapa.proyecto?.nombreProyecto}
              </td>

              <td>{etapa.fechaEtapa}</td>

              <td>{etapa.descripcionEtapa}</td>

              <td>
                <button
                  onClick={() =>
                    handleEliminar(etapa.idEtapa)
                  }
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}