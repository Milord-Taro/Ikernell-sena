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
public class RolResponse {

    private Integer idRol;
    private String codigoRol;
    private String nombreRol;
    private String descripcion;
    private Boolean activo;
    private LocalDateTime fechaCreacion;
}
