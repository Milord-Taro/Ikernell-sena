import type { ActividadResponse } from './actividad';
import type { TipoInterrupcionResponse, UsuarioResumenResponse } from './usuario';

export interface InterrupcionResponse {
  idInterrupcion: number;
  codigoInterrupcion: string;
  actividad: ActividadResponse;
  tipoInterrupcion: TipoInterrupcionResponse;
  /** NUEVO: quién la registró -- hoy siempre el desarrollador de la actividad. */
  usuarioCreador: UsuarioResumenResponse | null;
  motivo: string;
  duracionMinutos: number;
  fechaRegistro: string;
}

/** Igual que RegistroError: sin campo "fase" propio, se deriva de actividad.etapa. */
export interface InterrupcionRequest {
  idActividad: number;
  idTipoInterrupcion: number;
  motivo: string;
  duracionMinutos: number;
}
