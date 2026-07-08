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
public class RespuestaMensajeRequest {

    @NotBlank(message = "La respuesta es obligatoria.")
    @Size(min = 3, message = "La respuesta debe tener al menos 3 caracteres.")
    private String respuesta;
}
