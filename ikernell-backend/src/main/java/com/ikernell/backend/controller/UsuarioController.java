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
    public ResponseEntity<ApiResponse<UsuarioResponse>> crear(
            @Valid @RequestBody UsuarioRequest request, Authentication authentication) {
        UsuarioResponse creado = usuarioService.crear(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Usuario creado correctamente.", creado));
    }

    /**
     * CORREGIDO: además de Coordinador, el Líder de Proyecto también
     * necesita listar usuarios -- según el caso de estudio, el Líder
     * "asigna desarrolladores al proyecto", lo cual es imposible sin
     * poder ver primero qué desarrolladores existen.
     */
    @GetMapping
    @PreAuthorize("hasAnyRole("
            + "T(com.ikernell.backend.constants.RolConstantes).COORDINADOR, "
            + "T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<List<UsuarioResponse>>> listar(
            @RequestParam(name = "soloActivos", defaultValue = "false") boolean soloActivos) {
        List<UsuarioResponse> usuarios = soloActivos ? usuarioService.listarActivos() : usuarioService.listarTodos();
        return ResponseEntity.ok(ApiResponse.of(usuarios));
    }

    /**
     * NUEVO: "quién soy yo". El JWT solo lleva correo+rol en sus claims,
     * no el idUsuario -- sin este endpoint, el frontend no tiene forma de
     * recuperar el perfil propio completo después de un refresh de página.
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UsuarioResponse>> miPerfil(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.of(usuarioService.obtenerMiPerfil(authentication.getName())));
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<ApiResponse<UsuarioResponse>> obtenerPorId(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(ApiResponse.of(usuarioService.obtenerPorId(idUsuario)));
    }

    @PutMapping("/{idUsuario}")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<UsuarioResponse>> actualizar(
            @PathVariable Integer idUsuario, @Valid @RequestBody UsuarioUpdateRequest request,
            Authentication authentication) {
        UsuarioResponse actualizado = usuarioService.actualizar(idUsuario, request, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Usuario actualizado correctamente.", actualizado));
    }

    @PatchMapping("/{idUsuario}/estado")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<UsuarioResponse>> cambiarEstado(
            @PathVariable Integer idUsuario, @RequestParam boolean activo, Authentication authentication) {
        UsuarioResponse actualizado = usuarioService.cambiarEstado(idUsuario, activo, authentication.getName());
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