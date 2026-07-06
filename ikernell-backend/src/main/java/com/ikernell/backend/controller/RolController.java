package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.RolRequest;
import com.ikernell.backend.dto.RolResponse;
import com.ikernell.backend.service.RolService;
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
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RolController {

    private final RolService rolService;

    @PostMapping
    public ResponseEntity<ApiResponse<RolResponse>> crear(@Valid @RequestBody RolRequest request) {
        RolResponse creado = rolService.crear(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.of("Rol creado correctamente.", creado));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RolResponse>>> listar(
            @RequestParam(name = "soloActivos", defaultValue = "false") boolean soloActivos) {

        List<RolResponse> roles = soloActivos
                ? rolService.listarActivos()
                : rolService.listarTodos();

        return ResponseEntity.ok(ApiResponse.of(roles));
    }

    @GetMapping("/{idRol}")
    public ResponseEntity<ApiResponse<RolResponse>> obtenerPorId(@PathVariable Integer idRol) {
        return ResponseEntity.ok(ApiResponse.of(rolService.obtenerPorId(idRol)));
    }

    @PutMapping("/{idRol}")
    public ResponseEntity<ApiResponse<RolResponse>> actualizar(
            @PathVariable Integer idRol,
            @Valid @RequestBody RolRequest request) {

        RolResponse actualizado = rolService.actualizar(idRol, request);

        return ResponseEntity.ok(ApiResponse.of("Rol actualizado correctamente.", actualizado));
    }

    @PatchMapping("/{idRol}/estado")
    public ResponseEntity<ApiResponse<RolResponse>> cambiarEstado(
            @PathVariable Integer idRol,
            @RequestParam boolean activo) {

        RolResponse actualizado = rolService.cambiarEstado(idRol, activo);

        return ResponseEntity.ok(ApiResponse.of(
                activo ? "Rol activado correctamente." : "Rol desactivado correctamente.",
                actualizado));
    }
}
