const API_URL = "http://localhost:8080/api/tipoerrores";

export async function obtenerTiposError() {
  const response = await fetch(API_URL);

  return response.json();
}

export async function obtenerTipoErrorPorId(id: number) {
  const response = await fetch(`${API_URL}/${id}`);

  return response.json();
}

export async function crearTipoError(tipoError: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipoError),
  });

  return response.json();
}

export async function actualizarTipoError(id: number, tipoError: any) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipoError),
  });

  return response.json();
}

export async function eliminarTipoError(id: number) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
