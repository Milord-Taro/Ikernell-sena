package com.ikernell.backend.dto;

/** Una "card" del panel de métricas (ej. "Proyectos activos" -> 4). */
public record MetricaTarjeta(String label, long value) {
}
