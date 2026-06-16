package com.ikernell_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tipoerror")
public class TipoError {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idtipoerror")
    private Integer idTipoError;

    @Column(name = "codtipoerror")
    private String codTipoError;

    @Column(name = "nombretipo")
    private String nombreTipo;

    public TipoError() {
    }

    public Integer getIdTipoError() {
        return idTipoError;
    }
    public void setIdTipoError(Integer idTipoError) {
        this.idTipoError = idTipoError;
    }

    public String getCodTipoError() {
        return codTipoError;
    }
    public void setCodTipoError(String codTipoError) {
        this.codTipoError = codTipoError;
    }

    public String getNombreTipo() {
        return nombreTipo;
    }
    public void setNombreTipo(String nombreTipo) {
        this.nombreTipo = nombreTipo;
    }
}
