export interface RolRequest {
  codigoRol: string;
  nombreRol: string;
  descripcion?: string;
}

export interface ProfesionRequest {
  codigoProfesion: string;
  nombreProfesion: string;
  descripcion?: string;
}

export interface EspecialidadRequest {
  codigoEspecialidad: string;
  nombreEspecialidad: string;
  descripcion?: string;
}

export interface TipoErrorRequest {
  codigoTipoError: string;
  nombreTipoError: string;
  descripcion?: string;
}

export interface TipoInterrupcionRequest {
  codigoTipoInterrupcion: string;
  nombreTipoInterrupcion: string;
  descripcion?: string;
}

