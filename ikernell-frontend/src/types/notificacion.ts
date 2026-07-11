export type TipoNotificacion = 'Actividad' | 'Proyecto' | 'Error' | 'Interrupción' | 'Mensaje' | 'Sistema';

export interface NotificacionResponse {
  idNotificacion: number;
  codigoNotificacion: string;
  titulo: string;
  detalle: string | null;
  tipo: TipoNotificacion;
  leida: boolean;
  /** Ruta relativa (ej. "/dashboard/proyectos/5") a la que navegar al hacer click, o null. */
  urlDestino: string | null;
  fechaCreacion: string;
  fechaLectura: string | null;
}
