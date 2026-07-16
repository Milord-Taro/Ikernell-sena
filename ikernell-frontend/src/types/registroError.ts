import type { ActividadResponse, NivelCriticidad } from './actividad';
import type { TipoErrorResponse, UsuarioResumenResponse } from './usuario';

export type EstadoRegistroError = 'Abierto' | 'En progreso' | 'Resuelto' | 'Descartado';

export const ESTADOS_REGISTRO_ERROR: EstadoRegistroError[] = [
  'Abierto', 'En progreso', 'Resuelto', 'Descartado',
];

/** Solo tienen sentido en Resuelto/Descartado -- el backend los limpia en cualquier otro estado. */
export const ESTADOS_CON_NOTA_RESOLUCION: EstadoRegistroError[] = ['Resuelto', 'Descartado'];

export interface RegistroErrorResponse {
  idRegistroError: number;
  codigoRegistroError: string;
  actividad: ActividadResponse;
  tipoError: TipoErrorResponse;
  /** NUEVO: quién lo registró -- el propio desarrollador, o el Líder si lo creó él. */
  usuarioCreador: UsuarioResumenResponse | null;
  titulo: string;
  descripcion: string;
  severidad: NivelCriticidad;
  estado: EstadoRegistroError;
  /** NUEVO: cómo se resolvió o por qué se descartó -- solo si estado es Resuelto/Descartado. */
  notaResolucion: string | null;
  fechaRegistro: string;
}

/**
 * NOTA: no hay campo "fase" separado -- la fase/etapa de un
 * RegistroError se deriva de actividad.etapa (la actividad ya pertenece
 * a una etapa). "estado" tampoco se manda al crear -- el backend
 * siempre nace en "Abierto"; se cambia después vía PATCH /estado.
 */
export interface RegistroErrorRequest {
  idActividad: number;
  idTipoError: number;
  titulo: string;
  descripcion: string;
  severidad: NivelCriticidad;
}
