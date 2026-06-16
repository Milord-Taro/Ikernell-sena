package com.ikernell_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "registroerror")
public class RegistroError {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iderror")
    private Integer idError;

    @Column(name = "coderror")
    private String codError;

    @Column(name = "descripcionerror")
    private String descripcionError;

    @Column(name = "fecharegistroerror")
    private LocalDate fechaRegistroError;

    @Column(name = "estadoerror")
    private String estadoError;

    @Column(name = "comentarioerror")
    private String comentarioError;

    @ManyToOne
    @JoinColumn(name = "idtipoerror")
    private TipoError tipoError;

    @ManyToOne
    @JoinColumn(name = "idetapa")
    private Etapa etapa;

    @ManyToOne
    @JoinColumn(name = "iddesarrollador")
    private Usuario desarrollador;

    public RegistroError() {
    }

    public Integer getIdError() {
        return idError;
    }
    public void setIdError(Integer idError) {
        this.idError = idError;
    }

    public String getCodError() {
        return codError;
    }
    public void setCodError(String codError) {
        this.codError = codError;
    }

    public String getDescripcionError() {
        return descripcionError;
    }
    public void setDescripcionError(String descripcionError) {
        this.descripcionError = descripcionError;
    }

    public LocalDate getFechaRegistroError() {
        return fechaRegistroError;
    }
    public void setFechaRegistroError(LocalDate fechaRegistroError) {
        this.fechaRegistroError = fechaRegistroError;
    }

    public String getEstadoError() {
        return estadoError;
    }
    public void setEstadoError(String estadoError) {
        this.estadoError = estadoError;
    }

    public String getComentarioError() {
        return comentarioError;
    }
    public void setComentarioError(String comentarioError) {
        this.comentarioError = comentarioError;
    }

    public TipoError getTipoError() {
        return tipoError;
    }
    public void setTipoError(TipoError tipoError) {
        this.tipoError = tipoError;
    }

    public Etapa getEtapa() {
        return etapa;
    }
    public void setEtapa(Etapa etapa) {
        this.etapa = etapa;
    }

    public Usuario getDesarrollador() {
        return desarrollador;
    }
    public void setDesarrollador(Usuario usuario) {
        this.desarrollador = desarrollador;
    }

}
