package com.ikernell_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "interrupcion")
public class Interrupcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idinterrupcion")
    private Integer idInterrupcion;

    @Column(name = "codinterrupcion")
    private String codInterrupcion;

    @Column(name = "descripcioninterrupcion")
    private String descripcionInterrupcion;

    @Column(name = "fechainterrupcion")
    private LocalDate fechaiterrupcion;

    @Column(name = "duracioninterrupcion")
    private Integer duracionInterrupcion;

    @ManyToOne
    @JoinColumn(name = "idtipointerrupcion")
    private TipoInterrupcion tipoInterrupcion;

    @ManyToOne
    @JoinColumn(name = "idetapa")
    private Etapa etapa;

    @ManyToOne
    @JoinColumn(name = "iddesarrollador")
    private Usuario desarrollador;

    public Interrupcion() {
    }

    public Integer getIdInterrupcion() {
        return idInterrupcion;
    }
    public void setIdInterrupcion(Integer idInterrupcion) {
        this.idInterrupcion = idInterrupcion;
    }

    public String getCodInterrupcion() {
        return codInterrupcion;
    }
    public void setCodInterrupcion(String codInterrupcion) {
        this.codInterrupcion = codInterrupcion;
    }

    public String getDescripcionInterrupcion() {
        return descripcionInterrupcion;
    }
    public void setDescripcionInterrupcion(String descripcionInterrupcion) {
        this.descripcionInterrupcion = descripcionInterrupcion;
    }

    public LocalDate getFechaiterrupcion() {
        return fechaiterrupcion;
    }
    public void setFechaiterrupcion(LocalDate fechaiterrupcion) {
        this.fechaiterrupcion = fechaiterrupcion;
    }

    public Integer getDuracionInterrupcion() {
        return duracionInterrupcion;
    }
    public void setDuracionInterrupcion(Integer duracionInterrupcion) {
        this.duracionInterrupcion = duracionInterrupcion;
    }

    public TipoInterrupcion getTipoInterrupcion() {
        return tipoInterrupcion;
    }
    public void setTipoInterrupcion(TipoInterrupcion tipoInterrupcion) {
        this.tipoInterrupcion = tipoInterrupcion;
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
