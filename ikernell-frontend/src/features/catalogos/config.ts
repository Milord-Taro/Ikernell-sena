import type { RolResponse, ProfesionResponse, EspecialidadResponse } from '../../types/usuario';
import type { RolRequest, ProfesionRequest, EspecialidadRequest } from '../../types/catalogo';
import { rolesService, profesionesService, especialidadesService } from '../../services/catalogos';
import type { ServicioCatalogo } from '../../services/catalogos';

/** Forma genérica que usan la tabla y el formulario, sin importar los
 * nombres de campo reales de cada entidad en el backend.
 *
 * CORREGIDO: se agregó el índice `[key: string]: unknown` -- sin él,
 * TypeScript no la considera compatible con el constraint genérico
 * `Table<T extends Record<string, unknown>>`, y ese único error en
 * cascada hacía que TSC reportara como "no usadas" otras 4 variables que
 * sí se usan dentro del JSX de <Table>.
 */
export interface CatalogoItem {
  [key: string]: unknown;
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
}

export interface ValoresFormularioCatalogo {
  codigo: string;
  nombre: string;
  descripcion: string;
}

export interface CatalogoConfig<TResponse, TRequest> {
  tituloSingular: string;
  tituloPlural: string;
  servicio: ServicioCatalogo<TResponse, TRequest>;
  aItem: (response: TResponse) => CatalogoItem;
  aRequest: (valores: ValoresFormularioCatalogo) => TRequest;
}

export const configRoles: CatalogoConfig<RolResponse, RolRequest> = {
  tituloSingular: 'Rol',
  tituloPlural: 'Roles',
  servicio: rolesService,
  aItem: (r) => ({
    id: r.idRol,
    codigo: r.codigoRol,
    nombre: r.nombreRol,
    descripcion: r.descripcion,
    activo: r.activo,
  }),
  aRequest: (v) => ({
    codigoRol: v.codigo,
    nombreRol: v.nombre,
    descripcion: v.descripcion || undefined,
  }),
};

export const configProfesiones: CatalogoConfig<ProfesionResponse, ProfesionRequest> = {
  tituloSingular: 'Profesión',
  tituloPlural: 'Profesiones',
  servicio: profesionesService,
  aItem: (p) => ({
    id: p.idProfesion,
    codigo: p.codigoProfesion,
    nombre: p.nombreProfesion,
    descripcion: p.descripcion,
    activo: p.activo,
  }),
  aRequest: (v) => ({
    codigoProfesion: v.codigo,
    nombreProfesion: v.nombre,
    descripcion: v.descripcion || undefined,
  }),
};

export const configEspecialidades: CatalogoConfig<EspecialidadResponse, EspecialidadRequest> = {
  tituloSingular: 'Especialidad',
  tituloPlural: 'Especialidades',
  servicio: especialidadesService,
  aItem: (e) => ({
    id: e.idEspecialidad,
    codigo: e.codigoEspecialidad,
    nombre: e.nombreEspecialidad,
    descripcion: e.descripcion,
    activo: e.activo,
  }),
  aRequest: (v) => ({
    codigoEspecialidad: v.codigo,
    nombreEspecialidad: v.nombre,
    descripcion: v.descripcion || undefined,
  }),
};
