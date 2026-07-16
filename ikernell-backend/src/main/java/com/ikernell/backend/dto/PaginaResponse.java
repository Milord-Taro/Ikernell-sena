package com.ikernell.backend.dto;

import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Envoltorio de paginación propio en vez de exponer Page<T> de Spring
 * Data directamente -- su serialización JSON es muy verbosa (trae
 * "pageable", "sort", metadatos internos de Spring) y no es un contrato
 * estable para el frontend. Este DTO solo expone lo que el frontend
 * realmente necesita para pintar una tabla paginada.
 */
public record PaginaResponse<T>(
        List<T> contenido,
        int pagina,
        int tamano,
        long totalElementos,
        int totalPaginas) {

    public static <T> PaginaResponse<T> de(Page<T> page) {
        return new PaginaResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages());
    }
}
