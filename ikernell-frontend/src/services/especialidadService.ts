import type { Especialidad }
    from "../types/Especialidad";

const API_URL =
    "http://localhost:8080/api/especialidades";

export async function obtenerEspecialidades()
    : Promise<Especialidad[]> {

    const response =
        await fetch(API_URL);

    return response.json();
}