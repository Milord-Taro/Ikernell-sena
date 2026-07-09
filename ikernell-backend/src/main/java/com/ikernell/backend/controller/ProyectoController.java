package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.ProyectoRequest;
import com.ikernell.backend.dto.ProyectoResponse;
import com.ikernell.backend.service.ProyectoService;
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
 * CORREGIDO: el gate de rol ahora permite Coordinador Y Líder de Proyecto
 * (antes solo Líder). Dentro del Service, AutorizacionProyectoService
 * decide con más detalle: Coordinador siempre puede; un Líder SOLO si es
 * el líder vigente de ESE proyecto puntual (ownership real, no solo rol).
 */
@RestController
@RequestMapping("/api/proyectos")
@RequiredArgsConstructor
public class ProyectoController {

    private final ProyectoService proyectoService;

    @PostMapping
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<ProyectoResponse>> crear(
            @Valid @RequestBody ProyectoRequest request, Authentication authentication) {
        ProyectoResponse creado = proyectoService.crear(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Proyecto creado correctamente.", creado));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProyectoResponse>>> listar(
            @RequestParam(name = "estado", required = false) String estado) {

        List<ProyectoResponse> proyectos = estado != null
                ? proyectoService.listarPorEstado(estado)
                : proyectoService.listarTodos();

        return ResponseEntity.ok(ApiResponse.of(proyectos));
    }

    @GetMapping("/{idProyecto}")
    public ResponseEntity<ApiResponse<ProyectoResponse>> obtenerPorId(@PathVariable Integer idProyecto) {
        return ResponseEntity.ok(ApiResponse.of(proyectoService.obtenerPorId(idProyecto)));
    }

    @PutMapping("/{idProyecto}")
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<ProyectoResponse>> actualizar(
            @PathVariable Integer idProyecto, @Valid @RequestBody ProyectoRequest request,
            Authentication authentication) {
        ProyectoResponse actualizado = proyectoService.actualizar(idProyecto, request, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Proyecto actualizado correctamente.", actualizado));
    }

    @PatchMapping("/{idProyecto}/estado")
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<ProyectoResponse>> cambiarEstado(
            @PathVariable Integer idProyecto, @RequestParam String estado, Authentication authentication) {
        ProyectoResponse actualizado = proyectoService.cambiarEstado(idProyecto, estado, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Estado del proyecto actualizado correctamente.", actualizado));
    }
}