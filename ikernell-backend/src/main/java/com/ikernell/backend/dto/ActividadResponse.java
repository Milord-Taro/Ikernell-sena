package com.ikernell.backend.dto;

import com.ikernell.backend.enums.EstadoActividad;
import com.ikernell.backend.enums.NivelCriticidad;
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
public class ActividadResponse {

    private Integer idActividad;
    private String codigoActividad;
    private EtapaResponse etapa;
    private UsuarioResumenResponse usuario;
    private String nombreActividad;
    private String descripcion;
    private NivelCriticidad prioridad;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private EstadoActividad estado;
    private LocalDateTime fechaFinalizacion;
    private String notaFinalizacion;
    private LocalDateTime fechaCreacion;
}
