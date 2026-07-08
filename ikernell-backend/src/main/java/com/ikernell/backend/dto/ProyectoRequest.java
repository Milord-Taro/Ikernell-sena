package com.ikernell.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * El campo "estado" no se maneja aquí: al crear, siempre empieza en
 * PLANEACION; los cambios de estado van por un endpoint dedicado
 * (PATCH /api/proyectos/{id}/estado), igual que "activo" en los catálogos,
 * pero con 5 valores posibles en vez de boolean.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProyectoRequest {

    @NotBlank(message = "El código del proyecto es obligatorio.")
    @Size(max = 20, message = "El código del proyecto no puede superar los 20 caracteres.")
    private String codigoProyecto;

    @NotBlank(message = "El nombre del proyecto es obligatorio.")
    @Size(min = 3, max = 150, message = "El nombre del proyecto debe tener entre 3 y 150 caracteres.")
    private String nombreProyecto;

    private String descripcion;

    @NotNull(message = "La fecha de inicio es obligatoria.")
    private LocalDate fechaInicio;

    @NotNull(message = "La fecha de fin es obligatoria.")
    private LocalDate fechaFin;
}
