import { useEffect, useState } from "react";

import { Actividad } from "../types/Actividad";
import { Link } from "react-router-dom";

import {
  obtenerActividades,
  eliminarActividad,
  ejecutarActividad,
} from "../services/actividadService";

export default function ActividadesPage() {
  const [actividades, setActividades] = useState<Actividad[]>([]);

  useEffect(() => {
    cargarActividades();
  }, []);

  async function cargarActividades() {
    try {
      const data = await obtenerActividades();
      setActividades(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEliminar(id: number) {
    if (!confirm("¿Eliminar actividad?")) {
      return;
    }

    await eliminarActividad(id);

    cargarActividades();
  }

  async function handleEjecutar(id: number) {
    await ejecutarActividad(id);

    cargarActividades();
  }

  return (
    <div>
      <h1>Actividades</h1>

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
            <th>Actividad</th>
            <th>Desarrollador</th>
            <th>Etapa</th>
            <th>Estado</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {actividades.map((actividad) => (
            <tr key={actividad.idActividad}>
              <td>{actividad.codActividad}</td>

              <td>
                <Link to={`/dashboard/actividades/${actividad.idActividad}`}>
                  {actividad.nombreActividad}
                </Link>
              </td>

              <td>
                {actividad.desarrollador
                  ? `${actividad.desarrollador.nombre} ${actividad.desarrollador.apellido}`
                  : "Sin asignar"}
              </td>

              <td>{actividad.etapa?.nombreEtapa}</td>

              <td>{actividad.estadoActividad}</td>

              <td>{actividad.fechaInicioActividad}</td>

              <td>{actividad.fechaFinActividad}</td>

              <td>
                <button onClick={() => handleEjecutar(actividad.idActividad)}>
                  Ejecutar
                </button>{" "}
                <button onClick={() => handleEliminar(actividad.idActividad)}>
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
