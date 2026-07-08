package com.ikernell.backend.dto;

import com.ikernell.backend.enums.TipoIdentificacion;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * A propósito NO incluye correoElectronico ni contrasena: una vez creado
 * el usuario, esos dos campos solo se cambian por endpoints dedicados
 * (contraseña: PATCH /api/usuarios/me/contrasena, por el propio usuario).
 * Esto es una decisión de seguridad, no un descuido — el Coordinador no
 * puede cambiarlos ni por accidente, porque el contrato ni los admite.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioUpdateRequest {

    @NotBlank(message = "El código del usuario es obligatorio.")
    @Size(max = 20, message = "El código del usuario no puede superar los 20 caracteres.")
    private String codigoUsuario;

    @NotBlank(message = "Los nombres son obligatorios.")
    @Size(min = 3, max = 100, message = "Los nombres deben tener entre 3 y 100 caracteres.")
    private String nombres;

    @NotBlank(message = "Los apellidos son obligatorios.")
    @Size(min = 3, max = 100, message = "Los apellidos deben tener entre 3 y 100 caracteres.")
    private String apellidos;

    @NotNull(message = "El tipo de identificación es obligatorio.")
    private TipoIdentificacion tipoIdentificacion;

    @NotBlank(message = "El número de identificación es obligatorio.")
    @Size(max = 30, message = "El número de identificación no puede superar los 30 caracteres.")
    private String numeroIdentificacion;

    @NotNull(message = "La fecha de nacimiento es obligatoria.")
    @PastOrPresent(message = "La fecha de nacimiento no puede ser futura.")
    private LocalDate fechaNacimiento;

    @NotBlank(message = "La ciudad es obligatoria.")
    @Size(max = 100, message = "La ciudad no puede superar los 100 caracteres.")
    private String ciudad;

    @NotNull(message = "El rol es obligatorio.")
    private Integer idRol;

    @NotNull(message = "La profesión es obligatoria.")
    private Integer idProfesion;

    @NotNull(message = "La especialidad es obligatoria.")
    private Integer idEspecialidad;
}