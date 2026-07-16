import { api } from './api';
import type { MetricasResponse } from '../types/metrica';

// CORREGIDO (B4 + B5): antes MetricasPage.tsx traía TODOS los proyectos,
// actividades, errores, etc. (org-wide, sin importar el rol de quien
// pedía) y filtraba/agregaba en el navegador. Ahora cada rol pide su
// propio endpoint, ya agregado y acotado en el backend.

export function obtenerMetricasCoordinador(): Promise<MetricasResponse> {
  return api.get<MetricasResponse>('/metricas/coordinador');
}

export function obtenerMetricasLider(): Promise<MetricasResponse> {
  return api.get<MetricasResponse>('/metricas/lider');
}

export function obtenerMetricasDesarrollador(): Promise<MetricasResponse> {
  return api.get<MetricasResponse>('/metricas/desarrollador');
}
