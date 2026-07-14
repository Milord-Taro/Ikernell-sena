package com.ikernell.backend.report;

import com.ikernell.backend.enums.EstadoRegistroError;
import com.ikernell.backend.enums.NivelCriticidad;

import java.time.LocalDateTime;

public record ReporteGeneralErrorFila(
        String codigoRegistroError,
        String proyecto,
        String actividad,
        String tipoError,
        NivelCriticidad severidad,
        EstadoRegistroError estado,
        LocalDateTime fechaRegistro) {
}
