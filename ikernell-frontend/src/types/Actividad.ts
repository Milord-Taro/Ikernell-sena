export interface Actividad {
  idActividad: number;
  codActividad: string;
  nombreActividad: string;
  descripcionActividad: string;

  fechaInicioActividad: string;
  fechaFinActividad: string;
  fechaEjecucionActividad: string | null;

  estadoActividad: string;

  desarrollador?: {
    idUsuario: number;
    nombre: string;
    apellido: string;
  };

  etapa: {
    idEtapa: number;
    nombreEtapa: string;

    proyecto?: {
      idProyecto: number;
      nombreProyecto: string;
      lider?: {
        idUsuario: number;
        nombre: string;
        apellido: string;
      };
    };
  };
}
