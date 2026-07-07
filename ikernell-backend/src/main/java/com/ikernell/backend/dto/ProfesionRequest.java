package com.ikernell.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * El campo "activo" no se maneja aquí: se cambia con un endpoint dedicado
 * (PATCH /api/profesiones/{id}/estado), no en la creación/edición de datos.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfesionRequest {

    @NotBlank(message = "El código de la profesión es obligatorio.")
    @Size(max = 20, message = "El código de la profesión no puede superar los 20 caracteres.")
    private String codigoProfesion;

    @NotBlank(message = "El nombre de la profesión es obligatorio.")
    @Size(min = 3, max = 100, message = "El nombre de la profesión debe tener entre 3 y 100 caracteres.")
    private String nombreProfesion;

    private String descripcion;
}
