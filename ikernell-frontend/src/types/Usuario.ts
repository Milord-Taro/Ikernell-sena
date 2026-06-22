export interface Usuario {

  idUsuario: number;

  codUsuario: string;

  nombre: string;

  apellido: string;

  correoElectronico: string;

  direccion: string;

  fechaNacimiento: string;

  tipoIdentificacion: string;

  numeroIdentificacion: string;

  fotoPerfil: string | null;

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