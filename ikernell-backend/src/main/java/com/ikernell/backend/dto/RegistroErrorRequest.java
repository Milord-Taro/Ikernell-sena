package com.ikernell.backend.dto;

import com.ikernell.backend.enums.NivelCriticidad;
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
public class RegistroErrorRequest {

    @NotBlank(message = "El código del registro de error es obligatorio.")
    @Size(max = 20, message = "El código no puede superar los 20 caracteres.")
    private String codigoRegistroError;

    @NotNull(message = "La actividad es obligatoria.")
    private Integer idActividad;

    @NotNull(message = "El tipo de error es obligatorio.")
    private Integer idTipoError;

    @NotBlank(message = "El título es obligatorio.")
    @Size(min = 3, max = 100, message = "El título debe tener entre 3 y 100 caracteres.")
    private String titulo;

    @NotBlank(message = "La descripción es obligatoria.")
    @Size(min = 3, message = "La descripción debe tener al menos 3 caracteres.")
    private String descripcion;

    @NotNull(message = "La severidad es obligatoria.")
    private NivelCriticidad severidad;
}
