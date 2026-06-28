import { apiRequest } from "./apiConfig";
import type { AsignacionProyecto } from "../types/AsignacionProyecto";

export async function obtenerAsignacionesProyecto() {
  return apiRequest<AsignacionProyecto[]>("/api/asignacionproyectos");
}
