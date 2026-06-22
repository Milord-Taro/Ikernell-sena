import { useEffect, useState } from "react";
import ProjectCard from "../app/components/dashboard/ProjectCard";
import ProyectoModal from "../app/components/dashboard/ProyectoModal";
import { Button } from "../app/components/ui/button";

import {
  obtenerProyectos,
  crearProyecto,
  eliminarProyecto,
  actualizarProyecto,
} from "../services/proyectoService";
import type { Proyecto } from "../types/Proyecto";

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoProyecto, setNuevoProyecto] = useState({
    codProyecto: "",
    nombreProyecto: "",
    descripcionProyecto: "",
    fechaInicioProyecto: "",
    fechaFinProyecto: "",
    estadoProyecto: true,

    lider: {
      idUsuario: 2,
    },
  });
  const [proyectoEditando, setProyectoEditando] = useState<Proyecto | null>(
    null,
  );

  useEffect(() => {
    async function cargarProyectos() {
      try {
        const data = await obtenerProyectos();

        setProyectos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    cargarProyectos();
  }, []);

  async function guardarProyecto() {
    try {
      const proyectoCreado = await crearProyecto(nuevoProyecto);

      setProyectos([...proyectos, proyectoCreado]);

      setMostrarFormulario(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function guardarCambios() {
    if (!proyectoEditando) {
      return;
    }

    try {
      const proyectoActualizado = await actualizarProyecto(
        proyectoEditando.idProyecto,
        nuevoProyecto,
      );

      setProyectos(
        proyectos.map((p) =>
          p.idProyecto === proyectoEditando.idProyecto
            ? proyectoActualizado
            : p,
        ),
      );

      setProyectoEditando(null);

      setMostrarFormulario(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function borrarProyecto(id: number) {
    try {
      await eliminarProyecto(id);

      setProyectos(proyectos.filter((p) => p.idProyecto !== id));
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <h2>Cargando proyectos...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Proyectos</h1>

      <Button
        onClick={() => {

          setProyectoEditando(null);

          setNuevoProyecto({
            codProyecto: "",
            nombreProyecto: "",
            descripcionProyecto: "",
            fechaInicioProyecto: "",
            fechaFinProyecto: "",
            estadoProyecto: true,

            lider: {
              idUsuario: 2,
            },
          });

          setMostrarFormulario(true);
        }}
      >
        Nuevo Proyecto
      </Button>

      <ProyectoModal
        open={mostrarFormulario}
        onClose={() => {
          setMostrarFormulario(false);
          setProyectoEditando(null);
        }}
        proyecto={nuevoProyecto}
        setProyecto={setNuevoProyecto}
        onGuardar={
          proyectoEditando
            ? guardarCambios
            : guardarProyecto
        }
        editando={
          proyectoEditando !== null
        }
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
          marginTop: "24px",
        }}
      >
        {proyectos.map((proyecto) => (
          <ProjectCard
            key={proyecto.idProyecto}
            id={proyecto.idProyecto}
            codigo={proyecto.codProyecto}
            nombre={proyecto.nombreProyecto}
            lider={`${proyecto.lider.nombre} ${proyecto.lider.apellido}`}
            activo={proyecto.estadoProyecto}
            descripcion={proyecto.descripcionProyecto}

            onEdit={() => {
              setProyectoEditando(proyecto);

              setNuevoProyecto({
                codProyecto: proyecto.codProyecto,
                nombreProyecto: proyecto.nombreProyecto,
                descripcionProyecto: proyecto.descripcionProyecto,
                fechaInicioProyecto: proyecto.fechaInicioProyecto,
                fechaFinProyecto: proyecto.fechaFinProyecto,
                estadoProyecto: proyecto.estadoProyecto,
                lider: {
                  idUsuario: proyecto.lider.idUsuario,
                },
              });

              setMostrarFormulario(true);
            }}

            onDelete={() =>
              borrarProyecto(proyecto.idProyecto)
            }
          />
        ))}
      </div>
    </div>
  );
}
