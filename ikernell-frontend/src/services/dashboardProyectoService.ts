import { obtenerEtapas } from "./etapaService";
import { obtenerActividades } from "./actividadService";
import { obtenerErroresPorEtapa } from "./registroErrorService";
import { obtenerInterrupcionesPorEtapa } from "./interrupcionService";

export async function obtenerResumenProyecto(
  idProyecto: number
) {
  const etapas = await obtenerEtapas();

  const etapasProyecto = etapas.filter(
    (etapa) =>
      etapa.proyecto?.idProyecto === idProyecto
  );

  const actividades = await obtenerActividades();

  const actividadesProyecto = actividades.filter(
    (actividad) =>
      etapasProyecto.some(
        (etapa) =>
          etapa.idEtapa ===
          actividad.etapa?.idEtapa
      )
  );

  let totalErrores = 0;
  let totalInterrupciones = 0;

  for (const etapa of etapasProyecto) {

    const errores =
      await obtenerErroresPorEtapa(
        etapa.idEtapa
      );

    totalErrores += errores.length;

    const interrupciones =
      await obtenerInterrupcionesPorEtapa(
        etapa.idEtapa
      );

    totalInterrupciones +=
      interrupciones.length;
  }


  return {
    etapas: etapasProyecto.length,
    actividades:
      actividadesProyecto.length,
    errores: totalErrores,
    interrupciones:
      totalInterrupciones,
    progreso: actividadesProyecto.length > 0
      ? Math.round(
        (actividadesProyecto.filter(
          (a) =>
            a.estadoActividad ===
            "Ejecutada"
        ).length /
          actividadesProyecto.length) *
        100
      )
      : 0,
  };
}