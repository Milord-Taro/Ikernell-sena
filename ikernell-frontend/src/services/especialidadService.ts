import type { Especialidad }
    from "../types/Especialidad";
import { apiRequest } from "./apiConfig";

export async function obtenerEspecialidades()
    : Promise<Especialidad[]> {

    return apiRequest<Especialidad[]>("/api/especialidades");
}
