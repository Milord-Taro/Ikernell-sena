import type { Interrupcion } from "../types/Interrupcion";
import type { Proyecto } from "../types/Proyecto";
import type { Actividad } from "../types/Actividad";

function descargarArchivo(contenido: string, nombreArchivo: string) {
  const blob = new Blob([contenido], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const enlace = document.createElement("a");

  enlace.href = url;

  enlace.download = nombreArchivo;

  enlace.click();

  URL.revokeObjectURL(url);
}

function encabezadoReporte(titulo: string) {
  const ahora = new Date();

  return `
IKERNELL SOLUCIONES SOFTWARE
================================================

${titulo}

Fecha : ${ahora.toLocaleDateString("es-CO")}
Hora  : ${ahora.toLocaleTimeString("es-CO")}

================================================

`;
}

import type { RegistroError } from "../types/RegistroError";

export function exportarHistorialErrores(errores: RegistroError[]) {
  let contenido = encabezadoReporte("HISTORIAL DE ERRORES");

  errores.forEach((error, index) => {
    contenido += `Registro ${index + 1}

Código: ${error.codError}
Fecha: ${new Date(error.fechaRegistroError).toLocaleDateString("es-CO")}
Estado: ${error.estadoError}
Tipo: ${error.tipoError.nombreTipo}
Etapa: ${error.etapa.nombreEtapa}
Desarrollador: ${error.desarrollador.nombre} ${error.desarrollador.apellido}

Descripción:
${error.descripcionError}

Comentarios:
${error.comentarioError || "Sin comentarios"}

------------------------------------------------------------

`;
  });

  descargarArchivo(contenido, "Historial_Errores.txt");
}

export function exportarHistorialInterrupciones(
  interrupciones: Interrupcion[],
) {
  let contenido = encabezadoReporte("HISTORIAL DE INTERRUPCIONES");

  interrupciones.forEach((interrupcion, index) => {
    contenido += `Registro ${index + 1}

Código: ${interrupcion.codInterrupcion}
Fecha: ${new Date(interrupcion.fechaInterrupcion).toLocaleDateString("es-CO")}
Tipo: ${interrupcion.tipoInterrupcion.nombreTipoInterrupcion}
Etapa: ${interrupcion.etapa.nombreEtapa}
Desarrollador: ${interrupcion.desarrollador.nombre} ${interrupcion.desarrollador.apellido}
Duración: ${interrupcion.duracionInterrupcion} minutos

Descripción:
${interrupcion.descripcionInterrupcion}

------------------------------------------------------------

`;
  });

  descargarArchivo(contenido, "Historial_Interrupciones.txt");
}

export function exportarReporteGeneral(proyectos: Proyecto[]) {
  let contenido = encabezadoReporte("REPORTE GENERAL DE PROYECTOS");

  proyectos.forEach((p) => {
    contenido += `Código      : ${p.codProyecto}
Proyecto    : ${p.nombreProyecto}
Estado      : ${p.estadoProyecto ? "Activo" : "Inactivo"}
Líder       : ${p.lider.nombre} ${p.lider.apellido}
Inicio      : ${p.fechaInicioProyecto}
Fin         : ${p.fechaFinProyecto}

------------------------------------------------------------

`;
  });

  descargarArchivo(contenido, "Reporte_Proyectos.txt");
}

export function exportarInformeDesempeno(
  desarrollador: any,
  proyecto: any,
  informe: any,
  porcentaje: number,
) {
  let contenido = encabezadoReporte("INFORME DE DESEMPEÑO");

  contenido += `Proyecto

${proyecto.nombreProyecto}

Desarrollador

${desarrollador.nombre} ${desarrollador.apellido}

------------------------------------------------------------

Actividades asignadas : ${informe.actividades}

Ejecutadas            : ${informe.ejecutadas}

Pendientes            : ${informe.pendientes}

Errores registrados   : ${informe.errores}

Interrupciones        : ${informe.interrupciones}

Cumplimiento          : ${porcentaje} %

`;

  descargarArchivo(contenido, "Informe_Desempeno.txt");
}
