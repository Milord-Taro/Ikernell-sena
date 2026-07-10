import type { ActividadResponse, NivelCriticidad } from './actividad';
import type { TipoErrorResponse } from './usuario';

export type EstadoRegistroError = 'Abierto' | 'En progreso' | 'Resuelto' | 'Descartado';

export const ESTADOS_REGISTRO_ERROR: EstadoRegistroError[] = [
  'Abierto', 'En progreso', 'Resuelto', 'Descartado',
];

export interface RegistroErrorResponse {
  idRegistroError: number;
  codigoRegistroError: string;
  actividad: ActividadResponse;
  tipoError: TipoErrorResponse;
  titulo: string;
  descripcion: string;
  severidad: NivelCriticidad;
  estado: EstadoRegistroError;
  fechaRegistro: string;
}

/**
 * NOTA: no hay campo "fase" separado -- la fase/etapa de un
 * RegistroError se deriva de actividad.etapa (la actividad ya pertenece
 * a una etapa). "estado" tampoco se manda al crear -- el backend
 * siempre nace en "Abierto"; se cambia después vía PATCH /estado.
 */
export interface RegistroErrorRequest {
  codigoRegistroError: string;
  idActividad: number;
  idTipoError: number;
  titulo: string;
  descripcion: string;
  severidad: NivelCriticidad;
}
