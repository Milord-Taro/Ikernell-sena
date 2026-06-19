import type { Proyecto } from "./Proyecto";

export interface Etapa {
  idEtapa: number;
  codEtapa: string;
  nombreEtapa: string;
  descripcionEtapa: string;
  fechaEtapa: string;

  proyecto: Proyecto;
}