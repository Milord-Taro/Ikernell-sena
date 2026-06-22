import type { Rol } from "../types/Rol";

const API_URL =
    "http://localhost:8080/api/roles";

export async function obtenerRoles(): Promise<Rol[]> {

    const response =
        await fetch(API_URL);

    return response.json();
}