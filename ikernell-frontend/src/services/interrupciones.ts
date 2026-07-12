import { api } from './api';
import type { InterrupcionResponse, InterrupcionRequest } from '../types/interrupcion';

export function listarInterrupciones(): Promise<InterrupcionResponse[]> {
  return api.get<InterrupcionResponse[]>('/interrupciones');
}

export function listarInterrupcionesPorActividad(idActividad: number): Promise<InterrupcionResponse[]> {
  return api.get<InterrupcionResponse[]>(`/interrupciones?idActividad=${idActividad}`);
}

export function crearInterrupcion(request: InterrupcionRequest): Promise<InterrupcionResponse> {
  return api.post<InterrupcionResponse>('/interrupciones', request);
}

export function eliminarInterrupcion(idInterrupcion: number): Promise<void> {
  return api.delete<void>(`/interrupciones/${idInterrupcion}`);
}
