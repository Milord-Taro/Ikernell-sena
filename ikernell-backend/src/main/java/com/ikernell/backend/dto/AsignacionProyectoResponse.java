package com.ikernell.backend.dto;

import com.ikernell.backend.enums.RolProyecto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AsignacionProyectoResponse {

    private Integer idAsignacionProyecto;
    private UsuarioResumenResponse usuario;
    private ProyectoResponse proyecto;
    private RolProyecto rolProyecto;
    private LocalDate fechaAsignacion;
    private LocalDate fechaDesvinculacion;
}
