import { useEffect, useState } from "react";
import { Button } from "../app/components/ui/button";
import { Actividad } from "../types/Actividad";
import { Link, useNavigate } from "react-router-dom";
import ActividadModal from "../app/components/dashboard/ActividadModal";
import { obtenerEtapas } from "../services/etapaService";
import { obtenerUsuarios } from "../services/usuarioService";

import {
  obtenerActividades,
  eliminarActividad,
  ejecutarActividad,
  crearActividad,
  actualizarActividad,
} from "../services/actividadService";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../app/components/ui/table";

export default function ActividadesPage() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [actividadEditando, setActividadEditando] = useState<Actividad | null>(
    null,
  );
  const [etapas, setEtapas] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const [nuevaActividad, setNuevaActividad] = useState({
    codActividad: "",
    nombreActividad: "",
    descripcionActividad: "",
    fechaInicioActividad: "",
    fechaFinActividad: "",
    estadoActividad: "Pendiente",

    etapa: {
      idEtapa: 1,
    },

    desarrollador: {
      idUsuario: 1,
    },
  });
  useEffect(() => {
    cargarActividades();
  }, []);

  async function cargarActividades() {
    try {
      const data = await obtenerActividades();

      const etapasData = await obtenerEtapas();

      const usuariosData = await obtenerUsuarios();

      setActividades(data);

      setEtapas(etapasData);

      setUsuarios(usuariosData);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEliminar(id: number) {
    await eliminarActividad(id);

    cargarActividades();
  }

  async function handleEjecutar(id: number) {
    await ejecutarActividad(id);

    cargarActividades();
  }

  async function guardarActividad() {
    try {
      const creada = await crearActividad(nuevaActividad);

      setActividades([...actividades, creada]);

      setMostrarFormulario(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function guardarCambios() {
    if (!actividadEditando) {
      return;
    }
    const actualizada = await actualizarActividad(
      actividadEditando.idActividad,
      nuevaActividad,
    );

    console.log("RESPUESTA PUT");
    console.log(actualizada);

    console.log(nuevaActividad);

    try {
      const actualizada = await actualizarActividad(
        actividadEditando.idActividad,
        nuevaActividad,
      );

      await cargarActividades();

      setActividadEditando(null);

      setMostrarFormulario(false);
    } catch (error) {
      console.error(error);
    }
  }

  const actividadesFiltradas = actividades.filter((a) =>
    `${a.codActividad} ${a.nombreActividad}`
      .toLowerCase()
      .includes(busqueda.toLowerCase()),
  );

  return (
    <div>
      <h1> Actividades </h1>
      <Button
        onClick={() => {
          setActividadEditando(null);

          setNuevaActividad({
            codActividad: "",
            nombreActividad: "",
            descripcionActividad: "",
            fechaInicioActividad: "",
            fechaFinActividad: "",
            estadoActividad: "Pendiente",

            etapa: {
              idEtapa: 1,
            },

            desarrollador: {
              idUsuario: 1,
            },
          });

          setMostrarFormulario(true);
        }}
      >
        Nueva Actividad
      </Button>

      <input
        type="text"
        placeholder="Buscar actividad..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          marginBottom: "20px",
          border: "1px solid #dbe2ea",
          borderRadius: "8px",
        }}
      />

      <div className="bg-white rounded-xl shadow p-4">
        <Table
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
            {actividadesFiltradas.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No hay actividades
                </td>
              </tr>
            ) : (
              actividadesFiltradas.map((actividad) => (
                <tr key={actividad.idActividad}>
                  <td>{actividad.codActividad}</td>

                  <td>
                    <Link
                      to={`/dashboard/actividades/${actividad.idActividad}`}
                    >
                      {actividad.nombreActividad}
                    </Link>
                  </td>

                  <td>
                    {actividad.desarrollador
                      ? `${actividad.desarrollador.nombre} ${actividad.desarrollador.apellido}`
                      : "Sin asignar"}
                  </td>

                  <td>{actividad.etapa?.nombreEtapa}</td>

                  <td>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background:
                          actividad.estadoActividad === "Ejecutada"
                            ? "#dcfce7"
                            : "#fee2e2",

                        color:
                          actividad.estadoActividad === "Ejecutada"
                            ? "#166534"
                            : "#991b1b",
                      }}
                    >
                      {actividad.estadoActividad}
                    </span>
                  </td>

                  <td>{actividad.fechaInicioActividad}</td>

                  <td>{actividad.fechaFinActividad}</td>

                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/dashboard/actividades/${actividad.idActividad}`,
                          )
                        }
                      >
                        Ver
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => {
                          setActividadEditando(actividad);

                          setNuevaActividad({
                            codActividad: actividad.codActividad,

                            nombreActividad: actividad.nombreActividad,

                            descripcionActividad:
                              actividad.descripcionActividad,

                            fechaInicioActividad:
                              actividad.fechaInicioActividad,

                            fechaFinActividad: actividad.fechaFinActividad,

                            estadoActividad: actividad.estadoActividad,

                            etapa: {
                              idEtapa: actividad.etapa?.idEtapa ?? 1,
                            },

                            desarrollador: {
                              idUsuario:
                                actividad.desarrollador?.idUsuario ?? 1,
                            },
                          });

                          setMostrarFormulario(true);
                        }}
                      >
                        Editar
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => handleEjecutar(actividad.idActividad)}
                      >
                        Ejecutar
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm("¿Eliminar actividad?")) {
                            handleEliminar(actividad.idActividad);
                          }
                        }}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <ActividadModal
        open={mostrarFormulario}
        onClose={() => {
          setMostrarFormulario(false);
          setActividadEditando(null);
        }}
        actividad={nuevaActividad}
        setActividad={setNuevaActividad}
        onGuardar={actividadEditando ? guardarCambios : guardarActividad}
        editando={actividadEditando !== null}
        etapas={etapas}
        usuarios={usuarios}
      />
    </div>
  );
}
