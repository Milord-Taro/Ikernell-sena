package com.ikernell_backend.dto;

import com.ikernell_backend.entity.Usuario;

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
