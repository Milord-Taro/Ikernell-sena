package com.ikernell_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "proyecto")
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idproyecto")
    private Integer idProyecto;

    @Column(name ="codproyecto")
    private String codProyecto;

    @Column(name = "nombreproyecto")
    private String nombreProyecto;

    @Column(name = "descripcionproyecto")
    private String descripcionProyecto;

    @Column(name = "fechainicioproyecto")
    private LocalDate fechainicioProyecto;

    @Column(name = "fechafinproyecto")
    private LocalDate fechafinProyecto;

    @Column(name = "estadoproyecto")
    private Boolean estadoProyecto;

    @ManyToOne
    @JoinColumn(name = "idlider")
    private Usuario lider;

    public Proyecto() {
    }

    public Integer getIdProyecto() {return idProyecto;}

    public void setIdProyecto(Integer idProyecto) {this.idProyecto = idProyecto;}

    public String  getCodProyecto() {return codProyecto;}

    public void setCodProyecto(String codProyecto) {this.codProyecto = codProyecto;}

    public String getNombreProyecto() {return nombreProyecto;}

    public void setNombreProyecto(String nombreProyecto) {this.nombreProyecto = nombreProyecto;}

    public String getDescripcionProyecto() {return descripcionProyecto;}

    public void setDescripcionProyecto(String descripcionProyecto) {this.descripcionProyecto = descripcionProyecto;}

    public LocalDate getFechainicioProyecto() {return fechainicioProyecto;}

    public void setFechainicioProyecto(LocalDate fechainicioProyecto) {this.fechainicioProyecto = fechainicioProyecto;}

    public LocalDate getFechafinProyecto() {return fechafinProyecto;}

    public void setFechafinProyecto(LocalDate fechafinProyecto) {this.fechafinProyecto = fechafinProyecto;}

    public Boolean getEstadoProyecto() {return estadoProyecto;}

    public void setEstadoProyecto(Boolean estadoProyecto) {this.estadoProyecto = estadoProyecto;}

    public Usuario getLider() {return lider;}

    public void setLider(Usuario lider) {this.lider = lider;}
}