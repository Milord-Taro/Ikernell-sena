package com.ikernell.backend.dto;

/**
 * Un valor de una distribución de barras (ej. "Alta" -> 3 errores). El
 * color de cada barra lo decide el frontend a partir de "label" -- acá
 * solo va el dato.
 */
public record BarraDato(String label, long value) {
}
