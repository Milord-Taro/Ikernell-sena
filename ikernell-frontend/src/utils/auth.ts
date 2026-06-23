export function obtenerUsuarioLogueado() {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    return null;
  }

  return JSON.parse(usuario);
}

export function obtenerIdUsuario() {
  const usuario = obtenerUsuarioLogueado();

  return usuario?.idUsuario;
}

export function cerrarSesion() {
  localStorage.removeItem("usuario");
}
