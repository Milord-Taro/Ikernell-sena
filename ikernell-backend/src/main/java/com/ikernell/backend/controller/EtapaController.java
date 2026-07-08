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
 * Gestionar etapas es tarea del Líder de Proyecto (caso de estudio: "gestionar
 * etapas del proyecto pudiendo: registrar, modificar etapas"). GET abierto a
 * cualquier autenticado.
 */
@RestController
@RequestMapping("/api/etapas")
@RequiredArgsConstructor
public class EtapaController {

    private final EtapaService etapaService;

    @PostMapping
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<EtapaResponse>> crear(@Valid @RequestBody EtapaRequest request) {
        EtapaResponse creada = etapaService.crear(request);
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
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<EtapaResponse>> actualizar(
            @PathVariable Integer idEtapa, @Valid @RequestBody EtapaRequest request) {
        EtapaResponse actualizada = etapaService.actualizar(idEtapa, request);
        return ResponseEntity.ok(ApiResponse.of("Etapa actualizada correctamente.", actualizada));
    }

    @PatchMapping("/{idEtapa}/estado")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<EtapaResponse>> cambiarEstado(
            @PathVariable Integer idEtapa, @RequestParam String estado) {
        EtapaResponse actualizada = etapaService.cambiarEstado(idEtapa, estado);
        return ResponseEntity.ok(ApiResponse.of("Estado de la etapa actualizado correctamente.", actualizada));
    }
}
