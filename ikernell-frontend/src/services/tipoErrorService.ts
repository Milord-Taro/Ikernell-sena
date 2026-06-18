const API_URL =
  "http://localhost:8080/api/tipoerrores";

export async function obtenerTiposError() {

  const response =
    await fetch(API_URL);

  return response.json();
}

export async function eliminarTipoError(
  id: number
) {

  await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );
}