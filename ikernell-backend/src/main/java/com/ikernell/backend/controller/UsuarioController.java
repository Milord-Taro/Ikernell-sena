package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.CambiarContrasenaRequest;
import com.ikernell.backend.dto.UsuarioRequest;
import com.ikernell.backend.dto.UsuarioResponse;
import com.ikernell.backend.dto.UsuarioUpdateRequest;
import com.ikernell.backend.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<UsuarioResponse>> crear(@Valid @RequestBody UsuarioRequest request) {
        UsuarioResponse creado = usuarioService.crear(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Usuario creado correctamente.", creado));
    }

    // Enumerar la nómina completa es una operación administrativa: solo
    // Coordinador. Distinto de ver un perfil puntual (abajo), que sí puede
    // hacer cualquier trabajador (ej. click en el nombre de un colega).
    @GetMapping
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<List<UsuarioResponse>>> listar(
            @RequestParam(name = "soloActivos", defaultValue = "false") boolean soloActivos) {
        List<UsuarioResponse> usuarios = soloActivos ? usuarioService.listarActivos() : usuarioService.listarTodos();
        return ResponseEntity.ok(ApiResponse.of(usuarios));
    }

    // Abierto a cualquier trabajador autenticado: ver el perfil puntual de
    // un colega (ej. desde un proyecto compartido), no es información
    // sensible a nivel individual.
    @GetMapping("/{idUsuario}")
    public ResponseEntity<ApiResponse<UsuarioResponse>> obtenerPorId(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(ApiResponse.of(usuarioService.obtenerPorId(idUsuario)));
    }

    @PutMapping("/{idUsuario}")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<UsuarioResponse>> actualizar(
            @PathVariable Integer idUsuario, @Valid @RequestBody UsuarioUpdateRequest request) {
        UsuarioResponse actualizado = usuarioService.actualizar(idUsuario, request);
        return ResponseEntity.ok(ApiResponse.of("Usuario actualizado correctamente.", actualizado));
    }

    @PatchMapping("/{idUsuario}/estado")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<UsuarioResponse>> cambiarEstado(
            @PathVariable Integer idUsuario, @RequestParam boolean activo) {
        UsuarioResponse actualizado = usuarioService.cambiarEstado(idUsuario, activo);
        return ResponseEntity.ok(ApiResponse.of(
                activo ? "Usuario activado correctamente." : "Usuario desactivado correctamente.", actualizado));
    }

    @PatchMapping("/me/contrasena")
    public ResponseEntity<ApiResponse<Void>> cambiarMiContrasena(
            Authentication authentication,
            @Valid @RequestBody CambiarContrasenaRequest request) {

        usuarioService.cambiarMiContrasena(authentication.getName(), request);

        return ResponseEntity.ok(ApiResponse.of("Contraseña actualizada correctamente."));
    }
}