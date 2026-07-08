package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.TrazabilidadResponse;
import com.ikernell.backend.service.TrazabilidadQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Solo lectura: la trazabilidad nunca se crea ni edita vía API pública,
 * solo internamente por audit.TrazabilidadService.registrar(...).
 */
@RestController
@RequestMapping("/api/trazabilidad")
@RequiredArgsConstructor
@PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
public class TrazabilidadController {

    private final TrazabilidadQueryService trazabilidadQueryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TrazabilidadResponse>>> listar(
            @RequestParam(name = "entidad", required = false) String entidad) {

        List<TrazabilidadResponse> eventos = entidad != null
                ? trazabilidadQueryService.listarPorEntidad(entidad)
                : trazabilidadQueryService.listarTodos();

        return ResponseEntity.ok(ApiResponse.of(eventos));
    }
}
