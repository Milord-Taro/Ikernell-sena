package com.ikernell.backend.report;

import java.time.LocalDateTime;

public record ReporteGeneralInterrupcionFila(
        String codigoInterrupcion,
        String proyecto,
        String actividad,
        String tipoInterrupcion,
        Integer duracionMinutos,
        LocalDateTime fechaRegistro) {
}
