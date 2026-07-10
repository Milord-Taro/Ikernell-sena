// Refleja los DTOs *Response del backend. Se amplía en cada Fase según
// se vayan necesitando más entidades (Proyecto, Actividad, etc.).

export type TipoIdentificacion = 'CC' | 'CE' | 'TI';

export interface RolResponse {
  idRol: number;
  codigoRol: string;
  nombreRol: string;
  descripcion: string | null;
  activo: boolean;
  fechaCreacion: string;
}

export interface ProfesionResponse {
  idProfesion: number;
  codigoProfesion: string;
  nombreProfesion: string;
  descripcion: string | null;
  activo: boolean;
  fechaCreacion: string;
}

export interface EspecialidadResponse {
  idEspecialidad: number;
  codigoEspecialidad: string;
  nombreEspecialidad: string;
  descripcion: string | null;
  activo: boolean;
  fechaCreacion: string;
}

export interface TipoErrorResponse {
  idTipoError: number;
  codigoTipoError: string;
  nombreTipoError: string;
  descripcion: string | null;
  activo: boolean;
  fechaCreacion: string;
}

export interface TipoInterrupcionResponse {
  idTipoInterrupcion: number;
  codigoTipoInterrupcion: string;
  nombreTipoInterrupcion: string;
  descripcion: string | null;
  activo: boolean;
  fechaCreacion: string;
}

export interface UsuarioResponse {
  idUsuario: number;
  codigoUsuario: string;
  nombres: string;
  apellidos: string;
  tipoIdentificacion: TipoIdentificacion;
  numeroIdentificacion: string;
  fechaNacimiento: string;
  correoElectronico: string;
  ciudad: string;
  rol: RolResponse;
  profesion: ProfesionResponse;
  especialidad: EspecialidadResponse;
  activo: boolean;
  fechaCreacion: string;
}

/**
 * Creación (Coordinador): incluye correo y contraseña, ninguno de los
 * dos editable después -- coincide con UsuarioRequest.java del backend.
 */
export interface UsuarioRequest {
  codigoUsuario: string;
  nombres: string;
  apellidos: string;
  tipoIdentificacion: TipoIdentificacion;
  numeroIdentificacion: string;
  fechaNacimiento: string;
  correoElectronico: string;
  contrasena: string;
  ciudad: string;
  idRol: number;
  idProfesion: number;
  idEspecialidad: number;
}

/**
 * Edición (Coordinador): SIN correo ni contraseña -- coincide con
 * UsuarioUpdateRequest.java del backend (correo inmutable, contraseña
 * solo se cambia por el propio usuario vía /me/contrasena).
 */
export interface UsuarioUpdateRequest {
  codigoUsuario: string;
  nombres: string;
  apellidos: string;
  tipoIdentificacion: TipoIdentificacion;
  numeroIdentificacion: string;
  fechaNacimiento: string;
  ciudad: string;
  idRol: number;
  idProfesion: number;
  idEspecialidad: number;
}

// Códigos reales de RolConstantes.java -- usar estas constantes en vez de
// strings sueltos al comparar rol.codigoRol en el frontend.
export const CODIGO_ROL = {
  COORDINADOR: 'ROL-001',
  LIDER_PROYECTO: 'ROL-002',
  DESARROLLADOR: 'ROL-003',
} as const;
