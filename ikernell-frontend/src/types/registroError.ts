import type { ActividadResponse, NivelCriticidad } from './actividad';
import type { TipoErrorResponse } from './usuario';

export interface RegistroErrorResponse {
  idRegistroError: number;
  codigoRegistroError: string;
  actividad: ActividadResponse;
  tipoError: TipoErrorResponse;
  titulo: string;
  descripcion: string;
  severidad: NivelCriticidad;
  fechaRegistro: string;
}

/**
 * NOTA: no hay campo "fase" separado -- la fase/etapa de un
 * RegistroError se deriva de actividad.etapa (la actividad ya pertenece
 * a una etapa). Decisión ya tomada en el DTO real del backend, no hay
 * que agregar nada extra aquí.
 */
export interface RegistroErrorRequest {
  codigoRegistroError: string;
  idActividad: number;
  idTipoError: number;
  titulo: string;
  descripcion: string;
  severidad: NivelCriticidad;
}
