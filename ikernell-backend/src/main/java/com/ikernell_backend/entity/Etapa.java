package com.ikernell_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "etapa")
public class Etapa {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "idetapa")
    private Integer idEtapa;

    @Column(name = "codetapa")
    private String codEtapa;

    @Column(name = "nombreetapa")
    private String nombreEtapa;

    @Column(name = "descripcionetapa")
    private String descripcionEtapa;

    @Column(name = "fechaetapa")
    private LocalDate fechaEtapa;

    @ManyToOne
    @JoinColumn(name = "idproyecto")
    private Proyecto proyecto;

    public Etapa() {
    }

    public Integer getIdEtapa() {
        return idEtapa;
    }
    public void setIdEtapa(Integer idEtapa) {
        this.idEtapa = idEtapa;
    }

    public String getCodEtapa() {
        return codEtapa;
    }
    public void setCodEtapa(String codetapa) {
        this.codEtapa = codetapa;
    }

    public String getNombreEtapa() {
        return nombreEtapa;
    }
    public void setNombreEtapa(String nombreEtapa) {
        this.nombreEtapa = nombreEtapa;
    }

    public String getDescripcionEtapa() {
        return descripcionEtapa;
    }
    public void setDescripcionEtapa(String descripcionEtapa) {
        this.descripcionEtapa = descripcionEtapa;
    }

    public LocalDate getFechaEtapa() {
        return fechaEtapa;
    }
    public void setFechaEtapa(LocalDate fechaetapa) {
        this.fechaEtapa = fechaetapa;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }
    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }
}
