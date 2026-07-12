package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.EspecialidadRequest;
import com.ikernell.backend.dto.EspecialidadResponse;
import com.ikernell.backend.service.EspecialidadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Catálogo de uso exclusivo del Coordinador. Líder/Desarrollador nunca lo
 * consultan directamente: lo ven ya anidado dentro de su propio
 * UsuarioResponse. Por eso el @PreAuthorize va a nivel de clase, igual
 * que en RolController.
 */
@RestController
@RequestMapping("/api/especialidades")
@RequiredArgsConstructor
@PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
public class EspecialidadController {

    private final EspecialidadService especialidadService;

    @PostMapping
    public ResponseEntity<ApiResponse<EspecialidadResponse>> crear(
            @Valid @RequestBody EspecialidadRequest request, Authentication authentication) {
        EspecialidadResponse creada = especialidadService.crear(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Especialidad creada correctamente.", creada));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<EspecialidadResponse>>> listar(
            @RequestParam(name = "soloActivas", defaultValue = "false") boolean soloActivas) {
        List<EspecialidadResponse> especialidades = soloActivas
                ? especialidadService.listarActivas() : especialidadService.listarTodas();
        return ResponseEntity.ok(ApiResponse.of(especialidades));
    }

    @GetMapping("/{idEspecialidad}")
    public ResponseEntity<ApiResponse<EspecialidadResponse>> obtenerPorId(@PathVariable Integer idEspecialidad) {
        return ResponseEntity.ok(ApiResponse.of(especialidadService.obtenerPorId(idEspecialidad)));
    }

    @PutMapping("/{idEspecialidad}")
    public ResponseEntity<ApiResponse<EspecialidadResponse>> actualizar(
            @PathVariable Integer idEspecialidad, @Valid @RequestBody EspecialidadRequest request,
            Authentication authentication) {
        EspecialidadResponse actualizada =
                especialidadService.actualizar(idEspecialidad, request, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Especialidad actualizada correctamente.", actualizada));
    }

    @PatchMapping("/{idEspecialidad}/estado")
    public ResponseEntity<ApiResponse<EspecialidadResponse>> cambiarEstado(
            @PathVariable Integer idEspecialidad, @RequestParam boolean activo, Authentication authentication) {
        EspecialidadResponse actualizada =
                especialidadService.cambiarEstado(idEspecialidad, activo, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of(
                activo ? "Especialidad activada correctamente." : "Especialidad desactivada correctamente.", actualizada));
    }

    @DeleteMapping("/{idEspecialidad}")
    public ResponseEntity<ApiResponse<Void>> eliminar(
            @PathVariable Integer idEspecialidad, Authentication authentication) {
        especialidadService.eliminar(idEspecialidad, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Especialidad eliminada correctamente."));
    }
}
