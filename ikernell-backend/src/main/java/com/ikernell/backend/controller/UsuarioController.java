package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.UsuarioRequest;
import com.ikernell.backend.dto.UsuarioResponse;
import com.ikernell.backend.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<ApiResponse<UsuarioResponse>> crear(@Valid @RequestBody UsuarioRequest request) {
        UsuarioResponse creado = usuarioService.crear(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.of("Usuario creado correctamente.", creado));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UsuarioResponse>>> listar(
            @RequestParam(name = "soloActivos", defaultValue = "false") boolean soloActivos) {

        List<UsuarioResponse> usuarios = soloActivos
                ? usuarioService.listarActivos()
                : usuarioService.listarTodos();

        return ResponseEntity.ok(ApiResponse.of(usuarios));
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<ApiResponse<UsuarioResponse>> obtenerPorId(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(ApiResponse.of(usuarioService.obtenerPorId(idUsuario)));
    }

    @PutMapping("/{idUsuario}")
    public ResponseEntity<ApiResponse<UsuarioResponse>> actualizar(
            @PathVariable Integer idUsuario,
            @Valid @RequestBody UsuarioRequest request) {

        UsuarioResponse actualizado = usuarioService.actualizar(idUsuario, request);

        return ResponseEntity.ok(ApiResponse.of("Usuario actualizado correctamente.", actualizado));
    }

    @PatchMapping("/{idUsuario}/estado")
    public ResponseEntity<ApiResponse<UsuarioResponse>> cambiarEstado(
            @PathVariable Integer idUsuario,
            @RequestParam boolean activo) {

        UsuarioResponse actualizado = usuarioService.cambiarEstado(idUsuario, activo);

        return ResponseEntity.ok(ApiResponse.of(
                activo ? "Usuario activado correctamente." : "Usuario desactivado correctamente.",
                actualizado));
    }
}
