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
  const [errorFormulario, setErrorFormulario] = useState("");

  const [nuevaActividad, setNuevaActividad] = useState({
    codActividad: "",
    nombreActividad: "",
    descripcionActividad: "",
    fechaInicioActividad: "",
    fechaFinActividad: "",
    estadoActividad: "Pendiente",

    etapa: {
      idEtapa: 0,
    },

    desarrollador: {
      idUsuario: 0,
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
    } catch (error: any) {
      console.error(error);
      setErrorFormulario(error.message || "Error al guardar la actividad");
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
    setErrorFormulario("");

    if (!nuevaActividad.nombreActividad.trim()) {
      setErrorFormulario("El nombre es obligatorio");
      return;
    }

    if (nuevaActividad.nombreActividad.trim().length < 5) {
      setErrorFormulario("El nombre debe tener mínimo 5 caracteres");
      return;
    }

    if (!nuevaActividad.descripcionActividad.trim()) {
      setErrorFormulario("La descripción es obligatoria");
      return;
    }

    if (nuevaActividad.descripcionActividad.trim().length < 10) {
      setErrorFormulario("La descripción debe tener mínimo 10 caracteres");
      return;
    }

    if (!nuevaActividad.fechaInicioActividad) {
      setErrorFormulario("Seleccione una fecha de inicio");
      return;
    }

    if (!nuevaActividad.fechaFinActividad) {
      setErrorFormulario("Seleccione una fecha de finalización");
      return;
    }

    if (
      nuevaActividad.fechaFinActividad < nuevaActividad.fechaInicioActividad
    ) {
      setErrorFormulario("La fecha fin no puede ser menor que la fecha inicio");
      return;
    }

    if (nuevaActividad.etapa.idEtapa === 0) {
      setErrorFormulario("Seleccione una etapa");
      return;
    }

    if (nuevaActividad.desarrollador.idUsuario === 0) {
      setErrorFormulario("Seleccione un desarrollador");
      return;
    }

    try {
      await crearActividad(nuevaActividad);

      await cargarActividades();

      setNuevaActividad({
        codActividad: "",
        nombreActividad: "",
        descripcionActividad: "",
        fechaInicioActividad: "",
        fechaFinActividad: "",
        estadoActividad: "Pendiente",
        etapa: {
          idEtapa: 0,
        },
        desarrollador: {
          idUsuario: 0,
        },
      });

      setMostrarFormulario(false);
    } catch (error: any) {
      console.error(error);
      setErrorFormulario(error.message || "Error al guardar la actividad");
    }
  }

  async function guardarCambios() {
    setErrorFormulario("");

    if (!actividadEditando) {
      return;
    }

    if (!nuevaActividad.nombreActividad.trim()) {
      setErrorFormulario("El nombre es obligatorio");
      return;
    }

    if (nuevaActividad.nombreActividad.trim().length < 5) {
      setErrorFormulario("El nombre debe tener mínimo 5 caracteres");
      return;
    }

    if (!nuevaActividad.descripcionActividad.trim()) {
      setErrorFormulario("La descripción es obligatoria");
      return;
    }

    if (nuevaActividad.descripcionActividad.trim().length < 10) {
      setErrorFormulario("La descripción debe tener mínimo 10 caracteres");
      return;
    }

    if (!nuevaActividad.fechaInicioActividad) {
      setErrorFormulario("Seleccione una fecha de inicio");
      return;
    }

    if (!nuevaActividad.fechaFinActividad) {
      setErrorFormulario("Seleccione una fecha de finalización");
      return;
    }

    if (
      nuevaActividad.fechaFinActividad < nuevaActividad.fechaInicioActividad
    ) {
      setErrorFormulario("La fecha fin no puede ser menor que la fecha inicio");
      return;
    }

    if (nuevaActividad.etapa.idEtapa === 0) {
      setErrorFormulario("Seleccione una etapa");
      return;
    }
    if (nuevaActividad.desarrollador.idUsuario === 0) {
      setErrorFormulario("Seleccione un desarrollador");
      return;
    }

    try {
      const actualizada = await actualizarActividad(
        actividadEditando.idActividad,
        nuevaActividad,
      );

      console.log(actualizada);

      await cargarActividades();

      setActividadEditando(null);
      setMostrarFormulario(false);
    } catch (error: any) {
      console.error(error);
      setErrorFormulario(error.message || "Error al guardar la actividad");
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
              idEtapa: 0,
            },

            desarrollador: {
              idUsuario: 0,
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

      <div className="bg-white rounded-xl shadow p-6 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Actividad</TableHead>
              <TableHead>Desarrollador</TableHead>
              <TableHead>Proyecto - Etapa</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead className="text-center">Inicio</TableHead>
              <TableHead className="text-center">Fin</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
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
                <TableRow key={actividad.idActividad}>
                  <TableCell>{actividad.codActividad}</TableCell>

                  <TableCell className="min-w-[260px]">
                    <Link
                      to={`/dashboard/actividades/${actividad.idActividad}`}
                    >
                      {actividad.nombreActividad}
                    </Link>
                  </TableCell>

                  <td>
                    {actividad.desarrollador
                      ? `${actividad.desarrollador.nombre} ${actividad.desarrollador.apellido}`
                      : "Sin asignar"}
                  </td>

                  <TableCell className="min-w-[260px]">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {actividad.etapa?.proyecto?.nombreProyecto}
                      </span>

                      <span className="text-sm text-gray-500">
                        {actividad.etapa?.nombreEtapa}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
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
                  </TableCell>

                  <TableCell className="text-center">
                    {actividad.fechaInicioActividad}
                  </TableCell>

                  <TableCell className="text-center">
                    {actividad.fechaFinActividad}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center gap-2">
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
                </TableRow>
              ))
            )}
          </TableBody>
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
        error={errorFormulario}
      />
    </div>
  );
}
