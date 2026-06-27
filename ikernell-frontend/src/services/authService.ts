import { apiRequest } from "./apiConfig";

export async function login(correo: string, contrasena: string) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo,
      contrasena,
    }),
  });
}
