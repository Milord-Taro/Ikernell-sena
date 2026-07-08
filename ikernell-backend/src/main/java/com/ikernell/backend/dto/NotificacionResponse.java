package com.ikernell.backend.dto;

import com.ikernell.backend.enums.TipoNotificacion;
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
public class NotificacionResponse {

    private Integer idNotificacion;
    private String codigoNotificacion;
    private String titulo;
    private String detalle;
    private TipoNotificacion tipo;
    private Boolean leida;
    private String urlDestino;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaLectura;
}
