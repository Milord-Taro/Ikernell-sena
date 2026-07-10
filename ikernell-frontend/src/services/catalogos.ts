import { api } from './api';
import type {
  RolResponse, ProfesionResponse, EspecialidadResponse,
  TipoErrorResponse, TipoInterrupcionResponse,
} from '../types/usuario';
import type {
  RolRequest, ProfesionRequest, EspecialidadRequest,
  TipoErrorRequest, TipoInterrupcionRequest,
} from '../types/catalogo';

export interface ServicioCatalogo<TResponse, TRequest> {
  listar: () => Promise<TResponse[]>;
  crear: (request: TRequest) => Promise<TResponse>;
  actualizar: (id: number, request: TRequest) => Promise<TResponse>;
  cambiarEstado: (id: number, activo: boolean) => Promise<TResponse>;
  eliminar: (id: number) => Promise<void>;
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
    // NUEVO: el backend ya lo soportaba desde hace varias fases (protegido
    // por ON DELETE RESTRICT) -- solo faltaba conectarlo del lado frontend.
    eliminar: (id) => api.delete<void>(`/${basePath}/${id}`),
  };
}

export const rolesService = crearServicioCatalogo<RolResponse, RolRequest>('roles');
export const profesionesService = crearServicioCatalogo<ProfesionResponse, ProfesionRequest>('profesiones');
export const especialidadesService = crearServicioCatalogo<EspecialidadResponse, EspecialidadRequest>('especialidades');

// NUEVO (Fase 9): mismo molde de endpoints (GET/POST/PUT/PATCH .../estado)
// que los otros 3 catálogos -- el backend solo difiere en que el GET es
// abierto a cualquier autenticado (Desarrollador los necesita para
// registrar errores/interrupciones), no solo Coordinador.
export const tiposErrorService = crearServicioCatalogo<TipoErrorResponse, TipoErrorRequest>('tipos-error');
export const tiposInterrupcionService = crearServicioCatalogo<TipoInterrupcionResponse, TipoInterrupcionRequest>('tipos-interrupcion');
