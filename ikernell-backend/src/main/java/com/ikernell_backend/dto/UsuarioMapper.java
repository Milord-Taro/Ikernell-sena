package com.ikernell_backend.dto;

import com.ikernell_backend.entity.Usuario;
import com.ikernell_backend.entity.Rol;
import com.ikernell_backend.entity.Profesion;
import com.ikernell_backend.entity.Especialidad;

public final class UsuarioMapper {

    private UsuarioMapper() {
    }

    public static UsuarioResponse toResponse(Usuario usuario) {

        UsuarioResponse response = new UsuarioResponse();

        llenarBase(response, usuario);

        return response;
    }

    public static LoginResponse toLoginResponse(Usuario usuario) {

        LoginResponse response = new LoginResponse();

        llenarBase(response, usuario);

        return response;
    }

    public static Usuario toEntity(UsuarioRequest request) {

        Usuario usuario = new Usuario();

        llenarDesdeRequest(usuario, request);
        usuario.setCorreoElectronico(request.getCorreoElectronico());
        usuario.setContrasena(request.getContrasena());

        return usuario;
    }

    public static void actualizarEntity(
            Usuario usuario,
            UsuarioRequest request) {

        llenarDesdeRequest(usuario, request);

        if (request.getEstado() != null) {
            usuario.setEstado(request.getEstado());
        }
    }

    private static void llenarDesdeRequest(
            Usuario usuario,
            UsuarioRequest request) {

        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setFechaNacimiento(request.getFechaNacimiento());
        usuario.setTipoIdentificacion(request.getTipoIdentificacion());
        usuario.setNumeroIdentificacion(request.getNumeroIdentificacion());
        usuario.setDireccion(request.getDireccion());
        usuario.setFotoPerfil(request.getFotoPerfil());

        Rol rol = new Rol();
        rol.setIdRol(request.getIdRol());
        usuario.setRol(rol);

        Profesion profesion = new Profesion();
        profesion.setIdProfesion(request.getIdProfesion());
        usuario.setProfesion(profesion);

        if (request.getIdEspecialidad() == null) {
            usuario.setEspecialidad(null);
        } else {
            Especialidad especialidad = new Especialidad();
            especialidad.setIdEspecialidad(request.getIdEspecialidad());
            usuario.setEspecialidad(especialidad);
        }
    }

    private static void llenarBase(
            UsuarioResponse response,
            Usuario usuario) {

        response.setIdUsuario(usuario.getIdUsuario());
        response.setCodUsuario(usuario.getCodUsuario());
        response.setNombre(usuario.getNombre());
        response.setApellido(usuario.getApellido());
        response.setFechaNacimiento(usuario.getFechaNacimiento());
        response.setTipoIdentificacion(usuario.getTipoIdentificacion());
        response.setNumeroIdentificacion(usuario.getNumeroIdentificacion());
        response.setCorreoElectronico(usuario.getCorreoElectronico());
        response.setDireccion(usuario.getDireccion());
        response.setFotoPerfil(usuario.getFotoPerfil());
        response.setEstado(usuario.getEstado());
        response.setRol(usuario.getRol());
        response.setProfesion(usuario.getProfesion());
        response.setEspecialidad(usuario.getEspecialidad());
    }
}
