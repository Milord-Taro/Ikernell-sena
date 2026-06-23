const API_URL = "http://localhost:8080/api/auth";

export async function login(correo: string, contrasena: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo,
      contrasena,
    }),
  });

  return response.json();
}
