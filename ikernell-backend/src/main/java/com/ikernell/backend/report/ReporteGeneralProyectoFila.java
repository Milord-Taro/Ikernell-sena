package com.ikernell.backend.report;

import com.ikernell.backend.enums.EstadoProyecto;

import java.time.LocalDate;

public record ReporteGeneralProyectoFila(
        String codigoProyecto,
        String nombreProyecto,
        EstadoProyecto estado,
        String liderActual,
        LocalDate fechaInicio,
        LocalDate fechaFin) {
}
