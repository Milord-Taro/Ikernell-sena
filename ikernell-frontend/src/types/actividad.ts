import type { EtapaResponse } from './etapa';
import type { UsuarioResponse } from './usuario';

/**
 * Los valores textuales deben coincidir EXACTO con @JsonValue de
 * EstadoActividad.java / NivelCriticidad.java en el backend (no con el
 * nombre de la constante Java).
 */
export type EstadoActividad =
  | 'Pendiente de asignación'
  | 'Pendiente'
  | 'En desarrollo'
  | 'Finalizada'
  | 'Cancelada';

export const ESTADOS_ACTIVIDAD: EstadoActividad[] = [
  'Pendiente de asignación',
  'Pendiente',
  'En desarrollo',
  'Finalizada',
  'Cancelada',
];

/**
 * Estados a los que un Desarrollador puede transicionar manualmente vía
 * PATCH /estado. "Pendiente de asignación" queda afuera a propósito: el
 * backend la rechaza (ActividadService.cambiarEstado) porque solo se
 * llega ahí al crear sin usuario, nunca de vuelta.
 */
export const ESTADOS_ACTIVIDAD_SELECCIONABLES: EstadoActividad[] = [
  'Pendiente',
  'En desarrollo',
  'Finalizada',
  'Cancelada',
];

export type NivelCriticidad = 'Baja' | 'Media' | 'Alta' | 'Crítica';

export const NIVELES_CRITICIDAD: NivelCriticidad[] = ['Baja', 'Media', 'Alta', 'Crítica'];

export interface ActividadResponse {
  idActividad: number;
  codigoActividad: string;
  etapa: EtapaResponse;
  /** null cuando el estado es "Pendiente de asignación". */
  usuario: UsuarioResponse | null;
  nombreActividad: string;
  descripcion: string | null;
  prioridad: NivelCriticidad;
  fechaInicio: string;
  fechaFin: string;
  estado: EstadoActividad;
  /** NUEVO: solo tiene valor si estado === 'Finalizada'. */
  fechaFinalizacion: string | null;
  fechaCreacion: string;
}

/**
 * idUsuario es OPCIONAL a propósito, igual que en el backend: si no se
 * manda, la actividad queda "Pendiente de asignación". "estado" no se
 * incluye -- lo decide el backend (crear) o se cambia por separado
 * (PATCH /asignar, PATCH /estado).
 */
export interface ActividadRequest {
  codigoActividad: string;
  idEtapa: number;
  idUsuario?: number;
  nombreActividad: string;
  descripcion?: string;
  prioridad: NivelCriticidad;
  fechaInicio: string;
  fechaFin: string;
}
