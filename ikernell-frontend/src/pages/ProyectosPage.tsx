import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  obtenerProyectos,
  crearProyecto,
  eliminarProyecto,
  actualizarProyecto,
} from "../services/proyectoService";
import type { Proyecto } from "../types/Proyecto";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../app/components/ui/table";

import { Button } from "../app/components/ui/button";

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

      <Button onClick={() => setMostrarFormulario(true)}>Nuevo Proyecto</Button>

      {mostrarFormulario && (
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Código"
            value={nuevoProyecto.codProyecto}
            onChange={(e) =>
              setNuevoProyecto({
                ...nuevoProyecto,
                codProyecto: e.target.value,
              })
            }
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Nombre"
            value={nuevoProyecto.nombreProyecto}
            onChange={(e) =>
              setNuevoProyecto({
                ...nuevoProyecto,
                nombreProyecto: e.target.value,
              })
            }
          />

          <br />
          <br />

          <textarea
            placeholder="Descripción"
            value={nuevoProyecto.descripcionProyecto}
            onChange={(e) =>
              setNuevoProyecto({
                ...nuevoProyecto,
                descripcionProyecto: e.target.value,
              })
            }
          />

          <input
            type="date"
            value={nuevoProyecto.fechaInicioProyecto}
            onChange={(e) =>
              setNuevoProyecto({
                ...nuevoProyecto,
                fechaInicioProyecto: e.target.value,
              })
            }
          />

          <br />
          <br />

          <input
            type="date"
            value={nuevoProyecto.fechaFinProyecto}
            onChange={(e) =>
              setNuevoProyecto({
                ...nuevoProyecto,
                fechaFinProyecto: e.target.value,
              })
            }
          />

          <Button onClick={proyectoEditando ? guardarCambios : guardarProyecto}>
            {proyectoEditando ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Proyecto</TableHead>
            <TableHead>Líder</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {proyectos.map((proyecto) => (
            <TableRow key={proyecto.idProyecto}>
              <TableCell>{proyecto.codProyecto}</TableCell>

              <TableCell>
                <Link to={`/dashboard/proyectos/${proyecto.idProyecto}`}>
                  {proyecto.nombreProyecto}
                </Link>
              </TableCell>

              <TableCell>
                {proyecto.lider.nombre} {proyecto.lider.apellido}
              </TableCell>

              <TableCell>
                {proyecto.estadoProyecto ? "Activo" : "Inactivo"}
              </TableCell>

              <TableCell>
                <Button
                  onClick={() => {
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
                >
                  Editar
                </Button>
                <Button onClick={() => borrarProyecto(proyecto.idProyecto)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
