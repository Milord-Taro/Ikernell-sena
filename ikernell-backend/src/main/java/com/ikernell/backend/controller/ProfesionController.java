package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.ProfesionRequest;
import com.ikernell.backend.dto.ProfesionResponse;
import com.ikernell.backend.service.ProfesionService;
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
@RequestMapping("/api/profesiones")
@RequiredArgsConstructor
@PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
public class ProfesionController {

    private final ProfesionService profesionService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProfesionResponse>> crear(
            @Valid @RequestBody ProfesionRequest request, Authentication authentication) {
        ProfesionResponse creada = profesionService.crear(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Profesión creada correctamente.", creada));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProfesionResponse>>> listar(
            @RequestParam(name = "soloActivas", defaultValue = "false") boolean soloActivas) {
        List<ProfesionResponse> profesiones = soloActivas
                ? profesionService.listarActivas() : profesionService.listarTodas();
        return ResponseEntity.ok(ApiResponse.of(profesiones));
    }

    @GetMapping("/{idProfesion}")
    public ResponseEntity<ApiResponse<ProfesionResponse>> obtenerPorId(@PathVariable Integer idProfesion) {
        return ResponseEntity.ok(ApiResponse.of(profesionService.obtenerPorId(idProfesion)));
    }

    @PutMapping("/{idProfesion}")
    public ResponseEntity<ApiResponse<ProfesionResponse>> actualizar(
            @PathVariable Integer idProfesion, @Valid @RequestBody ProfesionRequest request,
            Authentication authentication) {
        ProfesionResponse actualizada = profesionService.actualizar(idProfesion, request, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Profesión actualizada correctamente.", actualizada));
    }

    @PatchMapping("/{idProfesion}/estado")
    public ResponseEntity<ApiResponse<ProfesionResponse>> cambiarEstado(
            @PathVariable Integer idProfesion, @RequestParam boolean activo, Authentication authentication) {
        ProfesionResponse actualizada =
                profesionService.cambiarEstado(idProfesion, activo, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of(
                activo ? "Profesión activada correctamente." : "Profesión desactivada correctamente.", actualizada));
    }

    @DeleteMapping("/{idProfesion}")
    public ResponseEntity<ApiResponse<Void>> eliminar(
            @PathVariable Integer idProfesion, Authentication authentication) {
        profesionService.eliminar(idProfesion, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Profesión eliminada correctamente."));
    }
}
