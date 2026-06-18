export interface Interrupcion {

  idInterrupcion: number;

  codInterrupcion: string;

  descripcionInterrupcion: string;

  fechaInterrupcion: string;

  duracionInterrupcion: number;

  desarrollador: {
    idUsuario: number;
    nombre: string;
    apellido: string;
  };

  etapa: {
    idEtapa: number;
    nombreEtapa: string;
  };

  tipoInterrupcion: {
    idTipoInterrupcion: number;
    nombreTipoInterrupcion: string;
  };
}