const API_URL =
  "http://localhost:8080/api/registroerrores";

  export async function obtenerErrores() {

  const response =
    await fetch(API_URL);

  return response.json();
}

export async function eliminarError(
  id: number
) {

  await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE"
    }
  );
}