package com.ikernell.backend.dto;

/** Un punto de la tendencia "actividades finalizadas por día" (últimos 14 días). */
public record PuntoDiario(String etiqueta, long value) {
}
