export interface Usuario {

  idUsuario: number;

  codUsuario: string;

  nombre: string;

  apellido: string;

  correoElectronico: string;

  estado: boolean;

  rol: {
    idRol: number;
    nombreRol: string;
  };

  profesion: {
    idProfesion: number;
    nombreProfesion: string;
  };

  especialidad: {
    idEspecialidad: number;
    nombreEspecialidad: string;
  } | null;
}