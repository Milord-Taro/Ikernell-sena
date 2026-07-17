package com.ikernell.backend.dto;

/** Una fila del ranking "proyectos con más errores abiertos" (solo Coordinador). */
public record ItemRanking(Integer id, String label, long value) {
}
