package com.ikernell.backend.dto;

import com.ikernell.backend.enums.NivelCriticidad;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * idUsuario es OPCIONAL a propósito: si no se manda, la actividad queda
 * "Pendiente de asignación" (sin desarrollador todavía). El campo "estado"
 * no se maneja aquí: lo decide el Service según si idUsuario viene o no,
 * y luego cambia con PATCH /api/actividades/{id}/asignar o /estado.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActividadRequest {

    @NotNull(message = "La etapa es obligatoria.")
    private Integer idEtapa;

    private Integer idUsuario;

    @NotBlank(message = "El nombre de la actividad es obligatorio.")
    @Size(min = 3, max = 150, message = "El nombre de la actividad debe tener entre 3 y 150 caracteres.")
    private String nombreActividad;

    private String descripcion;

    @NotNull(message = "La prioridad es obligatoria.")
    private NivelCriticidad prioridad;

    @NotNull(message = "La fecha de inicio es obligatoria.")
    private LocalDate fechaInicio;

    @NotNull(message = "La fecha de fin es obligatoria.")
    private LocalDate fechaFin;
}
