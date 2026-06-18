const API_URL =
  "http://localhost:8080/api/mensajes";

  export async function obtenerMensajes() {

  const response =
    await fetch(API_URL);

  return response.json();
}

export async function crearMensaje(
  mensaje: any
) {

  const response =
    await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body:
        JSON.stringify(mensaje),
    });

  return response.json();
}

export async function actualizarMensaje(
  id: number,
  mensaje: any
) {

  const response =
    await fetch(
      `${API_URL}/${id}`,
      {

        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(mensaje),
      }
    );

  return response.json();
}

export async function eliminarMensaje(
  id: number
) {

  await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );
}

export async function leerMensaje(
  id: number
) {

  const response =
    await fetch(
      `${API_URL}/${id}/leer`,
      {
        method: "PUT",
      }
    );

  return response.json();
}

export async function atenderMensaje(
  id: number,
  respuesta: string
) {

  const response =
    await fetch(
      `${API_URL}/${id}/atender`,
      {

        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          respuesta,
        }),
      }
    );

  return response.json();
}

export async function obtenerMensajePorId(
  id: number
) {

  const response =
    await fetch(
      `${API_URL}/${id}`
    );

  return response.json();
}
