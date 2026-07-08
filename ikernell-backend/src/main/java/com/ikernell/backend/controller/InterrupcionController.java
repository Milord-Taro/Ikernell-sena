package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.InterrupcionRequest;
import com.ikernell.backend.dto.InterrupcionResponse;
import com.ikernell.backend.service.InterrupcionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/interrupciones")
@RequiredArgsConstructor
public class InterrupcionController {

    private final InterrupcionService interrupcionService;

    @PostMapping
    public ResponseEntity<ApiResponse<InterrupcionResponse>> crear(
            @Valid @RequestBody InterrupcionRequest request) {
        InterrupcionResponse creada = interrupcionService.crear(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Interrupción registrada correctamente.", creada));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<InterrupcionResponse>>> listar(
            @RequestParam(name = "idActividad", required = false) Integer idActividad) {
        List<InterrupcionResponse> interrupciones = idActividad != null
                ? interrupcionService.listarPorActividad(idActividad)
                : interrupcionService.listarTodos();
        return ResponseEntity.ok(ApiResponse.of(interrupciones));
    }

    @GetMapping("/{idInterrupcion}")
    public ResponseEntity<ApiResponse<InterrupcionResponse>> obtenerPorId(
            @PathVariable Integer idInterrupcion) {
        return ResponseEntity.ok(ApiResponse.of(interrupcionService.obtenerPorId(idInterrupcion)));
    }
}
