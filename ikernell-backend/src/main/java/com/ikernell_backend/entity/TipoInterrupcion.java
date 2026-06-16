package com.ikernell_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tipointerrupcion")
public class TipoInterrupcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idtipointerrupcion")
    private Integer idTipoInterrupcion;

    @Column(name = "codtipointerrupcion")
    private String codTipoInterrupcion;

    @Column(name = "nombretipointerrupcion")
    private String nombreTipoInterrupcion;

    public TipoInterrupcion() {
    }

   public Integer getIdTipoInterrupcion() {
        return idTipoInterrupcion;
   }
   public void setIdTipoInterrupcion(Integer idTipoInterrupcion) {
        this.idTipoInterrupcion = idTipoInterrupcion;
   }

   public String getCodTipoInterrupcion() {
        return codTipoInterrupcion;
   }
   public void setCodTipoInterrupcion(String codTipoInterrupcion) {
        this.codTipoInterrupcion = codTipoInterrupcion;
   }

   public String getNombreTipoInterrupcion() {
        return nombreTipoInterrupcion;
   }
   public void setNombreTipoInterrupcion(String nombreTipoInterrupcion) {
        this.nombreTipoInterrupcion = nombreTipoInterrupcion;
   }
}
