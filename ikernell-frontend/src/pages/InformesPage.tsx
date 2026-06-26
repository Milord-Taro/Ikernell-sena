import { useEffect, useState } from "react";

import { obtenerProyectos } from "../services/proyectoService";
import { obtenerErrores } from "../services/registroErrorService";
import { obtenerInterrupciones } from "../services/interrupcionService";
import { obtenerActividades } from "../services/actividadService";
import type { Actividad } from "../types/Actividad";

import {
  exportarReporteGeneral,
  exportarInformeDesempeno,
} from "../services/exportService";

export default function InformesPage() {
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [errores, setErrores] = useState<any[]>([]);
  const [interrupciones, setInterrupciones] = useState<any[]>([]);
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [desarrolladorSeleccionado, setDesarrolladorSeleccionado] =
    useState("");
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState("");

  useEffect(() => {
    async function cargar() {
      setProyectos(await obtenerProyectos());
      setErrores(await obtenerErrores());
      setInterrupciones(await obtenerInterrupciones());
      setActividades(await obtenerActividades());
    }
    cargar();
  }, []);

  const erroresAbiertos = errores.filter(
    (e) => e.estadoError === "Abierto",
  ).length;

  const erroresRevision = errores.filter(
    (e) => e.estadoError === "En Revision",
  ).length;

  const erroresCorregidos = errores.filter(
    (e) => e.estadoError === "Corregido",
  ).length;

  const erroresPorTipo = errores.reduce(
    (acc: Record<string, number>, error) => {
      const tipo = error.tipoError.nombreTipo;

      acc[tipo] = (acc[tipo] || 0) + 1;

      return acc;
    },
    {},
  );

  const interrupcionesPorTipo = interrupciones.reduce(
    (acc: Record<string, number>, interrupcion) => {
      const tipo = interrupcion.tipoInterrupcion.nombreTipoInterrupcion;

      acc[tipo] = (acc[tipo] || 0) + 1;

      return acc;
    },
    {},
  );

  const proyectosConErrores = proyectos
    .map((proyecto) => {
      const cantidad = errores.filter(
        (e) => e.etapa.proyecto?.idProyecto === proyecto.idProyecto,
      ).length;

      return {
        nombre: proyecto.nombreProyecto,
        cantidad,
      };
    })
    .filter((p) => p.cantidad > 0)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5);

  const desarrolladores = [
    ...new Map(
      errores.map((e) => [e.desarrollador?.idUsuario, e.desarrollador]),
    ).values(),
  ];

  const informeDesempeno =
    desarrolladorSeleccionado && proyectoSeleccionado
      ? {
          actividades: actividades.filter(
            (a) =>
              a.desarrollador?.idUsuario ===
                Number(desarrolladorSeleccionado) &&
              a.etapa.proyecto?.idProyecto === Number(proyectoSeleccionado),
          ).length,
          pendientes: actividades.filter(
            (a) =>
              a.desarrollador?.idUsuario ===
                Number(desarrolladorSeleccionado) &&
              a.etapa.proyecto?.idProyecto === Number(proyectoSeleccionado) &&
              a.estadoActividad === "Pendiente",
          ).length,

          ejecutadas: actividades.filter(
            (a) =>
              a.desarrollador?.idUsuario ===
                Number(desarrolladorSeleccionado) &&
              a.etapa.proyecto?.idProyecto === Number(proyectoSeleccionado) &&
              a.estadoActividad === "Ejecutada",
          ).length,
          errores: errores.filter(
            (e) =>
              e.desarrollador.idUsuario === Number(desarrolladorSeleccionado) &&
              e.etapa.proyecto?.idProyecto === Number(proyectoSeleccionado),
          ).length,

          interrupciones: interrupciones.filter(
            (i) =>
              i.desarrollador.idUsuario === Number(desarrolladorSeleccionado) &&
              i.etapa.proyecto?.idProyecto === Number(proyectoSeleccionado),
          ).length,
        }
      : null;

  const porcentajeDesempeno = informeDesempeno
    ? informeDesempeno.actividades === 0
      ? 0
      : Math.round(
          (informeDesempeno.ejecutadas / informeDesempeno.actividades) * 100,
        )
    : 0;

  const desarrolladoresConErrores = errores.reduce(
    (acc: Record<number, any>, error) => {
      const id = error.desarrollador.idUsuario;

      if (!acc[id]) {
        acc[id] = {
          nombre: `${error.desarrollador.nombre} ${error.desarrollador.apellido}`,
          cantidad: 0,
        };
      }

      acc[id].cantidad++;

      return acc;
    },
    {},
  );
  const rankingDesarrolladores = Object.values(desarrolladoresConErrores)
    .sort((a: any, b: any) => b.cantidad - a.cantidad)
    .slice(0, 5);

  const tarjetas = [
    {
      titulo: "Proyectos",
      valor: proyectos.length,
    },
    {
      titulo: "Total Interrupciones",
      valor: interrupciones.length,
    },
    {
      titulo: "Total Errores",
      valor: errores.length,
    },
    {
      titulo: "Errores Abiertos",
      valor: erroresAbiertos,
    },
    {
      titulo: "Errores En revisión",
      valor: erroresRevision,
    },
    {
      titulo: "Errores Corregidos",
      valor: erroresCorregidos,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Informes</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "5px",
          marginBottom: "10px",
        }}
      >
        <p
          style={{
            color: "#64748b",
            margin: 0,
          }}
        >
          Resumen general de proyectos, errores e interrupciones.
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={() => exportarReporteGeneral(proyectos)}
            style={{
              background: "#4338ca",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "10px 18px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Exportar archivo plano
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {tarjetas.map((t) => (
          <div
            key={t.titulo}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,.05)",
            }}
          >
            <div
              style={{
                color: "#64748b",
                fontSize: "15px",
              }}
            >
              {t.titulo}
            </div>

            <div
              style={{
                marginTop: "10px",
                fontSize: "42px",
                fontWeight: "700",
                color: "#4338ca",
              }}
            >
              {t.valor}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "30px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            marginTop: "30px",
            background: "white",
            borderRadius: "16px",

            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,.05)",
          }}
        >
          <h2>Informe de desempeño</h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {" "}
            <h3>Desarrollador:</h3>
            <select
              value={desarrolladorSeleccionado}
              onChange={(e) => setDesarrolladorSeleccionado(e.target.value)}
            >
              <option value="">Seleccione desarrollador</option>

              {desarrolladores.map((d: any) => (
                <option key={d.idUsuario} value={d.idUsuario}>
                  {d.nombre} {d.apellido}
                </option>
              ))}
            </select>
            <h3>Proyecto:</h3>
            <select
              value={proyectoSeleccionado}
              onChange={(e) => setProyectoSeleccionado(e.target.value)}
            >
              <option value="">Seleccione proyecto</option>

              {proyectos.map((p) => (
                <option key={p.idProyecto} value={p.idProyecto}>
                  {p.nombreProyecto}
                </option>
              ))}
            </select>
          </div>

          {informeDesempeno && (
            <div
              style={{
                marginTop: "47px",
              }}
            >
              <p>
                <strong>Errores registrados:</strong> {informeDesempeno.errores}
              </p>

              <p>
                <strong>Interrupciones:</strong>{" "}
                {informeDesempeno.interrupciones}
              </p>

              <p>
                <strong>Actividades asignadas:</strong>{" "}
                {informeDesempeno.actividades}
              </p>

              <p>
                <strong>Pendientes:</strong> {informeDesempeno.pendientes}
              </p>

              <p>
                <strong>Ejecutadas:</strong> {informeDesempeno.ejecutadas}
              </p>
              <p>
                <strong>Desempeño:</strong> {porcentajeDesempeno}%
              </p>

              <div
                style={{
                  width: "100%",
                  height: "12px",
                  background: "#e5e7eb",
                  borderRadius: "999px",
                  marginTop: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${porcentajeDesempeno}%`,
                    height: "100%",
                    background: "#4338ca",
                  }}
                />
              </div>

              <p>
                <strong>Calificación:</strong>{" "}
                {porcentajeDesempeno >= 90
                  ? "Excelente"
                  : porcentajeDesempeno >= 75
                    ? "Bueno"
                    : porcentajeDesempeno >= 50
                      ? "Regular"
                      : "Bajo"}
              </p>
              <div
                style={{
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() =>
                    exportarInformeDesempeno(
                      desarrolladores.find(
                        (d) =>
                          d.idUsuario === Number(desarrolladorSeleccionado),
                      ),
                      proyectos.find(
                        (p) => p.idProyecto === Number(proyectoSeleccionado),
                      ),
                      informeDesempeno,
                      porcentajeDesempeno,
                    )
                  }
                  style={{
                    background: "#4338ca",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "10px 18px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Exportar informe de desempeño
                </button>
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            marginTop: "30px",
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,.05)",
          }}
        >
          <h2>Distribución de errores por desarrollador</h2>

          <div style={{ marginTop: "20px" }}>
            {rankingDesarrolladores.map((d: any) => (
              <div
                key={d.nombre}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span>{d.nombre}</span>

                <strong>{d.cantidad}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "30px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            marginTop: "30px",
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,.05)",
          }}
        >
          <h2>Errores por tipo</h2>

          <div style={{ marginTop: "20px" }}>
            {Object.entries(erroresPorTipo).map(([tipo, cantidad]) => (
              <div
                key={tipo}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span>{tipo}</span>

                <strong>{cantidad}</strong>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            marginTop: "30px",
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,.05)",
          }}
        >
          <h2>Interrupciones por tipo</h2>

          <div style={{ marginTop: "20px" }}>
            {Object.entries(interrupcionesPorTipo).map(([tipo, cantidad]) => (
              <div
                key={tipo}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span>{tipo}</span>

                <strong>{cantidad}</strong>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,.05)",
          }}
        >
          <h2>Proyectos con más errores</h2>

          <div style={{ marginTop: "20px" }}>
            {proyectosConErrores.map((p) => (
              <div
                key={p.nombre}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span>{p.nombre}</span>

                <strong>{p.cantidad}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
