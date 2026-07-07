package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.EspecialidadRequest;
import com.ikernell.backend.dto.EspecialidadResponse;
import com.ikernell.backend.service.EspecialidadService;
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
@RequestMapping("/api/especialidades")
@RequiredArgsConstructor
public class EspecialidadController {

    private final EspecialidadService especialidadService;

    @PostMapping
    public ResponseEntity<ApiResponse<EspecialidadResponse>> crear(@Valid @RequestBody EspecialidadRequest request) {
        EspecialidadResponse creada = especialidadService.crear(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.of("Especialidad creada correctamente.", creada));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<EspecialidadResponse>>> listar(
            @RequestParam(name = "soloActivas", defaultValue = "false") boolean soloActivas) {

        List<EspecialidadResponse> especialidades = soloActivas
                ? especialidadService.listarActivas()
                : especialidadService.listarTodas();

        return ResponseEntity.ok(ApiResponse.of(especialidades));
    }

    @GetMapping("/{idEspecialidad}")
    public ResponseEntity<ApiResponse<EspecialidadResponse>> obtenerPorId(@PathVariable Integer idEspecialidad) {
        return ResponseEntity.ok(ApiResponse.of(especialidadService.obtenerPorId(idEspecialidad)));
    }

    @PutMapping("/{idEspecialidad}")
    public ResponseEntity<ApiResponse<EspecialidadResponse>> actualizar(
            @PathVariable Integer idEspecialidad,
            @Valid @RequestBody EspecialidadRequest request) {

        EspecialidadResponse actualizada = especialidadService.actualizar(idEspecialidad, request);

        return ResponseEntity.ok(ApiResponse.of("Especialidad actualizada correctamente.", actualizada));
    }

    @PatchMapping("/{idEspecialidad}/estado")
    public ResponseEntity<ApiResponse<EspecialidadResponse>> cambiarEstado(
            @PathVariable Integer idEspecialidad,
            @RequestParam boolean activo) {

        EspecialidadResponse actualizada = especialidadService.cambiarEstado(idEspecialidad, activo);

        return ResponseEntity.ok(ApiResponse.of(
                activo ? "Especialidad activada correctamente." : "Especialidad desactivada correctamente.",
                actualizada));
    }
}
