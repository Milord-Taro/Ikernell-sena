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
public class CambiarContrasenaRequest {

    @NotBlank(message = "Debes indicar tu contraseña actual.")
    private String contrasenaActual;

    // Misma regla que UsuarioRequest.contrasena -- ver nota en
    // RestablecerContrasenaRequest: cambiar la contraseña tampoco debe
    // permitir bajar por debajo del estándar exigido al registrarse.
    @NotBlank(message = "La nueva contraseña es obligatoria.")
    @Size(min = 8, message = "La nueva contraseña debe tener al menos 8 caracteres.")
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d).+$",
            message = "La nueva contraseña debe contener al menos una letra y un número."
    )
    private String contrasenaNueva;
}
