import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { obtenerProyectoPorId } from "../services/proyectoService";
import { obtenerEtapas } from "../services/etapaService";
import { obtenerResumenProyecto } from "../services/dashboardProyectoService";
import { obtenerResumenEtapa } from "../services/etapaDashboardService";

import type { Proyecto } from "../types/Proyecto";
import type { Etapa } from "../types/Etapa";
import StatCard from "../app/components/dashboard/project/StatCard";
import ActionCard from "../app/components/dashboard/project/ActionCard";
import StageCard from "../app/components/dashboard/project/StageCard";
import ProjectHeader from "../app/components/dashboard/project/ProjectHeader";
import DashboardSection from "../app/components/dashboard/DashboardSection";

import {
  Layers3,
  ListTodo,
  TriangleAlert,
  PauseCircle,
  PlusCircle,
  FileText,
  History,
} from "lucide-react";



export default function ProyectoDetallePage() {
  const { id } = useParams();

  const [proyecto, setProyecto] = useState<Proyecto | null>(null);
  const [etapas, setEtapas] = useState<Etapa[]>([]);

  const [resumen, setResumen] = useState({
    etapas: 0,
    actividades: 0,
    errores: 0,
    interrupciones: 0,
    progreso: 0,
  });

  const [progresoEtapas, setProgresoEtapas] =
    useState<Record<number, number>>({});

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

        const progresoMap: Record<number, number> = {};

        for (const etapa of etapasProyecto) {
          const resumenEtapa =
            await obtenerResumenEtapa(
              etapa.idEtapa
            );

          progresoMap[etapa.idEtapa] =
            resumenEtapa.progreso;
        }

        setProgresoEtapas(progresoMap);

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
      <ProjectHeader
        proyecto={proyecto}
        progreso={resumen.progreso}
      />
      <hr />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <StatCard
          titulo="Etapas"
          valor={resumen.etapas}
          descripcion="Total de etapas"
          icono={Layers3}
          color="#2563eb"
          fondo="#dbeafe"
        />

        <StatCard
          titulo="Actividades"
          valor={resumen.actividades}
          descripcion="Total de actividades"
          icono={ListTodo}
          color="#16a34a"
          fondo="#dcfce7"
        />

        <StatCard
          titulo="Errores"
          valor={resumen.errores}
          descripcion="Errores registrados"
          icono={TriangleAlert}
          color="#dc2626"
          fondo="#fee2e2"
        />

        <StatCard
          titulo="Interrupciones"
          valor={resumen.interrupciones}
          descripcion="Interrupciones registradas"
          icono={PauseCircle}
          color="#ea580c"
          fondo="#ffedd5"
        />
      </div>

      <hr />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <ActionCard
          titulo="Registrar Error"
          descripcion="Reportar un nuevo error"
          to={`/dashboard/proyectos/${proyecto.idProyecto}/error/nuevo`}
          icono={PlusCircle}
        />

        <ActionCard
          titulo="Registrar Interrupción"
          descripcion="Reportar una interrupción"
          to={`/dashboard/proyectos/${proyecto.idProyecto}/interrupcion/nueva`}
          icono={PauseCircle}
        />

        <ActionCard
          titulo="Historial Errores"
          descripcion="Ver errores registrados"
          to={`/dashboard/proyectos/${proyecto.idProyecto}/errores`}
          icono={FileText}
        />

        <ActionCard
          titulo="Historial Interrupciones"
          descripcion="Ver interrupciones registradas"
          to={`/dashboard/proyectos/${proyecto.idProyecto}/interrupciones`}
          icono={History}
        />
      </div>


      <DashboardSection
        title="Etapas del Proyecto"
        subtitle="Seguimiento y avance de cada etapa"
      />

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
            <StageCard
              key={etapa.idEtapa}
              etapa={etapa}
              progreso={
                progresoEtapas[etapa.idEtapa] ?? 0
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
