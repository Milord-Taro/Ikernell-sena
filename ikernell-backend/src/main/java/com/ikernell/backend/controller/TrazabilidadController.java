package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.PaginaResponse;
import com.ikernell.backend.dto.TrazabilidadResponse;
import com.ikernell.backend.service.TrazabilidadQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Solo lectura: la trazabilidad nunca se crea ni edita vía API pública,
 * solo internamente por audit.TrazabilidadService.registrar(...).
 *
 * CORREGIDO (B4): paginado -- página y tamaño vienen por query param en
 * vez de devolver el historial completo en cada llamada. "tamano" por
 * defecto 20, con un tope de 100 para que nadie pida una página gigante
 * por error y termine haciendo exactamente el fetch-completo que se
 * quería evitar.
 */
@RestController
@RequestMapping("/api/trazabilidad")
@RequiredArgsConstructor
@PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
public class TrazabilidadController {

    private static final int TAMANO_MAXIMO = 100;

    private final TrazabilidadQueryService trazabilidadQueryService;

    @GetMapping
    public ResponseEntity<ApiResponse<PaginaResponse<TrazabilidadResponse>>> listar(
            @RequestParam(name = "entidad", required = false) String entidad,
            @RequestParam(name = "pagina", defaultValue = "0") int pagina,
            @RequestParam(name = "tamano", defaultValue = "20") int tamano) {

        Pageable pageable = PageRequest.of(pagina, Math.min(tamano, TAMANO_MAXIMO));

        PaginaResponse<TrazabilidadResponse> eventos = entidad != null
                ? trazabilidadQueryService.listarPorEntidad(entidad, pageable)
                : trazabilidadQueryService.listarTodos(pageable);

        return ResponseEntity.ok(ApiResponse.of(eventos));
    }
}
