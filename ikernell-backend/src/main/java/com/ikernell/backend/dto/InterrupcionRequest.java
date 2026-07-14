package com.ikernell.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterrupcionRequest {

    @NotNull(message = "La actividad es obligatoria.")
    private Integer idActividad;

    @NotNull(message = "El tipo de interrupción es obligatorio.")
    private Integer idTipoInterrupcion;

    @NotBlank(message = "El motivo es obligatorio.")
    @Size(min = 3, message = "El motivo debe tener al menos 3 caracteres.")
    private String motivo;

    @NotNull(message = "La duración en minutos es obligatoria.")
    @Min(value = 1, message = "La duración debe ser mayor a 0 minutos.")
    private Integer duracionMinutos;
}
