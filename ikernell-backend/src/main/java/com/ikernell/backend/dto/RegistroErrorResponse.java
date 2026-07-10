package com.ikernell.backend.dto;

import com.ikernell.backend.enums.EstadoRegistroError;
import com.ikernell.backend.enums.NivelCriticidad;
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
public class RegistroErrorResponse {

    private Integer idRegistroError;
    private String codigoRegistroError;
    private ActividadResponse actividad;
    private TipoErrorResponse tipoError;
    private String titulo;
    private String descripcion;
    private NivelCriticidad severidad;
    private EstadoRegistroError estado;
    private LocalDateTime fechaRegistro;
}
