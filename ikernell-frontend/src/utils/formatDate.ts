const FORMATO_FECHA_HORA = new Intl.DateTimeFormat('es-CO', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

const FORMATO_FECHA = new Intl.DateTimeFormat('es-CO', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

/** Formatea un ISO string de fecha+hora (con o sin milisegundos) a texto legible, ej: "14 jul 2026, 11:07 a.m." */
export function formatFechaHora(valor: string | null | undefined): string {
  if (!valor) return '';
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) return valor;
  return FORMATO_FECHA_HORA.format(fecha);
}

/** Formatea un ISO string de fecha a texto legible, ej: "14 jul 2026" */
export function formatFecha(valor: string | null | undefined): string {
  if (!valor) return '';
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) return valor;
  return FORMATO_FECHA.format(fecha);
}
