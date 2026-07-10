import { api } from './api';
import type { UsuarioResponse, UsuarioRequest, UsuarioUpdateRequest } from '../types/usuario';
import type { CambiarContrasenaRequest } from '../types/auth';

export function obtenerMiPerfil(): Promise<UsuarioResponse> {
  return api.get<UsuarioResponse>('/usuarios/me');
}

export function listarUsuarios(): Promise<UsuarioResponse[]> {
  return api.get<UsuarioResponse[]>('/usuarios');
}

export function obtenerUsuarioPorId(idUsuario: number): Promise<UsuarioResponse> {
  return api.get<UsuarioResponse>(`/usuarios/${idUsuario}`);
}

export function crearUsuario(request: UsuarioRequest): Promise<UsuarioResponse> {
  return api.post<UsuarioResponse>('/usuarios', request);
}

export function actualizarUsuario(idUsuario: number, request: UsuarioUpdateRequest): Promise<UsuarioResponse> {
  return api.put<UsuarioResponse>(`/usuarios/${idUsuario}`, request);
}

export function cambiarEstadoUsuario(idUsuario: number, activo: boolean): Promise<UsuarioResponse> {
  return api.patch<UsuarioResponse>(`/usuarios/${idUsuario}/estado?activo=${activo}`);
}

// NUEVO (Fase 12): endpoint ya existía en el backend, sin usar en frontend.
export function cambiarMiContrasena(request: CambiarContrasenaRequest): Promise<void> {
  return api.patch<void>('/usuarios/me/contrasena', request);
}
