const API_URL =
  "http://localhost:8080/api/tipointerrupciones";

export async function obtenerTiposInterrupcion() {

  const response =
    await fetch(API_URL);

  return response.json();
}

export async function eliminarTipoInterrupcion(
  id: number
) {

  await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );
}