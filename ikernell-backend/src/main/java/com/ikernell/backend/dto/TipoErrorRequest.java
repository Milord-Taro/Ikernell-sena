package com.ikernell.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TipoErrorRequest {

    @NotBlank(message = "El código del tipo de error es obligatorio.")
    @Size(max = 20, message = "El código no puede superar los 20 caracteres.")
    private String codigoTipoError;

    @NotBlank(message = "El nombre del tipo de error es obligatorio.")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres.")
    private String nombreTipoError;

    private String descripcion;
}
