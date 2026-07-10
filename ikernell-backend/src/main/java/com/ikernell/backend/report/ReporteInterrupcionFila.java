package com.ikernell.backend.report;

import java.time.LocalDateTime;

public record ReporteInterrupcionFila(
        String codigoInterrupcion,
        String etapa,
        String actividad,
        String tipoInterrupcion,
        String motivo,
        Integer duracionMinutos,
        LocalDateTime fechaRegistro) {
}
