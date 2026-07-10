import { api } from './api';
import type { AsignacionProyectoResponse, AsignacionProyectoRequest } from '../types/asignacionProyecto';

export function listarAsignacionesPorProyecto(idProyecto: number): Promise<AsignacionProyectoResponse[]> {
  return api.get<AsignacionProyectoResponse[]>(`/asignaciones-proyecto?idProyecto=${idProyecto}`);
}

export function crearAsignacion(request: AsignacionProyectoRequest): Promise<AsignacionProyectoResponse> {
  return api.post<AsignacionProyectoResponse>('/asignaciones-proyecto', request);
}

export function desvincularAsignacion(idAsignacionProyecto: number): Promise<AsignacionProyectoResponse> {
  return api.patch<AsignacionProyectoResponse>(`/asignaciones-proyecto/${idAsignacionProyecto}/desvincular`);
}
