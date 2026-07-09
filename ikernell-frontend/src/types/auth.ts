import type { UsuarioResponse } from './usuario';

export interface LoginRequest {
  correoElectronico: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
  tipoToken: string;
  expiraEnMs: number;
  usuario: UsuarioResponse;
}

export interface CambiarContrasenaRequest {
  contrasenaActual: string;
  contrasenaNueva: string;
}
