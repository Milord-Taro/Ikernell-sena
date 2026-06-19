import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { obtenerActividadPorId } from "../services/actividadService";

export default function ActividadDetallePage() {
  const { id } = useParams();

  const [actividad, setActividad] = useState<any>(null);

  useEffect(() => {
    cargarActividad();
  }, []);

  async function cargarActividad() {
    try {
      const data = await obtenerActividadPorId(
        Number(id)
      );

      setActividad(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!actividad) {
    return <h2>Cargando actividad...</h2>;
  }

  return (
    <div>
      <h1>Detalle de Actividad</h1>

      <hr />

      <p>
        <strong>Código:</strong>{" "}
        {actividad.codActividad}
      </p>

      <p>
        <strong>Nombre:</strong>{" "}
        {actividad.nombreActividad}
      </p>

      <p>
        <strong>Descripción:</strong>{" "}
        {actividad.descripcionActividad}
      </p>

      <p>
        <strong>Estado:</strong>{" "}
        {actividad.estadoActividad}
      </p>

      <p>
        <strong>Inicio:</strong>{" "}
        {actividad.fechaInicioActividad}
      </p>

      <p>
        <strong>Fin:</strong>{" "}
        {actividad.fechaFinActividad}
      </p>

      <p>
        <strong>Fecha Ejecución:</strong>{" "}
        {actividad.fechaEjecucionActividad}
      </p>

      <hr />

      <h2>Proyecto</h2>

      <p>
        {
          actividad.etapa?.proyecto
            ?.nombreProyecto
        }
      </p>

      <h2>Etapa</h2>

      <p>
        {actividad.etapa?.nombreEtapa}
      </p>

      <h2>Desarrollador</h2>

      <p>
        {actividad.desarrollador?.nombre}{" "}
        {actividad.desarrollador?.apellido}
      </p>

      <hr />

      <button>
        Registrar Error
      </button>

      {" "}

      <button>
        Registrar Interrupción
      </button>
    </div>
  );
}