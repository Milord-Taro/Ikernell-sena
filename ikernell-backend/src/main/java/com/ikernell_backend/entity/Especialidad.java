package com.ikernell_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "especialidad")
public class Especialidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idespecialidad")
    private Integer idEspecialidad;

    @Column(name = "codespecialidad")
    private String codEspecialidad;

    @Column(name = "nombreespecialidad")
    private String nombreEspecialidad;

    public Especialidad() {
    }

    public Integer getIdEspecialidad() {
        return idEspecialidad;
    }
    public void setIdEspecialidad(Integer idEspecialidad) {
        this.idEspecialidad = idEspecialidad;
    }

    public String getCodEspecialidad() {
        return codEspecialidad;
    }
    public void setCodEspecialidad(String codEspecialidad) {
        this.codEspecialidad = codEspecialidad;
    }

    public String getNombreEspecialidad() {
        return nombreEspecialidad;
    }
    public void setNombreEspecialidad(String nombreEspecialidad) {
        this.nombreEspecialidad = nombreEspecialidad;
    }
}