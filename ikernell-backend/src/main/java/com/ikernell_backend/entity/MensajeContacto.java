package com.ikernell_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mensajecontacto")
public class MensajeContacto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idmensaje")
    private Integer idMensaje;

    @Column(name = "codmensaje")
    private String codMensaje;

    @Column(name = "nombreremitente")
    private String nombreRemitente;

    @Column(name = "correoremitente")
    private String correoRemitente;

    @Column(name = "mensaje")
    private String mensaje;

    @Column(name = "fechaenvio")
    private LocalDateTime fechaEnvio;

    @Column(name = "estadomensaje")
    private String estadoMensaje;

    @Column(name = "respuesta")
    private String respuesta;

    @Column(name = "fecharespuesta")
    private LocalDateTime fechaRespuesta;

    @ManyToOne
    @JoinColumn(name = "idresponsable")
    private Usuario responsable;

    public MensajeContacto() {
    }

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

    public Usuario getResponsable() {
        return responsable;
    }
    public void setResponsable(Usuario responsable) {
        this.responsable = responsable;
    }
}
