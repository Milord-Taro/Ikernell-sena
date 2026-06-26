import { obtenerEtapas } from "./etapaService";
import { obtenerErroresPorEtapa } from "./registroErrorService";
import { obtenerInterrupcionesPorEtapa } from "./interrupcionService";
import type { RegistroError } from "../types/RegistroError";
import type { Interrupcion } from "../types/Interrupcion";

export async function obtenerErroresProyecto(
  idProyecto: number,
): Promise<RegistroError[]> {
  const etapas = await obtenerEtapas();

  const etapasProyecto = etapas.filter(
    (e) => e.proyecto?.idProyecto === idProyecto,
  );

  let errores: RegistroError[] = [];

  for (const etapa of etapasProyecto) {
    const registros = await obtenerErroresPorEtapa(etapa.idEtapa);

    errores = [...errores, ...registros];
  }
  errores.sort(
    (a, b) =>
      new Date(b.fechaRegistroError).getTime() -
      new Date(a.fechaRegistroError).getTime(),
  );
  return errores;
}

export async function obtenerInterrupcionesProyecto(
  idProyecto: number,
): Promise<Interrupcion[]> {
  const etapas = await obtenerEtapas();

  const etapasProyecto = etapas.filter(
    (e) => e.proyecto?.idProyecto === idProyecto,
  );

  let interrupciones: Interrupcion[] = [];

  for (const etapa of etapasProyecto) {
    const registros = await obtenerInterrupcionesPorEtapa(etapa.idEtapa);

    interrupciones = [...interrupciones, ...registros];
  }
  interrupciones.sort(
    (a, b) =>
      new Date(b.fechaInterrupcion).getTime() -
      new Date(a.fechaInterrupcion).getTime(),
  );
  return interrupciones;
}
