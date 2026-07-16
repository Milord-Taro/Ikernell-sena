package com.ikernell.backend.dto;

import com.ikernell.backend.enums.EstadoProyecto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProyectoResponse {
    private Integer idProyecto;
    private String codigoProyecto;
    private String nombreProyecto;
    private String descripcion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private EstadoProyecto estado;
    private LocalDateTime fechaCreacion;

    // NUEVO: quién es el Líder VIGENTE de este proyecto ahora mismo (o
    // null si nadie está asignado como líder todavía). Se calcula en
    // ProyectoService, no lo pone el mapper -- por eso @Setter es
    // necesario aquí, no solo @Builder.
    private UsuarioResumenResponse liderActual;
}
