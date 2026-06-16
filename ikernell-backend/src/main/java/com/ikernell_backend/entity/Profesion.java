package com.ikernell_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "profesion")
public class Profesion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idprofesion")
    private Integer idProfesion;

    @Column(name = "codprofesion")
    private String codProfesion;

    @Column(name = "nombreprofesion")
    private String nombreProfesion;

    public Profesion() {
    }

    public Integer getIdProfesion() {
        return idProfesion;
    }

    public void setIdProfesion(Integer idProfesion) {
        this.idProfesion = idProfesion;
    }

    public String getCodProfesion() {
        return codProfesion;
    }

    public void setCodProfesion(String codProfesion) {
        this.codProfesion = codProfesion;
    }

    public String getNombreProfesion() {
        return nombreProfesion;
    }

    public void setNombreProfesion(String nombreProfesion) {
        this.nombreProfesion = nombreProfesion;
    }
}