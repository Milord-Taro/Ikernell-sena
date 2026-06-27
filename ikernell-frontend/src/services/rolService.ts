import type { Rol } from "../types/Rol";
import { apiRequest } from "./apiConfig";

export async function obtenerRoles(): Promise<Rol[]> {

    return apiRequest<Rol[]>("/api/roles");
}
