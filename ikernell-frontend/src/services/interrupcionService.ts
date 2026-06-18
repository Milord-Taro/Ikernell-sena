const API_URL =
  "http://localhost:8080/api/interrupciones";

export async function obtenerInterrupciones() {

  const response =
    await fetch(API_URL);

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