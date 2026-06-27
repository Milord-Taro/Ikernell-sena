package com.ikernell_backend.dto;

import java.time.LocalDateTime;

public class MensajeContactoResponse {

    private Integer idMensaje;
    private String codMensaje;
    private String nombreRemitente;
    private String correoRemitente;
    private String mensaje;
    private LocalDateTime fechaEnvio;
    private String estadoMensaje;
    private String respuesta;
    private LocalDateTime fechaRespuesta;
    private UsuarioResponse responsable;

    public Integer getIdMensaje() {
        return idMensaje;
    }

    public void setIdMensaje(Integer idMensaje) {
        this.idMensaje = idMensaje;
    }

    public String getCodMensaje() {
        return codMensaje;
    }

    public void setCodMensaje(String codMensaje) {
        this.codMensaje = codMensaje;
    }

    public String getNombreRemitente() {
        return nombreRemitente;
    }

    public void setNombreRemitente(String nombreRemitente) {
        this.nombreRemitente = nombreRemitente;
    }

    public String getCorreoRemitente() {
        return correoRemitente;
    }

    public void setCorreoRemitente(String correoRemitente) {
        this.correoRemitente = correoRemitente;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public LocalDateTime getFechaEnvio() {
        return fechaEnvio;
    }

    public void setFechaEnvio(LocalDateTime fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
    }

    public String getEstadoMensaje() {
        return estadoMensaje;
    }

    public void setEstadoMensaje(String estadoMensaje) {
        this.estadoMensaje = estadoMensaje;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    public LocalDateTime getFechaRespuesta() {
        return fechaRespuesta;
    }

    public void setFechaRespuesta(LocalDateTime fechaRespuesta) {
        this.fechaRespuesta = fechaRespuesta;
    }

    public UsuarioResponse getResponsable() {
        return responsable;
    }

    public void setResponsable(UsuarioResponse responsable) {
        this.responsable = responsable;
    }
}
