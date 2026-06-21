import { obtenerActividadesPorEtapa } from "./actividadService";
import type { Actividad } from "../types/Actividad";

export async function obtenerResumenEtapa(
    idEtapa: number
) {
    const actividades =
        await obtenerActividadesPorEtapa(idEtapa);

    const ejecutadas =
        actividades.filter(
            (a: Actividad) =>
                a.estadoActividad === "Ejecutada"
        ).length;

    const pendientes =
        actividades.length - ejecutadas;

    const progreso =
        actividades.length > 0
            ? Math.round(
                (ejecutadas / actividades.length) * 100
            )
            : 0;

    return {
        total: actividades.length,
        ejecutadas,
        pendientes,
        progreso,
    };
}