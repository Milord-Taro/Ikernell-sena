package com.ikernell.backend.dto;

import com.ikernell.backend.enums.OperacionTrazabilidad;
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
public class TrazabilidadResponse {

    private Integer idTrazabilidad;
    private UsuarioResponse usuario;
    private String entidad;
    private String codigoRegistro;
    private OperacionTrazabilidad operacion;
    private String detalle;
    private String direccionIp;
    private LocalDateTime fechaEvento;
}
