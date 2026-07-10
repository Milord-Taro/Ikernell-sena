import { api } from './api';
import type { ActividadResponse, ActividadRequest, EstadoActividad } from '../types/actividad';

export function listarActividadesPorEtapa(idEtapa: number): Promise<ActividadResponse[]> {
  return api.get<ActividadResponse[]>(`/actividades?idEtapa=${idEtapa}`);
}

/** Para la vista "mis actividades" del Desarrollador logueado. */
export function listarActividadesPorUsuario(idUsuario: number): Promise<ActividadResponse[]> {
  return api.get<ActividadResponse[]>(`/actividades?idUsuario=${idUsuario}`);
}

export function obtenerActividadPorId(idActividad: number): Promise<ActividadResponse> {
  return api.get<ActividadResponse>(`/actividades/${idActividad}`);
}

export function crearActividad(request: ActividadRequest): Promise<ActividadResponse> {
  return api.post<ActividadResponse>('/actividades', request);
}

export function actualizarActividad(
  idActividad: number,
  request: ActividadRequest,
): Promise<ActividadResponse> {
  return api.put<ActividadResponse>(`/actividades/${idActividad}`, request);
}

/** Solo aplica a actividades en "Pendiente de asignación" -- el backend rechaza si ya tiene desarrollador. */
export function asignarActividad(idActividad: number, idUsuario: number): Promise<ActividadResponse> {
  return api.patch<ActividadResponse>(`/actividades/${idActividad}/asignar?idUsuario=${idUsuario}`);
}

/** Sin restricción de rol en el backend -- lo llama el propio Desarrollador. */
export function cambiarEstadoActividad(
  idActividad: number,
  estado: EstadoActividad,
): Promise<ActividadResponse> {
  return api.patch<ActividadResponse>(`/actividades/${idActividad}/estado?estado=${encodeURIComponent(estado)}`);
}

export function eliminarActividad(idActividad: number): Promise<void> {
  return api.delete<void>(`/actividades/${idActividad}`);
}
