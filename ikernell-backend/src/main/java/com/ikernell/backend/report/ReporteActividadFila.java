package com.ikernell.backend.report;

import com.ikernell.backend.enums.EstadoActividad;
import com.ikernell.backend.enums.NivelCriticidad;

import java.time.LocalDate;

public record ReporteActividadFila(
        String codigoActividad,
        String etapa,
        String desarrollador,
        NivelCriticidad prioridad,
        EstadoActividad estado,
        LocalDate fechaInicio,
        LocalDate fechaFin) {
}
