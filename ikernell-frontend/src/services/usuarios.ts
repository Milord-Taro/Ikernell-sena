import { api } from './api';
import type { UsuarioResponse } from '../types/usuario';

export function obtenerMiPerfil(): Promise<UsuarioResponse> {
  return api.get<UsuarioResponse>('/usuarios/me');
}
