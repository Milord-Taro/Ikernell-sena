import { api, borrarToken, guardarToken, obtenerToken, guardarExpiracion } from './api';
import type { LoginRequest, LoginResponse } from '../types/auth';

export async function iniciarSesion(request: LoginRequest): Promise<LoginResponse> {
  const respuesta = await api.post<LoginResponse>('/auth/login', request);
  guardarToken(respuesta.token);
  guardarExpiracion(respuesta.expiraEnMs);
  window.dispatchEvent(new Event('ikernell-auth-change'));
  return respuesta;
}

/**
 * NUEVO: lo usa SessionExpiryModal cuando el usuario presiona "Seguir
 * usando la app". No dispara 'ikernell-auth-change' -- el usuario ya
 * está autenticado, solo se está renovando el token; no hace falta que
 * AuthContext vuelva a cargar el perfil completo.
 */
export async function refrescarSesion(): Promise<LoginResponse> {
  const respuesta = await api.post<LoginResponse>('/auth/refrescar');
  guardarToken(respuesta.token);
  guardarExpiracion(respuesta.expiraEnMs);
  return respuesta;
}

export function cerrarSesion(): void {
  borrarToken();
  window.dispatchEvent(new Event('ikernell-auth-change'));
}

export function haySesionActiva(): boolean {
  return Boolean(obtenerToken());
}

/**
 * SIMULADO (caso de estudio, sin proveedor de correo real detrás): el
 * backend devuelve el código directamente en la respuesta en vez de
 * enviarlo por correo -- ver comentario en AuthController.java. Puede
 * venir `null` si el correo no existe.
 */
export function solicitarRecuperacionContrasena(correoElectronico: string): Promise<string | null> {
  return api.post<string | null>('/auth/recuperar-contrasena', { correoElectronico });
}

export function restablecerContrasena(token: string, nuevaContrasena: string): Promise<void> {
  return api.post<void>('/auth/restablecer-contrasena', { token, nuevaContrasena });
}
