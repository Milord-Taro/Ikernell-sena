import { obtenerToken } from './api';

const API_URL = import.meta.env.VITE_API_URL as string;

export type FormatoReporte = 'TXT' | 'CSV' | 'PDF' | 'EXCEL';

export const FORMATOS_REPORTE: FormatoReporte[] = ['TXT', 'CSV', 'PDF', 'EXCEL'];

const EXTENSION_POR_FORMATO: Record<FormatoReporte, string> = {
  TXT: 'txt',
  CSV: 'csv',
  PDF: 'pdf',
  EXCEL: 'xlsx',
};

/**
 * Los reportes son binarios (PDF/Excel) o texto plano -- no pasan por
 * `api.ts` porque ese cliente siempre intenta `response.json()`. Aquí se
 * arma el fetch a mano, con el mismo Bearer token, y se dispara la
 * descarga en el navegador vía un <a download> temporal.
 */
async function descargar(path: string, nombreArchivo: string): Promise<void> {
  const token = obtenerToken();

  const response = await fetch(`${API_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    throw new Error('No se pudo generar el reporte.');
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = nombreArchivo;
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
  URL.revokeObjectURL(url);
}

export function descargarReporteActividades(idProyecto: number, formato: FormatoReporte): Promise<void> {
  return descargar(
    `/reportes/actividades-por-proyecto/${idProyecto}?formato=${formato}`,
    `reporte-actividades-proyecto-${idProyecto}.${EXTENSION_POR_FORMATO[formato]}`,
  );
}

export function descargarReporteInterrupciones(idProyecto: number, formato: FormatoReporte): Promise<void> {
  return descargar(
    `/reportes/interrupciones-por-proyecto/${idProyecto}?formato=${formato}`,
    `reporte-interrupciones-proyecto-${idProyecto}.${EXTENSION_POR_FORMATO[formato]}`,
  );
}

/** Reporte macro de toda la organización (proyectos, actividades, errores e
 * interrupciones) -- solo Coordinador (ver ReporteGeneralController). */
export function descargarReporteGeneral(formato: FormatoReporte): Promise<void> {
  return descargar(
    `/reportes/general?formato=${formato}`,
    `reporte-general.${EXTENSION_POR_FORMATO[formato]}`,
  );
}
