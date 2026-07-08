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
public class TipoErrorResponse {

    private Integer idTipoError;
    private String codigoTipoError;
    private String nombreTipoError;
    private String descripcion;
    private Boolean activo;
    private LocalDateTime fechaCreacion;
}
