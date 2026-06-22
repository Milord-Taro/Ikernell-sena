import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../app/components/ui/button";

import { obtenerActividadPorId } from "../services/actividadService";

export default function ActividadDetallePage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [actividad, setActividad] = useState<any>(null);

  useEffect(() => {
    cargarActividad();
  }, []);

  async function cargarActividad() {
    try {
      const data = await obtenerActividadPorId(Number(id));

      setActividad(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!actividad) {
    return <h2>Cargando actividad...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        className="bg-white rounded-xl shadow p-6"
        style={{ marginBottom: "20px" }}
      >
        <h1
          style={{
            marginBottom: "5px",
          }}
        >
          {actividad.codActividad}
        </h1>

        <h2
          style={{
            color: "#475569",
            fontWeight: "500",
          }}
        >
          {actividad.nombreActividad}
        </h2>

        <p
          style={{
            marginTop: "15px",
          }}
        >
          {actividad.descripcionActividad}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div className="bg-white rounded-xl shadow p-5">
          <h3>Estado</h3>

          <p>{actividad.estadoActividad}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3>Inicio</h3>

          <p>{actividad.fechaInicioActividad}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3>Fin</h3>

          <p>{actividad.fechaFinActividad}</p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div className="bg-white rounded-xl shadow p-5">
          <h3>Proyecto</h3>

          <p>{actividad.etapa?.proyecto?.nombreProyecto}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3>Etapa</h3>

          <p>{actividad.etapa?.nombreEtapa}</p>
        </div>
      </div>

      <div
        className="bg-white rounded-xl shadow p-5"
        style={{ marginBottom: "20px" }}
      >
        <h3>Desarrollador</h3>

        <p>
          {actividad.desarrollador?.nombre} {actividad.desarrollador?.apellido}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        <Button
          onClick={() =>
            navigate(
              `/dashboard/proyectos/${actividad.etapa?.proyecto?.idProyecto}/error/nuevo`,
            )
          }
        >
          Registrar Error
        </Button>

        <Button
          onClick={() =>
            navigate(
              `/dashboard/proyectos/${actividad.etapa?.proyecto?.idProyecto}/interrupcion/nueva`,
            )
          }
        >
          Registrar Interrupción
        </Button>
      </div>
    </div>
  );
}
