import { api } from './api';
import type { RolResponse, ProfesionResponse, EspecialidadResponse } from '../types/usuario';
import type { RolRequest, ProfesionRequest, EspecialidadRequest } from '../types/catalogo';

export interface ServicioCatalogo<TResponse, TRequest> {
  listar: () => Promise<TResponse[]>;
  crear: (request: TRequest) => Promise<TResponse>;
  actualizar: (id: number, request: TRequest) => Promise<TResponse>;
  cambiarEstado: (id: number, activo: boolean) => Promise<TResponse>;
}

/**
 * Los 3 catálogos (Rol, Profesión, Especialidad) comparten exactamente el
 * mismo molde de endpoints en el backend (GET/POST/PUT/PATCH .../estado).
 * Esta fábrica evita repetir esas 4 llamadas fetch en 3 archivos distintos.
 */
function crearServicioCatalogo<TResponse, TRequest>(basePath: string): ServicioCatalogo<TResponse, TRequest> {
  return {
    listar: () => api.get<TResponse[]>(`/${basePath}`),
    crear: (request) => api.post<TResponse>(`/${basePath}`, request),
    actualizar: (id, request) => api.put<TResponse>(`/${basePath}/${id}`, request),
    cambiarEstado: (id, activo) => api.patch<TResponse>(`/${basePath}/${id}/estado?activo=${activo}`),
  };
}

export const rolesService = crearServicioCatalogo<RolResponse, RolRequest>('roles');
export const profesionesService = crearServicioCatalogo<ProfesionResponse, ProfesionRequest>('profesiones');
export const especialidadesService = crearServicioCatalogo<EspecialidadResponse, EspecialidadRequest>('especialidades');
