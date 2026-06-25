import { useEffect, useState } from "react";
import ProjectCard from "../app/components/dashboard/ProjectCard";
import ProyectoModal from "../app/components/dashboard/ProyectoModal";
import { Button } from "../app/components/ui/button";
import { obtenerIdUsuario } from "../utils/auth";
import { toast } from "sonner";
import { obtenerRolUsuario } from "../utils/auth";

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
      idUsuario: obtenerIdUsuario(),
    },
  });

  const rol = obtenerRolUsuario();

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

      if (!validarProyecto()) {
        return;
      }

      function validarProyecto() {

        if (!nuevoProyecto.nombreProyecto.trim()) {
          toast.error("Ingrese un nombre");
          return false;
        }

        if (nuevoProyecto.nombreProyecto.length < 5) {
          toast.error("Nombre demasiado corto");
          return false;
        }

        if (!nuevoProyecto.descripcionProyecto.trim()) {
          toast.error("Ingrese una descripción");
          return false;
        }

        if (
          nuevoProyecto.descripcionProyecto.length < 10
        ) {
          toast.error(
            "La descripción debe tener mínimo 10 caracteres"
          );
          return false;
        }

        if (!nuevoProyecto.fechaInicioProyecto) {
          toast.error("Seleccione fecha inicio");
          return false;
        }

        if (!nuevoProyecto.fechaFinProyecto) {
          toast.error("Seleccione fecha fin");
          return false;
        }

        if (
          nuevoProyecto.fechaFinProyecto <
          nuevoProyecto.fechaInicioProyecto
        ) {
          toast.error(
            "La fecha final no puede ser menor que la inicial"
          );
          return false;
        }

        return true;
      }

      const proyectoCreado = await crearProyecto(nuevoProyecto);

      setProyectos([...proyectos, proyectoCreado]);

      toast.success("Proyecto creado correctamente");

      setMostrarFormulario(false);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo crear el proyecto");
    }
  }

  async function guardarCambios() {
    if (!proyectoEditando) {
      return;
    }

    if (!validarProyecto()) {
      return;
    }

    function validarProyecto() {

      if (!nuevoProyecto.nombreProyecto.trim()) {
        toast.error("Ingrese un nombre");
        return false;
      }

      if (nuevoProyecto.nombreProyecto.length < 5) {
        toast.error("Nombre demasiado corto");
        return false;
      }

      if (!nuevoProyecto.descripcionProyecto.trim()) {
        toast.error("Ingrese una descripción");
        return false;
      }

      if (
        nuevoProyecto.descripcionProyecto.length < 10
      ) {
        toast.error(
          "La descripción debe tener mínimo 10 caracteres"
        );
        return false;
      }

      if (!nuevoProyecto.fechaInicioProyecto) {
        toast.error("Seleccione fecha inicio");
        return false;
      }

      if (!nuevoProyecto.fechaFinProyecto) {
        toast.error("Seleccione fecha fin");
        return false;
      }

      if (
        nuevoProyecto.fechaFinProyecto <
        nuevoProyecto.fechaInicioProyecto
      ) {
        toast.error(
          "La fecha final no puede ser menor que la inicial"
        );
        return false;
      }

      return true;
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

      toast.success("Proyecto actualizado correctamente");

      setProyectoEditando(null);

      setMostrarFormulario(false);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar el proyecto");
    }
  }

  async function borrarProyecto(id: number) {
    const confirmar = confirm(
      "¿Está seguro de eliminar este proyecto?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await eliminarProyecto(id);

      setProyectos(
        proyectos.filter(
          (p) => p.idProyecto !== id
        )
      );

      toast.success(
        "Proyecto eliminado correctamente"
      );

    } catch (error) {
      console.error(error);

      toast.error(
        "No se pudo eliminar el proyecto"
      );
    }
  }

  if (loading) {
    return <h2>Cargando proyectos...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Proyectos</h1>
      {rol === "Coordinador" && (
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
                idUsuario: obtenerIdUsuario(),
              },
            });

            setMostrarFormulario(true);
          }}
        >
          Nuevo Proyecto
        </Button>
      )}

      {rol !== "Desarrollador" && (
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
      )}

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
            lider={
              proyecto.lider
                ? `${proyecto.lider.nombre} ${proyecto.lider.apellido}`
                : "Sin líder"
            }
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
