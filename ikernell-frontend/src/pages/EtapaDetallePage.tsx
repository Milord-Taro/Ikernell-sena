import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from
  "../app/components/ui/button";
import StatCard from
  "../app/components/dashboard/project/StatCard";
import { useNavigate } from "react-router-dom";

import {
  ListTodo,
  CheckCircle,
  Clock3,
  BarChart3,
  Layers3,
  User,
  CalendarDays,
  Eye

} from "lucide-react";

import ActividadModal from "../app/components/dashboard/ActividadModal";
import { obtenerEtapas } from "../services/etapaService";
import {
  obtenerActividadesPorEtapa,
  ejecutarActividad,
  crearActividad,
  actualizarActividad,
  eliminarActividad,
} from "../services/actividadService";

import type { Etapa } from "../types/Etapa";
import type { Actividad } from "../types/Actividad";
import { obtenerUsuarios } from "../services/usuarioService";

export default function EtapaDetallePage() {
  const { id } = useParams();

  const [etapa, setEtapa] = useState<Etapa | null>(null);
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [resumen, setResumen] = useState({
    total: 0,
    ejecutadas: 0,
    pendientes: 0,
    progreso: 0,
  });

  const [mostrarModal, setMostrarModal] =
    useState(false);
  const [editando, setEditando] =
    useState(false);

  const [errorModal, setErrorModal] =
    useState("");
  const navigate = useNavigate();

  function actualizarResumen(
    actividadesData: Actividad[]
  ) {

    const ejecutadas =
      actividadesData.filter(
        a => a.estadoActividad === "Ejecutada"
      ).length;

    const total =
      actividadesData.length;

    const pendientes =
      total - ejecutadas;

    const progreso =
      total === 0
        ? 0
        : Math.round(
          (ejecutadas / total) * 100
        );

    setResumen({
      total,
      ejecutadas,
      pendientes,
      progreso,
    });
  }

  const [actividadActual, setActividadActual] = useState<{
    idActividad: number;
    nombreActividad: string;
    descripcionActividad: string;
    fechaInicioActividad: string;
    fechaFinActividad: string;
    fechaEjecucionActividad: string | null;
    estadoActividad: string;
    etapa: {
      idEtapa: number;
    };
    desarrollador: {
      idUsuario: number;
    };
  }>({
    idActividad: 0,
    nombreActividad: "",
    descripcionActividad: "",
    fechaInicioActividad: "",
    fechaFinActividad: "",
    fechaEjecucionActividad: null,
    estadoActividad: "Pendiente",
    etapa: {
      idEtapa: Number(id),
    },
    desarrollador: {
      idUsuario: 0,
    },
  });

  useEffect(() => {
    async function cargarDatos() {
      if (!id) return;

      try {
        const etapas = await obtenerEtapas();

        const etapaEncontrada =
          etapas.find(
            (e: Etapa) =>
              e.idEtapa === Number(id)
          ) || null;

        setEtapa(etapaEncontrada);

        const usuariosData =
          await obtenerUsuarios();

        setUsuarios(usuariosData);

        const actividadesEtapa =
          await obtenerActividadesPorEtapa(
            Number(id)
          );

        setActividades(actividadesEtapa);

        actualizarResumen(
          actividadesEtapa
        );

      } catch (error) {
        console.error(error);
      }
    }

    cargarDatos();
  }, [id]);

  if (!etapa) {
    return <p>Cargando etapa...</p>;
  }

  async function ejecutar(
    idActividad: number
  ) {

    try {

      await ejecutarActividad(
        idActividad
      );

      toast.success(
        "Actividad ejecutada"
      );

      const actividadesActualizadas =
        await obtenerActividadesPorEtapa(
          Number(id)
        );

      setActividades(
        actividadesActualizadas
      );
      actualizarResumen(
        actividadesActualizadas
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "No se pudo ejecutar la actividad"
      );
    }
  }

  function editar(actividad: Actividad) {

    setEditando(true);

    setActividadActual({

      idActividad: actividad.idActividad,

      nombreActividad: actividad.nombreActividad,

      descripcionActividad: actividad.descripcionActividad,

      fechaInicioActividad: actividad.fechaInicioActividad,

      fechaFinActividad: actividad.fechaFinActividad,

      fechaEjecucionActividad:
        actividad.fechaEjecucionActividad,

      estadoActividad:
        actividad.estadoActividad,

      etapa: {
        idEtapa: actividad.etapa.idEtapa,
      },

      desarrollador: {
        idUsuario: actividad.desarrollador?.idUsuario ?? 0,
      },

    });

    setMostrarModal(true);

  }

  async function guardarActividad() {

    try {

      if (!editando) {

        const actividadNueva = {
          nombreActividad: actividadActual.nombreActividad,
          descripcionActividad: actividadActual.descripcionActividad,
          fechaInicioActividad: actividadActual.fechaInicioActividad,
          fechaFinActividad: actividadActual.fechaFinActividad,
          estadoActividad: "Pendiente",
          fechaEjecucionActividad: null,
          etapa: actividadActual.etapa,
          desarrollador: actividadActual.desarrollador,
        };

        await crearActividad(actividadNueva);

      } else {

        await actualizarActividad(
          actividadActual.idActividad,
          actividadActual
        );

      }

      setMostrarModal(false);

      const actividadesActualizadas =
        await obtenerActividadesPorEtapa(
          Number(id)
        );

      setActividades(
        actividadesActualizadas
      );

      actualizarResumen(
        actividadesActualizadas
      );

      setEditando(false);

      setActividadActual({

        idActividad: 0,

        nombreActividad: "",

        descripcionActividad: "",

        fechaInicioActividad: "",

        fechaFinActividad: "",

        fechaEjecucionActividad: null,

        estadoActividad: "Pendiente",

        etapa: {
          idEtapa: Number(id),
        },

        desarrollador: {
          idUsuario: 0,
        },

      });

    } catch (error) {

      console.error("ERROR:", error);

      toast.error(
        editando
          ? "No se pudo actualizar la actividad"
          : "No se pudo crear la actividad"
      );

    }

  }

  async function borrarActividad(
    idActividad: number
  ) {

    const confirmar =
      confirm(
        "¿Eliminar esta actividad?"
      );

    if (!confirmar) {
      return;
    }

    try {

      await eliminarActividad(
        idActividad
      );

      toast.success(
        "Actividad eliminada"
      );

      const actividadesActualizadas =
        await obtenerActividadesPorEtapa(
          Number(id)
        );

      setActividades(
        actividadesActualizadas
      );

      actualizarResumen(
        actividadesActualizadas
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "No se pudo eliminar la actividad"
      );

    }

  }

  return (
    <div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
      </div>

      <div
        className="dashboard-stat-card"
        style={{
          marginBottom: "20px",
        }}
      >

        <div
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "20px",
              background: "#ede9fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Layers3
              size={60}
              color="#6d28d9"
            />
          </div>

          <div
            style={{
              flex: 1,
            }}
          >
            <div
              style={{
                color: "#7c3aed",
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              ETAPA
            </div>

            <h1
              style={{
                fontSize: "42px",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              {etapa.nombreEtapa}
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "18px",
                marginBottom: "30px",
              }}
            >
              {etapa.descripcionEtapa}
            </p>

            <div
              style={{
                display: "flex",
                gap: "60px",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "14px",
                  }}
                >
                  Proyecto
                </div>

                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                  {etapa.proyecto.nombreProyecto}
                </div>
              </div>

              <div>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "14px",
                  }}
                >
                  Fecha creación
                </div>

                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                  {etapa.fechaEtapa}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="dashboard-stat-card"
        style={{
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            marginBottom: "6px",
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          Resumen de la etapa
        </h2>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Estado general de las actividades de esta etapa
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px,1fr))",
            gap: "20px",
            marginTop: "0px",
            marginBottom: "20px",
          }}
        >

          <StatCard
            titulo="Actividades"
            valor={resumen.total}
            descripcion="Total actividades"
            icono={ListTodo}
            color="#2563eb"
            fondo="#dbeafe"
          />

          <StatCard
            titulo="Ejecutadas"
            valor={resumen.ejecutadas}
            descripcion="Completadas"
            icono={CheckCircle}
            color="#16a34a"
            fondo="#dcfce7"
          />

          <StatCard
            titulo="Pendientes"
            valor={resumen.pendientes}
            descripcion="Por ejecutar"
            icono={Clock3}
            color="#ea580c"
            fondo="#ffedd5"
          />

          <StatCard
            titulo="Progreso"
            valor={resumen.progreso}
            descripcion="% completado"
            icono={BarChart3}
            color="#7c3aed"
            fondo="#ede9fe"
          />

        </div>

      </div>
      <div
        className="dashboard-stat-card"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2
              style={{
                marginBottom: "6px",
                fontSize: "32px",
                fontWeight: "700",
              }}
            >
              Actividades
            </h2>

            <p
              style={{
                color: "#64748b",
                margin: 0,
              }}
            >
              Listado de actividades pertenecientes a esta etapa
            </p>
          </div>

          <Button
            onClick={() => {

              setEditando(false);

              setErrorModal("");

              setActividadActual({
                idActividad: 0,
                nombreActividad: "",
                descripcionActividad: "",
                fechaInicioActividad: "",
                fechaFinActividad: "",

                fechaEjecucionActividad: null,
                estadoActividad: "Pendiente",

                etapa: {
                  idEtapa: Number(id),
                },

                desarrollador: {
                  idUsuario: 0,
                },
              });

              setMostrarModal(true);

            }}
          >
            Nueva Actividad
          </Button>
        </div>

        <ActividadModal
          open={mostrarModal}
          onClose={() => setMostrarModal(false)}
          actividad={actividadActual}
          setActividad={setActividadActual}
          onGuardar={guardarActividad}
          editando={editando}
          etapas={[etapa]}
          usuarios={usuarios}
          error={errorModal}
          ocultarEtapa
        />

        {actividades.length === 0 ? (
          <p>No hay actividades registradas.</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {actividades.map((actividad) => (

              <div
                key={actividad.idActividad}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "22px",
                  background: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "stretch",
                  gap: "40px",
                }}
              >

                {/* COLUMNA IZQUIERDA */}

                <div
                  style={{
                    flex: 1,
                  }}
                >

                  <span
                    style={{
                      display: "inline-block",
                      background: "#f8fafc",
                      color: "#64748b",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 600,
                      marginBottom: "18px",
                    }}
                  >
                    {actividad.codActividad}
                  </span>

                  <h3
                    style={{
                      color: "#4338ca",
                      margin: 0,
                      fontSize: "30px",
                      fontWeight: 700,
                    }}
                  >
                    {actividad.nombreActividad}
                  </h3>

                  <p
                    style={{
                      marginTop: "18px",
                      color: "#64748b",
                      fontSize: "17px",
                      lineHeight: 1.6,
                    }}
                  >
                    {actividad.descripcionActividad}
                  </p>

                  <div
                    style={{
                      marginTop: "35px",
                    }}
                  >
                    <span
                      style={{
                        background:
                          actividad.estadoActividad === "Ejecutada"
                            ? "#dcfce7"
                            : "#fee2e2",

                        color:
                          actividad.estadoActividad === "Ejecutada"
                            ? "#15803d"
                            : "#dc2626",

                        padding: "8px 14px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {actividad.estadoActividad}
                    </span>
                  </div>

                </div>

                {/* COLUMNA DERECHA */}

                <div
                  style={{
                    width: "340px",
                    borderLeft: "1px solid #e2e8f0",
                    paddingLeft: "30px",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >

                  <div>

                    <div
                      style={{
                        marginBottom: "18px",
                        color: "#64748b",
                      }}
                    >
                      👤 Desarrollador:
                      <br />

                      <strong>
                        {actividad.desarrollador?.nombre}
                        {" "}
                        {actividad.desarrollador?.apellido}
                      </strong>
                    </div>

                    <div
                      style={{
                        marginBottom: "12px",
                        color: "#64748b",
                      }}
                    >
                      📅 Inicio:
                      <br />

                      <strong>
                        {actividad.fechaInicioActividad}
                      </strong>
                    </div>

                    <div
                      style={{
                        color: "#64748b",
                      }}
                    >
                      📅 Fin:
                      <br />

                      <strong>
                        {actividad.fechaFinActividad}
                      </strong>
                    </div>

                  </div>

                  <div
                    style={{
                      marginTop: "30px",
                      display: "flex",
                      gap: "10px",
                    }}
                  >

                    <Button
                      variant="outline"
                      asChild
                    >
                      <Link
                        to={`/dashboard/actividades/${actividad.idActividad}`}
                      >
                        Ver
                      </Link>
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => editar(actividad)}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() =>
                        borrarActividad(
                          actividad.idActividad
                        )
                      }
                    >
                      Eliminar
                    </Button>

                    {actividad.estadoActividad !== "Ejecutada" && (

                      <Button
                        onClick={() =>
                          ejecutar(actividad.idActividad)
                        }
                      >
                        Ejecutar
                      </Button>

                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}