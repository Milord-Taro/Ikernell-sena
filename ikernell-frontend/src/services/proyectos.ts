import { api } from './api';
import type { ProyectoResponse, ProyectoRequest, EstadoProyecto } from '../types/proyecto';

export function listarProyectos(estado?: EstadoProyecto): Promise<ProyectoResponse[]> {
  const query = estado ? `?estado=${encodeURIComponent(estado)}` : '';
  return api.get<ProyectoResponse[]>(`/proyectos${query}`);
}

export function obtenerProyectoPorId(idProyecto: number): Promise<ProyectoResponse> {
  return api.get<ProyectoResponse>(`/proyectos/${idProyecto}`);
}

export function crearProyecto(request: ProyectoRequest): Promise<ProyectoResponse> {
  return api.post<ProyectoResponse>('/proyectos', request);
}

export function actualizarProyecto(idProyecto: number, request: ProyectoRequest): Promise<ProyectoResponse> {
  return api.put<ProyectoResponse>(`/proyectos/${idProyecto}`, request);
}

export function cambiarEstadoProyecto(idProyecto: number, estado: EstadoProyecto): Promise<ProyectoResponse> {
  return api.patch<ProyectoResponse>(`/proyectos/${idProyecto}/estado?estado=${encodeURIComponent(estado)}`);
}
