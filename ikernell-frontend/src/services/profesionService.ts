import type { Profesion }
    from "../types/Profesion";

const API_URL =
    "http://localhost:8080/api/profesiones";

export async function obtenerProfesiones()
    : Promise<Profesion[]> {

    const response =
        await fetch(API_URL);

    return response.json();
}