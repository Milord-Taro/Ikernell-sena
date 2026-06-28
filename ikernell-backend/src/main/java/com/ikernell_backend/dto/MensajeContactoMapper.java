package com.ikernell_backend.dto;

import com.ikernell_backend.entity.MensajeContacto;

public final class MensajeContactoMapper {

    private MensajeContactoMapper() {
    }

    public static MensajeContactoResponse toResponse(
            MensajeContacto mensaje) {

        MensajeContactoResponse response =
                new MensajeContactoResponse();

        response.setIdMensaje(mensaje.getIdMensaje());
        response.setCodMensaje(mensaje.getCodMensaje());
        response.setNombreRemitente(mensaje.getNombreRemitente());
        response.setCorreoRemitente(mensaje.getCorreoRemitente());
        response.setMensaje(mensaje.getMensaje());
        response.setFechaEnvio(mensaje.getFechaEnvio());
        response.setEstadoMensaje(mensaje.getEstadoMensaje());
        response.setRespuesta(mensaje.getRespuesta());
        response.setFechaRespuesta(mensaje.getFechaRespuesta());

        if (mensaje.getResponsable() != null) {
            response.setResponsable(
                    UsuarioMapper.toResponse(
                            mensaje.getResponsable()));
        }

        return response;
    }

    public static MensajeContacto toEntity(
            MensajeContactoRequest request) {

        MensajeContacto mensaje = new MensajeContacto();

        actualizarEntity(mensaje, request);

        return mensaje;
    }

    public static void actualizarEntity(
            MensajeContacto mensaje,
            MensajeContactoRequest request) {

        mensaje.setNombreRemitente(request.getNombreRemitente());
        mensaje.setCorreoRemitente(request.getCorreoRemitente());
        mensaje.setMensaje(request.getMensaje());
    }
}
