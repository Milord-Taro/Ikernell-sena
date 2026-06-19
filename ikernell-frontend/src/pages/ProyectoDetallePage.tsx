import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { obtenerProyectoPorId } from "../services/proyectoService";
import { obtenerEtapas } from "../services/etapaService";
import { obtenerResumenProyecto } from "../services/dashboardProyectoService";

import type { Proyecto } from "../types/Proyecto";
import type { Etapa } from "../types/Etapa";

export default function ProyectoDetallePage() {
  const { id } = useParams();

  const [proyecto, setProyecto] = useState<Proyecto | null>(null);
  const [etapas, setEtapas] = useState<Etapa[]>([]);

  const [resumen, setResumen] = useState({
    etapas: 0,
    actividades: 0,
    errores: 0,
    interrupciones: 0,
  });

  useEffect(() => {
    async function cargarDatos() {
      if (!id) return;

      try {
        const proyectoData = await obtenerProyectoPorId(Number(id));

        setProyecto(proyectoData);

        const etapasData = await obtenerEtapas();

        const etapasProyecto = etapasData.filter(
          (etapa) => etapa.proyecto?.idProyecto === Number(id),
        );

        setEtapas(etapasProyecto);

        const resumenProyecto = await obtenerResumenProyecto(Number(id));

        setResumen(resumenProyecto);
      } catch (error) {
        console.error(error);
      }
    }

    cargarDatos();
  }, [id]);

  if (!proyecto) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>{proyecto.nombreProyecto}</h1>

      <p>{proyecto.descripcionProyecto}</p>

      <p>
        Líder: {proyecto.lider.nombre} {proyecto.lider.apellido}
      </p>

      <p>Inicio: {proyecto.fechaInicioProyecto}</p>

      <p>Fin: {proyecto.fechaFinProyecto}</p>

      <hr />

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            minWidth: "150px",
          }}
        >
          <h3>Etapas</h3>
          <p>{resumen.etapas}</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            minWidth: "150px",
          }}
        >
          <h3>Actividades</h3>
          <p>{resumen.actividades}</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            minWidth: "150px",
          }}
        >
          <h3>Errores</h3>
          <p>{resumen.errores}</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            minWidth: "150px",
          }}
        >
          <h3>Interrupciones</h3>
          <p>{resumen.interrupciones}</p>
        </div>
      </div>

      <hr />

      <Link to={`/dashboard/proyectos/${proyecto.idProyecto}/error/nuevo`}>
        Registrar Error
      </Link>

      <br />

      <Link
        to={`/dashboard/proyectos/${proyecto.idProyecto}/interrupcion/nueva`}
      >
        Registrar Interrupción
      </Link>

      <hr />

      <h2>Etapas</h2>

      <Link to={`/dashboard/proyectos/${proyecto.idProyecto}/errores`}>
        Ver Historial de Errores
      </Link>

      <br />
      <br />

      <Link to={`/dashboard/proyectos/${proyecto.idProyecto}/interrupciones`}>
        Ver Historial de Interrupciones
      </Link>

      {etapas.length === 0 ? (
        <p>No hay etapas registradas.</p>
      ) : (
        <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  }}
>
  {etapas.map((etapa) => (
    <Link
      key={etapa.idEtapa}
      to={`/dashboard/etapas/${etapa.idEtapa}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "20px",
          background: "white",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.05)",
          transition: "0.2s",
        }}
      >
        <h3
          style={{
            color: "#4338ca",
            marginBottom: "10px",
          }}
        >
          {etapa.nombreEtapa}
        </h3>

        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          {etapa.descripcionEtapa}
        </p>

        <div
          style={{
            marginTop: "15px",
            fontSize: "13px",
            color: "#94a3b8",
          }}
        >
          Fecha: {etapa.fechaEtapa}
        </div>
      </div>
    </Link>
  ))}
</div>
      )}
    </div>
  );
}
