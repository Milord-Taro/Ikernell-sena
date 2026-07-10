package com.ikernell.backend.dto;

import com.ikernell.backend.enums.TipoIdentificacion;
import com.ikernell.backend.validation.EdadMinima;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * El campo "activo" no se maneja aquí: se cambia con un endpoint dedicado
 * (PATCH /api/usuarios/{id}/estado).
 *
 * La contraseña tampoco se actualiza a través de una edición normal: eso
 * será un endpoint dedicado de cambio de contraseña (Sprint 2, junto con
 * Login/JWT/Recuperación de contraseña).
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRequest {

    @NotBlank(message = "El código del usuario es obligatorio.")
    @Size(max = 20, message = "El código del usuario no puede superar los 20 caracteres.")
    private String codigoUsuario;

    @NotBlank(message = "Los nombres son obligatorios.")
    @Size(min = 3, max = 100, message = "Los nombres deben tener entre 3 y 100 caracteres.")
    @Pattern(regexp = "^[\\p{L} ]+$", message = "Los nombres solo pueden contener letras y espacios.")
    private String nombres;

    @NotBlank(message = "Los apellidos son obligatorios.")
    @Size(min = 3, max = 100, message = "Los apellidos deben tener entre 3 y 100 caracteres.")
    @Pattern(regexp = "^[\\p{L} ]+$", message = "Los apellidos solo pueden contener letras y espacios.")
    private String apellidos;

    @NotNull(message = "El tipo de identificación es obligatorio.")
    private TipoIdentificacion tipoIdentificacion;

    // Rango ajustado a la realidad colombiana: cédulas van de ~6 a 10
    // dígitos. 30 (el valor anterior) no tenía sentido para este dominio.
    @NotBlank(message = "El número de identificación es obligatorio.")
    @Size(min = 6, max = 10, message = "El número de identificación debe tener entre 6 y 10 dígitos.")
    @Pattern(regexp = "\\d+", message = "El número de identificación solo puede contener dígitos.")
    private String numeroIdentificacion;

    @NotNull(message = "La fecha de nacimiento es obligatoria.")
    @PastOrPresent(message = "La fecha de nacimiento no puede ser futura.")
    @EdadMinima(value = 18, message = "El usuario debe ser mayor de edad (18 años o más).")
    private LocalDate fechaNacimiento;

    @NotBlank(message = "El correo electrónico es obligatorio.")
    @Email(message = "El correo electrónico no tiene un formato válido.")
    @Size(max = 150, message = "El correo electrónico no puede superar los 150 caracteres.")
    private String correoElectronico;

    @NotBlank(message = "La contraseña es obligatoria.")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres.")
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d).+$",
            message = "La contraseña debe contener al menos una letra y un número."
    )
    private String contrasena;

    // "Ciudad de residencia actual" (para contacto/nómina) -- distinto de
    // la ciudad de nacimiento, que no se registra en este sistema.
    @NotBlank(message = "La ciudad de residencia es obligatoria.")
    @Size(max = 100, message = "La ciudad no puede superar los 100 caracteres.")
    private String ciudad;

    @NotNull(message = "El rol es obligatorio.")
    private Integer idRol;

    @NotNull(message = "La profesión es obligatoria.")
    private Integer idProfesion;

    @NotNull(message = "La especialidad es obligatoria. Usa el registro 'No aplica' del catálogo si no tiene una.")
    private Integer idEspecialidad;
}
