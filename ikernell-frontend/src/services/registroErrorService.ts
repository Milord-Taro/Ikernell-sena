const API_URL = "http://localhost:8080/api/registroerrores";

export async function obtenerErrores() {
  const response = await fetch(API_URL);

  return response.json();
}

export async function eliminarError(id: number) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

export async function crearRegistroError(error: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(error),
  });

  return response.json();
}

export async function obtenerErroresPorEtapa(idEtapa: number) {
  const response = await fetch(
    `http://localhost:8080/api/etapas/${idEtapa}/errores`,
  );

  return response.json();
}

export async function obtenerErrorPorId(id: number) {
  const response = await fetch(`${API_URL}/${id}`);

  return response.json();
}

export async function actualizarRegistroError(id: number, error: any) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(error),
  });

  return response.json();
}
