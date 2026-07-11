import { api } from './api';
import type { TrazabilidadResponse } from '../types/trazabilidad';

export function listarTrazabilidad(entidad?: string): Promise<TrazabilidadResponse[]> {
  return api.get<TrazabilidadResponse[]>(
    entidad ? `/trazabilidad?entidad=${encodeURIComponent(entidad)}` : '/trazabilidad',
  );
}
