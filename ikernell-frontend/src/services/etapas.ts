import { api } from './api';
import type { EtapaResponse, EtapaRequest, EstadoEtapa } from '../types/etapa';

export function listarEtapasPorProyecto(idProyecto: number): Promise<EtapaResponse[]> {
  return api.get<EtapaResponse[]>(`/etapas?idProyecto=${idProyecto}`);
}

export function obtenerEtapaPorId(idEtapa: number): Promise<EtapaResponse> {
  return api.get<EtapaResponse>(`/etapas/${idEtapa}`);
}

export function crearEtapa(request: EtapaRequest): Promise<EtapaResponse> {
  return api.post<EtapaResponse>('/etapas', request);
}

export function actualizarEtapa(idEtapa: number, request: EtapaRequest): Promise<EtapaResponse> {
  return api.put<EtapaResponse>(`/etapas/${idEtapa}`, request);
}

export function cambiarEstadoEtapa(idEtapa: number, estado: EstadoEtapa): Promise<EtapaResponse> {
  return api.patch<EtapaResponse>(`/etapas/${idEtapa}/estado?estado=${encodeURIComponent(estado)}`);
}

export function eliminarEtapa(idEtapa: number): Promise<void> {
  return api.delete<void>(`/etapas/${idEtapa}`);
}
