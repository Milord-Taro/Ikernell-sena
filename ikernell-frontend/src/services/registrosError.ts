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
// "nota" solo se persiste si el estado destino es Resuelto/Descartado
// (ver ESTADOS_CON_NOTA_RESOLUCION); el backend la limpia en cualquier
// otro caso.
export function cambiarEstadoRegistroError(
  idRegistroError: number,
  estado: EstadoRegistroError,
  nota?: string,
): Promise<RegistroErrorResponse> {
  const query = new URLSearchParams({ estado });
  if (nota) query.set('nota', nota);
  return api.patch<RegistroErrorResponse>(`/registros-error/${idRegistroError}/estado?${query.toString()}`);
}

export function eliminarRegistroError(idRegistroError: number): Promise<void> {
  return api.delete<void>(`/registros-error/${idRegistroError}`);
}
