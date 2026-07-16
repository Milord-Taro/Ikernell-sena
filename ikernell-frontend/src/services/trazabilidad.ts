import { api } from './api';
import type { TrazabilidadResponse } from '../types/trazabilidad';
import type { PaginaResponse } from '../types/api';

export function listarTrazabilidad(
  entidad?: string,
  pagina = 0,
  tamano = 20,
): Promise<PaginaResponse<TrazabilidadResponse>> {
  const params = new URLSearchParams({ pagina: String(pagina), tamano: String(tamano) });
  if (entidad) params.set('entidad', entidad);
  return api.get<PaginaResponse<TrazabilidadResponse>>(`/trazabilidad?${params.toString()}`);
}
