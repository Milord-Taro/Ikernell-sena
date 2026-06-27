const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

export async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(apiUrl(path), options);

  if (!response.ok) {
    const mensaje = await response.text();

    throw new Error(mensaje || `Error HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const texto = await response.text();

  return texto ? JSON.parse(texto) : (undefined as T);
}
