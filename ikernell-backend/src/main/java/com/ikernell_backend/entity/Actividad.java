package com.ikernell_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name =  "actividad")
public class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idactividad")
    private Integer idActividad;

    @Column(name = "codactividad")
    private String codActividad;

    @Column(name = "nombreactividad")
    private String nombreActividad;

    @Column(name = "descripcionactividad")
    private String descripcionActividad;

    @Column(name = "fechainicioactividad")
    private LocalDate fechaInicioActividad;

    @Column(name = "fechafinactividad")
    private LocalDate fechaFinActividad;

    @Column(name = "estadoactividad")
    private String estadoActividad;

    @Column(name = "fechaejecucionactividad")
    private LocalDate fechaEjecucionActividad;

    @ManyToOne
    @JoinColumn (name = "idetapa")
    private Etapa etapa;

    @ManyToOne
    @JoinColumn(name = "iddesarrollador")
    private Usuario desarrollador;

    public Actividad() {
    }

    public Integer getIdActividad() {
        return idActividad;
    }
    public void setIdActividad(Integer idActividad) {
        this.idActividad = idActividad;
    }

    public String getCodActividad() {
        return codActividad;
    }
    public void setCodActividad(String codActividad) {
        this.codActividad = codActividad;
    }

    public String getNombreActividad() {
        return nombreActividad;
    }
    public void setNombreActividad(String nombreActividad) {
        this.nombreActividad = nombreActividad;
    }

    public String getDescripcionActividad() {
        return descripcionActividad;
    }
    public void setDescripcionActividad(String descripcionActividad) {
        this.descripcionActividad = descripcionActividad;
    }

    public LocalDate getFechaInicioActividad() {
        return fechaInicioActividad;
    }
    public void setFechaInicioActividad(LocalDate fechainicioactividad) {
        this.fechaInicioActividad = fechainicioactividad;
    }

    public LocalDate getFechaFinActividad() {
        return fechaFinActividad;
    }
    public void setFechaFinActividad(LocalDate fechafinactividad) {
        this.fechaFinActividad = fechafinactividad;
    }

    public String getEstadoActividad() {
        return estadoActividad;
    }
    public void setEstadoActividad(String estadoActividad) {
        this.estadoActividad = estadoActividad;
    }

    public LocalDate getFechaEjecucionActividad() {
        return fechaEjecucionActividad;
    }
    public void setFechaEjecucionActividad(LocalDate fechaEjecucionActividad) {
        this.fechaEjecucionActividad = fechaEjecucionActividad;
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
    public void setDesarrollador(Usuario desarrollador) {
        this.desarrollador = desarrollador;
    }
}
