package com.ikernell.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * El campo "estado" no se maneja aquí: al crear siempre empieza en
 * PENDIENTE; los cambios van por PATCH /api/etapas/{id}/estado.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EtapaRequest {

    @NotNull(message = "El proyecto es obligatorio.")
    private Integer idProyecto;

    @NotBlank(message = "El nombre de la etapa es obligatorio.")
    @Size(min = 3, max = 120, message = "El nombre de la etapa debe tener entre 3 y 120 caracteres.")
    private String nombreEtapa;

    private String descripcion;

    @NotNull(message = "El orden es obligatorio.")
    @Min(value = 1, message = "El orden debe ser mayor a 0.")
    private Integer orden;

    @NotNull(message = "La fecha de inicio es obligatoria.")
    private LocalDate fechaInicio;

    @NotNull(message = "La fecha de fin es obligatoria.")
    private LocalDate fechaFin;
}
