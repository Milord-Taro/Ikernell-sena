import type { UsuarioResponse } from './usuario';

export type EstadoProyecto = 'Planeación' | 'En ejecución' | 'Finalizado' | 'Suspendido' | 'Cancelado';

export const ESTADOS_PROYECTO: EstadoProyecto[] = [
  'Planeación',
  'En ejecución',
  'Finalizado',
  'Suspendido',
  'Cancelado',
];

export interface ProyectoResponse {
  idProyecto: number;
  codigoProyecto: string;
  nombreProyecto: string;
  descripcion: string | null;
  fechaInicio: string;
  fechaFin: string;
  estado: EstadoProyecto;
  fechaCreacion: string;
  /** Líder VIGENTE del proyecto ahora mismo, o null si nadie está asignado. */
  liderActual: UsuarioResponse | null;
}

export interface ProyectoRequest {
  nombreProyecto: string;
  descripcion?: string;
  fechaInicio: string;
  fechaFin: string;
  /** Solo tiene efecto si quien crea es Coordinador. */
  idLiderInicial?: number;
}
