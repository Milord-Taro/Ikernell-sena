package com.ikernell.backend.dto;

import java.time.LocalDateTime;

/**
 * Una fila del feed de actividad reciente. "tipo" es uno de "error",
 * "interrupcion", "mensaje" (coincide con el union type del frontend) --
 * no se modeló como enum porque solo se usa acá, en un único campo.
 */
public record ItemFeed(String id, String tipo, String titulo, String detalle, LocalDateTime fecha) {
}
