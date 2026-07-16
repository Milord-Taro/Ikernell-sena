package com.ikernell.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestablecerContrasenaRequest {

    @NotBlank(message = "El token es obligatorio.")
    private String token;

    // Misma regla que UsuarioRequest.contrasena -- sin esto, una
    // contraseña recuperada podía quedar más débil que la que exige el
    // registro (recuperar contraseña no debe ser una puerta trasera para
    // bajar el estándar de seguridad).
    @NotBlank(message = "La nueva contraseña es obligatoria.")
    @Size(min = 8, message = "La nueva contraseña debe tener al menos 8 caracteres.")
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d).+$",
            message = "La nueva contraseña debe contener al menos una letra y un número."
    )
    private String nuevaContrasena;
}
