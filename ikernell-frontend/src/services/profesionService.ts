import type { Profesion }
    from "../types/Profesion";
import { apiRequest } from "./apiConfig";

export async function obtenerProfesiones()
    : Promise<Profesion[]> {

    return apiRequest<Profesion[]>("/api/profesiones");
}
