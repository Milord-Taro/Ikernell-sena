import { api } from './api';
import type { RegistroErrorResponse, RegistroErrorRequest } from '../types/registroError';

export function listarRegistrosError(): Promise<RegistroErrorResponse[]> {
  return api.get<RegistroErrorResponse[]>('/registros-error');
}

export function listarRegistrosErrorPorActividad(idActividad: number): Promise<RegistroErrorResponse[]> {
  return api.get<RegistroErrorResponse[]>(`/registros-error?idActividad=${idActividad}`);
}

export function crearRegistroError(request: RegistroErrorRequest): Promise<RegistroErrorResponse> {
  return api.post<RegistroErrorResponse>('/registros-error', request);
}
