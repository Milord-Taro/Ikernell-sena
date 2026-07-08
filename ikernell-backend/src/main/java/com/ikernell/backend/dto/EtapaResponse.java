package com.ikernell.backend.dto;

import com.ikernell.backend.enums.EstadoEtapa;
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
public class EtapaResponse {

    private Integer idEtapa;
    private String codigoEtapa;
    private ProyectoResponse proyecto;
    private String nombreEtapa;
    private String descripcion;
    private Integer orden;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private EstadoEtapa estado;
    private LocalDateTime fechaCreacion;
}
