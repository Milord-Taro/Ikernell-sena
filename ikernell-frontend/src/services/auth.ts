import { api, borrarToken, guardarToken, obtenerToken } from './api';
import type { LoginRequest, LoginResponse } from '../types/auth';

export async function iniciarSesion(request: LoginRequest): Promise<LoginResponse> {
  const respuesta = await api.post<LoginResponse>('/auth/login', request);
  guardarToken(respuesta.token);
  window.dispatchEvent(new Event('ikernell-auth-change'));
  return respuesta;
}

export function cerrarSesion(): void {
  borrarToken();
  window.dispatchEvent(new Event('ikernell-auth-change'));
}

export function haySesionActiva(): boolean {
  return Boolean(obtenerToken());
}
