import type { ActividadResponse } from './actividad';
import type { TipoInterrupcionResponse } from './usuario';

export interface InterrupcionResponse {
  idInterrupcion: number;
  codigoInterrupcion: string;
  actividad: ActividadResponse;
  tipoInterrupcion: TipoInterrupcionResponse;
  motivo: string;
  duracionMinutos: number;
  fechaRegistro: string;
}

/** Igual que RegistroError: sin campo "fase" propio, se deriva de actividad.etapa. */
export interface InterrupcionRequest {
  codigoInterrupcion: string;
  idActividad: number;
  idTipoInterrupcion: number;
  motivo: string;
  duracionMinutos: number;
}
