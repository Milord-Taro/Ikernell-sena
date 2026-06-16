package com.ikernell_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idrol")
    private Integer idRol;

    @Column(name = "codrol")
    private String codRol;

    @Column(name = "nombrerol")
    private String nombreRol;

    @Column(name = "descripcionrol")
    private String descripcionRol;

    public Rol () {

    }

    public Integer getIdRol() {
        return idRol;
    }

    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
    }

    public String getCodRol() {
        return codRol;
    }

    public void setCodRol(String codRol) {
        this.codRol = codRol;
    }

    public String getNombreRol() {
        return nombreRol;
    }

    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }

    public String getDescripcionRol() { return descripcionRol;}

    public void setDescripcionRol (String descripcionRol) {this.descripcionRol = descripcionRol; }
}
