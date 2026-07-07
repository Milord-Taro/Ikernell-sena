package com.ikernell.backend.dto;

import com.ikernell.backend.enums.TipoIdentificacion;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Nunca incluye hashContrasena ni contraseña en texto plano.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioResponse {

    private Integer idUsuario;
    private String codigoUsuario;
    private String nombres;
    private String apellidos;
    private TipoIdentificacion tipoIdentificacion;
    private String numeroIdentificacion;
    private LocalDate fechaNacimiento;
    private String correoElectronico;
    private String ciudad;
    private RolResponse rol;
    private ProfesionResponse profesion;
    private EspecialidadResponse especialidad;
    private Boolean activo;
    private LocalDateTime fechaCreacion;
}
