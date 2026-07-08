package com.ikernell.backend.dto;

import com.ikernell.backend.enums.RolProyecto;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AsignacionProyectoRequest {

    @NotNull(message = "El usuario es obligatorio.")
    private Integer idUsuario;

    @NotNull(message = "El proyecto es obligatorio.")
    private Integer idProyecto;

    @NotNull(message = "El rol dentro del proyecto es obligatorio (Líder o Desarrollador).")
    private RolProyecto rolProyecto;
}
