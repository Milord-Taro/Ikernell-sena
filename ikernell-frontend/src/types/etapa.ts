import type { ProyectoResponse } from './proyecto';

export type EstadoEtapa = 'Pendiente' | 'En ejecución' | 'Finalizada';

export const ESTADOS_ETAPA: EstadoEtapa[] = ['Pendiente', 'En ejecución', 'Finalizada'];

/**
 * CORREGIDO: el backend anida el proyecto completo (EtapaResponse.java
 * -> ProyectoResponse proyecto), no manda un idProyecto plano. Nada en
 * Fase 7 leía este campo directamente (EtapasList/EtapaFormModal reciben
 * idProyecto como prop del padre), así que el fix no rompe nada existente.
 */
export interface EtapaResponse {
  idEtapa: number;
  codigoEtapa: string;
  proyecto: ProyectoResponse;
  nombreEtapa: string;
  descripcion: string | null;
  orden: number;
  fechaInicio: string;
  fechaFin: string;
  estado: EstadoEtapa;
  fechaCreacion: string;
}

export interface EtapaRequest {
  codigoEtapa: string;
  idProyecto: number;
  nombreEtapa: string;
  descripcion?: string;
  orden: number;
  fechaInicio: string;
  fechaFin: string;
}
