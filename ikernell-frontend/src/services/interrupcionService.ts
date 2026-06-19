const API_URL =
  "http://localhost:8080/api/interrupciones";

export async function obtenerInterrupciones() {
  const response =
    await fetch(API_URL);

  return response.json();
}

export async function crearInterrupcion(
  interrupcion: any
) {
  const response = await fetch(
    API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interrupcion),
    }
  );

  return response.json();
}

export async function obtenerInterrupcionesPorEtapa(
  idEtapa: number
) {
  const response = await fetch(
    `http://localhost:8080/api/etapas/${idEtapa}/interrupciones`
  );

  return response.json();
}

export async function eliminarInterrupcion(
  id: number
) {
  await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );
}
