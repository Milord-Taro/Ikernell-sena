const API_URL =
  "http://localhost:8080/api/usuarios";

  export async function obtenerUsuarios() {

  const response =
    await fetch(API_URL);

  return response.json();
}

export async function inhabilitarUsuario(
  id: number
) {

  const response =
    await fetch(
      `${API_URL}/${id}/inhabilitar`,
      {
        method: "PUT",
      }
    );

  return response.json();
}