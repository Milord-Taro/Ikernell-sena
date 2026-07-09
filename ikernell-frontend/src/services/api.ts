import type { ApiError, ApiResponse } from '../types/api';
import { ApiRequestError } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL as string;
const TOKEN_KEY = 'ikernell_token';

if (!API_URL) {
  // Falla rápido y claro en vez de que cada request falle con un error
  // críptico de "fetch failed" contra "undefined/api/...".
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

  // 401: el token expiró o es inválido. Se limpia y se avisa a toda la
  // app (ej. para redirigir a login) sin que cada llamada tenga que
  // manejarlo por separado.
  if (response.status === 401) {
    borrarToken();
    window.dispatchEvent(new Event('ikernell-unauthorized'));
  }

  // 204 No Content no trae body -- evita intentar parsear JSON vacío.
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
