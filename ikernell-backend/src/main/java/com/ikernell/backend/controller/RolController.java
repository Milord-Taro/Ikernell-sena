package com.ikernell.backend.controller;

import com.ikernell.backend.constants.RolConstantes;
import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.RolRequest;
import com.ikernell.backend.dto.RolResponse;
import com.ikernell.backend.service.RolService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CORREGIDO: antes el @PreAuthorize de clase dejaba TODO (incluido leer)
 * exclusivo de Coordinador. El Líder de Proyecto necesita GET /api/roles
 * para el filtro "Todos los roles" de la lista de usuarios (ve usuarios,
 * pero no gestiona el catálogo de roles) -- por eso el gate ahora está a
 * nivel de método: lectura para Coordinador o Líder, escritura solo
 * Coordinador.
 */
@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RolController {

    private final RolService rolService;

    @PostMapping
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<RolResponse>> crear(
            @Valid @RequestBody RolRequest request, Authentication authentication) {
        RolResponse creado = rolService.crear(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Rol creado correctamente.", creado));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<List<RolResponse>>> listar(
            @RequestParam(name = "soloActivos", defaultValue = "false") boolean soloActivos) {
        List<RolResponse> roles = soloActivos ? rolService.listarActivos() : rolService.listarTodos();
        return ResponseEntity.ok(ApiResponse.of(roles));
    }

    @GetMapping("/{idRol}")
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<RolResponse>> obtenerPorId(@PathVariable Integer idRol) {
        return ResponseEntity.ok(ApiResponse.of(rolService.obtenerPorId(idRol)));
    }

    @PutMapping("/{idRol}")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<RolResponse>> actualizar(
            @PathVariable Integer idRol, @Valid @RequestBody RolRequest request, Authentication authentication) {
        RolResponse actualizado = rolService.actualizar(idRol, request, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Rol actualizado correctamente.", actualizado));
    }

    @PatchMapping("/{idRol}/estado")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<RolResponse>> cambiarEstado(
            @PathVariable Integer idRol, @RequestParam boolean activo, Authentication authentication) {
        RolResponse actualizado = rolService.cambiarEstado(idRol, activo, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of(
                activo ? "Rol activado correctamente." : "Rol desactivado correctamente.", actualizado));
    }

    @DeleteMapping("/{idRol}")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<Void>> eliminar(
            @PathVariable Integer idRol, Authentication authentication) {
        rolService.eliminar(idRol, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Rol eliminado correctamente."));
    }
}
