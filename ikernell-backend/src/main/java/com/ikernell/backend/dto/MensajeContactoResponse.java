package com.ikernell.backend.dto;

import com.ikernell.backend.enums.EstadoMensaje;
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
public class MensajeContactoResponse {

    private Integer idMensajeContacto;
    private String codigoMensaje;
    private String nombreRemitente;
    private String correoElectronico;
    private String asunto;
    private String detalle;
    private EstadoMensaje estado;
    private String respuesta;
    private UsuarioResponse responsable;
    private LocalDateTime fechaEnvio;
    private LocalDateTime fechaAtencion;
}
