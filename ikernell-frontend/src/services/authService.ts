import { apiRequest } from "./apiConfig";
import type { Usuario } from "../types/Usuario";

export async function login(
  correo: string,
  contrasena: string,
): Promise<Usuario> {
  return apiRequest<Usuario>("/api/auth/login", {
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
