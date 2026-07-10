import { api } from './api';
import type { RegistroErrorResponse, RegistroErrorRequest, EstadoRegistroError } from '../types/registroError';

export function listarRegistrosError(): Promise<RegistroErrorResponse[]> {
  return api.get<RegistroErrorResponse[]>('/registros-error');
}

export function listarRegistrosErrorPorActividad(idActividad: number): Promise<RegistroErrorResponse[]> {
  return api.get<RegistroErrorResponse[]>(`/registros-error?idActividad=${idActividad}`);
}

export function crearRegistroError(request: RegistroErrorRequest): Promise<RegistroErrorResponse> {
  return api.post<RegistroErrorResponse>('/registros-error', request);
}

// NUEVO: sin restricción de rol en el backend -- lo puede llamar quien
// registró el error o quien lo esté supervisando (ver ErroresPage).
export function cambiarEstadoRegistroError(
  idRegistroError: number,
  estado: EstadoRegistroError,
): Promise<RegistroErrorResponse> {
  return api.patch<RegistroErrorResponse>(`/registros-error/${idRegistroError}/estado?estado=${encodeURIComponent(estado)}`);
}
