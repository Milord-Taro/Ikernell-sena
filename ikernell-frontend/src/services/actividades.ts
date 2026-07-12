import { api } from './api';
import type { ActividadResponse, ActividadRequest, EstadoActividad } from '../types/actividad';

// NUEVO: "sin filtro" ahora sí devuelve todo (ver ActividadController) --
// usado por MetricasPage para calcular KPIs org-wide / por proyecto sin
// tener que iterar etapa por etapa.
export function listarTodasLasActividades(): Promise<ActividadResponse[]> {
  return api.get<ActividadResponse[]>('/actividades');
}

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

/**
 * Lo llama el desarrollador dueño de la actividad; una vez Cancelada,
 * solo Líder/Coordinador (ver ActividadService.cambiarEstado). "nota"
 * solo se persiste si el estado destino es "Finalizada", el backend la
 * limpia en cualquier otro caso.
 */
export function cambiarEstadoActividad(
  idActividad: number,
  estado: EstadoActividad,
  nota?: string,
): Promise<ActividadResponse> {
  const query = new URLSearchParams({ estado });
  if (nota) query.set('nota', nota);
  return api.patch<ActividadResponse>(`/actividades/${idActividad}/estado?${query.toString()}`);
}

export function eliminarActividad(idActividad: number): Promise<void> {
  return api.delete<void>(`/actividades/${idActividad}`);
}
