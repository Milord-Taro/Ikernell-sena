import type { Proyecto } from "./Proyecto";
import type { Usuario } from "./Usuario";

export interface AsignacionProyecto {
  idAsignacion: number;
  fechaAsignacion: string;
  estadoAsignacion: boolean;
  proyecto: Proyecto;
  usuario: Usuario;
}
