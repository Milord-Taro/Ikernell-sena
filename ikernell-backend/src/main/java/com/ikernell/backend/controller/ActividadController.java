package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ActividadRequest;
import com.ikernell.backend.dto.ActividadResponse;
import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.service.ActividadService;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * CORREGIDO: gate de rol amplía a Coordinador + Líder de Proyecto para
 * crear/editar/asignar. El ownership real (¿es el líder de ESE proyecto?)
 * lo valida el Service. cambiarEstado SIN CAMBIOS (sigue abierto).
 */
@RestController
@RequestMapping("/api/actividades")
@RequiredArgsConstructor
public class ActividadController {

    private final ActividadService actividadService;

    @PostMapping
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<ActividadResponse>> crear(
            @Valid @RequestBody ActividadRequest request, Authentication authentication) {
        ActividadResponse creada = actividadService.crear(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Actividad creada correctamente.", creada));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ActividadResponse>>> listar(
            @RequestParam(name = "idEtapa", required = false) Integer idEtapa,
            @RequestParam(name = "idUsuario", required = false) Integer idUsuario) {

        List<ActividadResponse> actividades;
        if (idEtapa != null) {
            actividades = actividadService.listarPorEtapa(idEtapa);
        } else if (idUsuario != null) {
            actividades = actividadService.listarPorUsuario(idUsuario);
        } else {
            actividades = List.of();
        }

        return ResponseEntity.ok(ApiResponse.of(actividades));
    }

    @GetMapping("/{idActividad}")
    public ResponseEntity<ApiResponse<ActividadResponse>> obtenerPorId(@PathVariable Integer idActividad) {
        return ResponseEntity.ok(ApiResponse.of(actividadService.obtenerPorId(idActividad)));
    }

    @PutMapping("/{idActividad}")
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<ActividadResponse>> actualizar(
            @PathVariable Integer idActividad, @Valid @RequestBody ActividadRequest request,
            Authentication authentication) {
        ActividadResponse actualizada = actividadService.actualizar(idActividad, request, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Actividad actualizada correctamente.", actualizada));
    }

    @PatchMapping("/{idActividad}/asignar")
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<ActividadResponse>> asignar(
            @PathVariable Integer idActividad, @RequestParam Integer idUsuario,
            Authentication authentication) {
        ActividadResponse actualizada = actividadService.asignar(idActividad, idUsuario, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Desarrollador asignado correctamente.", actualizada));
    }

    @PatchMapping("/{idActividad}/estado")
    public ResponseEntity<ApiResponse<ActividadResponse>> cambiarEstado(
            @PathVariable Integer idActividad, @RequestParam String estado) {
        ActividadResponse actualizada = actividadService.cambiarEstado(idActividad, estado);
        return ResponseEntity.ok(ApiResponse.of("Estado de la actividad actualizado correctamente.", actualizada));
    }
}