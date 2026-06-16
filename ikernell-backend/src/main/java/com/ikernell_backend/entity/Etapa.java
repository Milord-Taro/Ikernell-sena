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
    private String codetapa;

    @Column(name = "nombreetapa")
    private String nombreetapa;

    @Column(name = "descripcionetapa")
    private String descripcionetapa;

    @Column(name = "fechaetapa")
    private LocalDate fechaetapa;

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

    public String getCodetapa() {
        return codetapa;
    }
    public void setCodetapa(String codetapa) {
        this.codetapa = codetapa;
    }

    public String getNombreetapa() {
        return nombreetapa;
    }
    public void setNombreetapa(String nombreetapa) {
        this.nombreetapa = nombreetapa;
    }

    public String getDescripcionetapa() {
        return descripcionetapa;
    }
    public void setDescripcionetapa(String descripcionetapa) {
        this.descripcionetapa = descripcionetapa;
    }

    public LocalDate getFechaetapa() {
        return fechaetapa;
    }
    public void setFechaetapa(LocalDate fechaetapa) {
        this.fechaetapa = fechaetapa;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }
    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }
}
