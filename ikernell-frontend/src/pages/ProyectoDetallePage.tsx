import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../app/components/ui/button";
import { toast } from "sonner";

import { obtenerProyectoPorId } from "../services/proyectoService";
import {
  crearEtapa,
  actualizarEtapa,
  eliminarEtapa,
  obtenerEtapas
} from "../services/etapaService";
import { obtenerResumenProyecto } from "../services/dashboardProyectoService";
import { obtenerResumenEtapa } from "../services/etapaDashboardService";
import EtapaModal from "../app/components/dashboard/EtapaModal";

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

  const [mostrarModalEtapa, setMostrarModalEtapa] =
    useState(false);

  const [etapaEditando, setEtapaEditando] =
    useState<Etapa | null>(null);

  const [nuevaEtapa, setNuevaEtapa] =
    useState({
      codEtapa: "",
      nombreEtapa: "",
      descripcionEtapa: "",
      fechaEtapa: "",

      proyecto: {
        idProyecto: Number(id),
      },
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

  function validarEtapa() {

    if (!nuevaEtapa.codEtapa.trim()) {
      toast.error("Ingrese el código de la etapa");
      return false;
    }

    if (nuevaEtapa.codEtapa.length < 7) {
      toast.error("Código demasiado corto");
      return false;
    }

    if (nuevaEtapa.codEtapa.length > 10) {
      toast.error("Máximo 10 caracteres");
      return false;
    }

    if (!nuevaEtapa.nombreEtapa.trim()) {
      toast.error("Ingrese el nombre de la etapa");
      return false;
    }

    if (nuevaEtapa.nombreEtapa.length < 5) {
      toast.error("Nombre demasiado corto");
      return false;
    }

    if (nuevaEtapa.nombreEtapa.length > 100) {
      toast.error("Máximo 100 caracteres");
      return false;
    }

    if (!nuevaEtapa.descripcionEtapa.trim()) {
      toast.error("Ingrese una descripción");
      return false;
    }

    if (
      nuevaEtapa.descripcionEtapa.length < 10
    ) {
      toast.error(
        "La descripción debe tener mínimo 10 caracteres"
      );
      return false;
    }

    if (
      nuevaEtapa.descripcionEtapa.length > 500
    ) {
      toast.error(
        "La descripción no puede superar 500 caracteres"
      );
      return false;
    }

    if (!nuevaEtapa.fechaEtapa) {
      toast.error("Seleccione fecha inicio");
      return false;
    }


    return true;
  }

  async function guardarEtapa() {
    try {

      if (!validarEtapa()) {
        return;
      }

      const etapaCreada = await crearEtapa(nuevaEtapa);

      setEtapas([...etapas, etapaCreada]);

      const resumenProyecto =
        await obtenerResumenProyecto(
          Number(id)
        );

      setResumen(resumenProyecto);

      toast.success("Etapa creada correctamente");

      setMostrarModalEtapa(false);

      setNuevaEtapa({
        codEtapa: "",
        nombreEtapa: "",
        descripcionEtapa: "",
        fechaEtapa: "",
        proyecto: {
          idProyecto: Number(id),
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("No se pudo crear la etapa");
    }
  }

  async function borrarEtapa(idEtapa: number) {

    const confirmar =
      confirm("¿Eliminar esta etapa?");

    if (!confirmar) {
      return;
    }

    try {

      await eliminarEtapa(idEtapa);

      setEtapas(
        etapas.filter(
          e => e.idEtapa !== idEtapa
        )
      );

      toast.success(
        "Etapa eliminada correctamente"
      );

    } catch (error: any) {

      console.error(error);

      toast.error(
        error.message
      );
    }
  }

  function editarEtapa(etapa: Etapa) {

    setEtapaEditando(etapa);

    setNuevaEtapa({
      codEtapa: etapa.codEtapa,
      nombreEtapa: etapa.nombreEtapa,
      descripcionEtapa: etapa.descripcionEtapa,
      fechaEtapa: etapa.fechaEtapa,

      proyecto: {
        idProyecto: Number(id),
      },
    });

    setMostrarModalEtapa(true);
  }

  if (!proyecto) {
    return <p>Cargando...</p>;
  }

  async function actualizarEtapaHandler() {

    if (!etapaEditando) {
      return;
    }

    try {

      await actualizarEtapa(
        etapaEditando.idEtapa,
        nuevaEtapa
      );

      const etapasActualizadas =
        await obtenerEtapas();

      setEtapas(
        etapasActualizadas.filter(
          etapa =>
            etapa.proyecto?.idProyecto === Number(id)
        )
      );

      toast.success(
        "Etapa actualizada correctamente"
      );

      setMostrarModalEtapa(false);

      setEtapaEditando(null);

    } catch (error) {

      console.error(error);

      toast.error(
        "No se pudo actualizar la etapa"
      );
    }
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

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <DashboardSection
          title="Etapas del Proyecto"
          subtitle="Seguimiento y avance de cada etapa"
        />

        <Button
          onClick={() => setMostrarModalEtapa(true)}
        >
          Nueva Etapa
        </Button>

        <EtapaModal
          open={mostrarModalEtapa}
          onClose={() => {

            setMostrarModalEtapa(false);

            setEtapaEditando(null);
          }}
          etapa={nuevaEtapa}
          setEtapa={setNuevaEtapa}
          onGuardar={
            etapaEditando
              ? actualizarEtapaHandler
              : guardarEtapa
          }
          editando={!!etapaEditando}
        />
      </div>

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
              onEdit={() => editarEtapa(etapa)}
              onDelete={() => borrarEtapa(etapa.idEtapa)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
