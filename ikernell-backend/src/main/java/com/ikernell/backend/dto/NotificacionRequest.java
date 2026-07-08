package com.ikernell.backend.dto;

import com.ikernell.backend.enums.TipoNotificacion;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Creación manual/administrativa mientras no exista generación automática
 * desde los demás módulos (ver nota de alcance de Sprint 6).
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificacionRequest {

    @NotNull(message = "El usuario destinatario es obligatorio.")
    private Integer idUsuario;

    @NotBlank(message = "El título es obligatorio.")
    @Size(max = 150, message = "El título no puede superar los 150 caracteres.")
    private String titulo;

    @NotBlank(message = "El detalle es obligatorio.")
    private String detalle;

    @NotNull(message = "El tipo de notificación es obligatorio.")
    private TipoNotificacion tipo;

    private String urlDestino;
}
