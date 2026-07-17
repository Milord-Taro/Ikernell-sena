package com.ikernell.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterrupcionResponse {

    private Integer idInterrupcion;
    private String codigoInterrupcion;
    private ActividadResponse actividad;
    private TipoInterrupcionResponse tipoInterrupcion;
    private UsuarioResumenResponse usuarioCreador;
    private String motivo;
    private Integer duracionMinutos;
    private LocalDateTime fechaRegistro;
}
