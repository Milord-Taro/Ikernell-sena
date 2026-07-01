import type { Usuario } from "../types/Usuario";

export function obtenerUsuarioLogueado(): Usuario | null {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    return null;
  }

  return JSON.parse(usuario) as Usuario;
}

export function obtenerRolUsuario() {

  const usuario = obtenerUsuarioLogueado();

  return usuario?.rol?.nombreRol;

}

export function obtenerIdUsuario() {
  const usuario = obtenerUsuarioLogueado();

  return usuario?.idUsuario;
}

export function cerrarSesion() {
  localStorage.removeItem("usuario");
}
