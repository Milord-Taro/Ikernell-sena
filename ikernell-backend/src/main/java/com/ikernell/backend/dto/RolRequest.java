package com.ikernell.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * El campo "activo" no se maneja aquí: se cambia con un endpoint dedicado
 * (PATCH /api/roles/{id}/estado), no en la creación/edición de datos.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RolRequest {

    @NotBlank(message = "El nombre del rol es obligatorio.")
    @Size(min = 3, max = 100, message = "El nombre del rol debe tener entre 3 y 100 caracteres.")
    private String nombreRol;

    @Size(max = 255, message = "La descripción no puede superar los 255 caracteres.")
    private String descripcion;
}
