package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.EtapaRequest;
import com.ikernell.backend.dto.EtapaResponse;
import com.ikernell.backend.service.EtapaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * CORREGIDO: gate de rol amplía a Coordinador + Líder de Proyecto. El
 * ownership real (¿es el líder de ESE proyecto?) lo valida el Service
 * vía AutorizacionProyectoService.
 */
@RestController
@RequestMapping("/api/etapas")
@RequiredArgsConstructor
public class EtapaController {

    private final EtapaService etapaService;

    @PostMapping
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<EtapaResponse>> crear(
            @Valid @RequestBody EtapaRequest request, Authentication authentication) {
        EtapaResponse creada = etapaService.crear(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Etapa creada correctamente.", creada));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<EtapaResponse>>> listarPorProyecto(
            @RequestParam Integer idProyecto) {
        return ResponseEntity.ok(ApiResponse.of(etapaService.listarPorProyecto(idProyecto)));
    }

    @GetMapping("/{idEtapa}")
    public ResponseEntity<ApiResponse<EtapaResponse>> obtenerPorId(@PathVariable Integer idEtapa) {
        return ResponseEntity.ok(ApiResponse.of(etapaService.obtenerPorId(idEtapa)));
    }

    @PutMapping("/{idEtapa}")
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<EtapaResponse>> actualizar(
            @PathVariable Integer idEtapa, @Valid @RequestBody EtapaRequest request,
            Authentication authentication) {
        EtapaResponse actualizada = etapaService.actualizar(idEtapa, request, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Etapa actualizada correctamente.", actualizada));
    }

    @PatchMapping("/{idEtapa}/estado")
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<EtapaResponse>> cambiarEstado(
            @PathVariable Integer idEtapa, @RequestParam String estado, Authentication authentication) {
        EtapaResponse actualizada = etapaService.cambiarEstado(idEtapa, estado, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Estado de la etapa actualizado correctamente.", actualizada));
    }

    @DeleteMapping("/{idEtapa}")
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<Void>> eliminar(
            @PathVariable Integer idEtapa, Authentication authentication) {
        etapaService.eliminar(idEtapa, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Etapa eliminada correctamente."));
    }
}
