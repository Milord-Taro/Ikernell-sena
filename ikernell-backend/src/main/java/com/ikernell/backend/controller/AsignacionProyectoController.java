package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.AsignacionProyectoRequest;
import com.ikernell.backend.dto.AsignacionProyectoResponse;
import com.ikernell.backend.service.AsignacionProyectoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * CORREGIDO: gate de rol amplía a Coordinador + Líder de Proyecto. El
 * ownership real (¿es el líder de ESE proyecto?) lo valida el Service.
 */
@RestController
@RequestMapping("/api/asignaciones-proyecto")
@RequiredArgsConstructor
public class AsignacionProyectoController {

    private final AsignacionProyectoService asignacionProyectoService;

    @PostMapping
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<AsignacionProyectoResponse>> crear(
            @Valid @RequestBody AsignacionProyectoRequest request, Authentication authentication) {
        AsignacionProyectoResponse creada = asignacionProyectoService.crear(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Asignación creada correctamente.", creada));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AsignacionProyectoResponse>>> listar(
            @RequestParam(name = "idProyecto", required = false) Integer idProyecto,
            @RequestParam(name = "idUsuario", required = false) Integer idUsuario) {

        List<AsignacionProyectoResponse> asignaciones;
        if (idProyecto != null) {
            asignaciones = asignacionProyectoService.listarPorProyecto(idProyecto);
        } else if (idUsuario != null) {
            asignaciones = asignacionProyectoService.listarPorUsuario(idUsuario);
        } else {
            asignaciones = List.of();
        }

        return ResponseEntity.ok(ApiResponse.of(asignaciones));
    }

    @PatchMapping("/{idAsignacionProyecto}/desvincular")
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<AsignacionProyectoResponse>> desvincular(
            @PathVariable Integer idAsignacionProyecto, Authentication authentication) {
        AsignacionProyectoResponse actualizada =
                asignacionProyectoService.desvincular(idAsignacionProyecto, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Usuario desvinculado del proyecto correctamente.", actualizada));
    }
}