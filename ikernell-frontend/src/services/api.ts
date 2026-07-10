import type { ApiError, ApiResponse } from '../types/api';
import { ApiRequestError } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL as string;
const TOKEN_KEY = 'ikernell_token';
const SESION_EXPIRADA_KEY = 'ikernell_sesion_expirada';

if (!API_URL) {
  throw new Error(
    'VITE_API_URL no está definida. Crea un archivo .env en la raíz del ' +
      'proyecto con: VITE_API_URL=http://localhost:8080/api',
  );
}

export function obtenerToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function guardarToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function borrarToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = obtenerToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (response.status === 401) {
    // CORREGIDO: antes solo se limpiaba la sesión y se avisaba a
    // AuthContext, pero nadie le decía al usuario POR QUÉ desapareció su
    // sesión -- se sentía como "me sacó sin avisar". Ahora se deja una
    // marca en sessionStorage que la landing revisa al montar, para
    // mostrar un aviso explícito una sola vez.
    borrarToken();
    sessionStorage.setItem(SESION_EXPIRADA_KEY, '1');
    window.dispatchEvent(new Event('ikernell-unauthorized'));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiRequestError(body as ApiError);
  }

  return (body as ApiResponse<T>).data;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),

  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  put: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'PATCH',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

/** La landing (u otra pantalla pública) llama esto al montar para saber
 * si debe mostrar el aviso de "tu sesión expiró". Se borra la marca al
 * leerla, para que no vuelva a aparecer en visitas futuras. */
export function consumirAvisoSesionExpirada(): boolean {
  const habia = sessionStorage.getItem(SESION_EXPIRADA_KEY) === '1';
  if (habia) {
    sessionStorage.removeItem(SESION_EXPIRADA_KEY);
  }
  return habia;
}
