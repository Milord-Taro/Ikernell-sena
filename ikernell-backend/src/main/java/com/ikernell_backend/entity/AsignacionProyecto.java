package com.ikernell_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "asignacionproyecto")
public class AsignacionProyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idasignacion")
    private Integer idAsignacion;

    @Column(name = "fechaasignacion")
    private LocalDate fechaAsignacion;

    @Column(name = "estadoasignacion")
    private Boolean estadoAsignacion;

    @ManyToOne
    @JoinColumn(name = "idproyecto")
    private Proyecto proyecto;

    @ManyToOne
    @JoinColumn(name = "idusuario")
    private Usuario usuario;

    public AsignacionProyecto() {
    }

    public Integer getIdAsignacion() {
        return idAsignacion;
    }
    public void setIdAsignacion(Integer idAsignacion) {
        this.idAsignacion = idAsignacion;
    }
    public LocalDate getFechaAsignacion() {
        return fechaAsignacion;
    }
    public void setFechaAsignacion(LocalDate fechaAsignacion) {
        this.fechaAsignacion = fechaAsignacion;
    }
    public Boolean getEstadoAsignacion() {
        return estadoAsignacion;
    }
    public void setEstadoAsignacion(Boolean estadoAsignacion) {
        this.estadoAsignacion = estadoAsignacion;
    }
    public Proyecto getProyecto() {
        return proyecto;
    }
    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }
    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

}
