package com.ikernell.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Público, sin autenticación (RF-002). No incluye codigoMensaje: lo genera
 * el sistema, ya que un remitente anónimo no debería inventar un código
 * de negocio.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MensajeContactoRequest {

    @NotBlank(message = "El nombre es obligatorio.")
    @Size(min = 3, max = 120, message = "El nombre debe tener entre 3 y 120 caracteres.")
    private String nombreRemitente;

    @NotBlank(message = "El correo electrónico es obligatorio.")
    @Email(message = "El correo electrónico no tiene un formato válido.")
    @Size(max = 150, message = "El correo electrónico no puede superar los 150 caracteres.")
    private String correoElectronico;

    @NotBlank(message = "El asunto es obligatorio.")
    @Size(max = 150, message = "El asunto no puede superar los 150 caracteres.")
    private String asunto;

    @NotBlank(message = "El detalle es obligatorio.")
    private String detalle;
}
