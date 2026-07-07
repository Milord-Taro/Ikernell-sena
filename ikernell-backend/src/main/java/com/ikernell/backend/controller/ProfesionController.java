package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.ProfesionRequest;
import com.ikernell.backend.dto.ProfesionResponse;
import com.ikernell.backend.service.ProfesionService;
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
@RequestMapping("/api/profesiones")
@RequiredArgsConstructor
public class ProfesionController {

    private final ProfesionService profesionService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProfesionResponse>> crear(@Valid @RequestBody ProfesionRequest request) {
        ProfesionResponse creada = profesionService.crear(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.of("Profesión creada correctamente.", creada));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProfesionResponse>>> listar(
            @RequestParam(name = "soloActivas", defaultValue = "false") boolean soloActivas) {

        List<ProfesionResponse> profesiones = soloActivas
                ? profesionService.listarActivas()
                : profesionService.listarTodas();

        return ResponseEntity.ok(ApiResponse.of(profesiones));
    }

    @GetMapping("/{idProfesion}")
    public ResponseEntity<ApiResponse<ProfesionResponse>> obtenerPorId(@PathVariable Integer idProfesion) {
        return ResponseEntity.ok(ApiResponse.of(profesionService.obtenerPorId(idProfesion)));
    }

    @PutMapping("/{idProfesion}")
    public ResponseEntity<ApiResponse<ProfesionResponse>> actualizar(
            @PathVariable Integer idProfesion,
            @Valid @RequestBody ProfesionRequest request) {

        ProfesionResponse actualizada = profesionService.actualizar(idProfesion, request);

        return ResponseEntity.ok(ApiResponse.of("Profesión actualizada correctamente.", actualizada));
    }

    @PatchMapping("/{idProfesion}/estado")
    public ResponseEntity<ApiResponse<ProfesionResponse>> cambiarEstado(
            @PathVariable Integer idProfesion,
            @RequestParam boolean activo) {

        ProfesionResponse actualizada = profesionService.cambiarEstado(idProfesion, activo);

        return ResponseEntity.ok(ApiResponse.of(
                activo ? "Profesión activada correctamente." : "Profesión desactivada correctamente.",
                actualizada));
    }
}
