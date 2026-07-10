package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.RegistroErrorRequest;
import com.ikernell.backend.dto.RegistroErrorResponse;
import com.ikernell.backend.service.RegistroErrorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Sin @PreAuthorize específico: cualquier autenticado puede registrar,
 * leer y cambiar el estado (el propio Desarrollador registra sus
 * errores; el Líder/Coordinador los leen y también pueden actualizar el
 * estado desde la vista de supervisión). No tiene PUT -- los campos del
 * error no se editan, solo su estado.
 */
@RestController
@RequestMapping("/api/registros-error")
@RequiredArgsConstructor
public class RegistroErrorController {

    private final RegistroErrorService registroErrorService;

    @PostMapping
    public ResponseEntity<ApiResponse<RegistroErrorResponse>> crear(
            @Valid @RequestBody RegistroErrorRequest request) {
        RegistroErrorResponse creado = registroErrorService.crear(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Registro de error creado correctamente.", creado));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RegistroErrorResponse>>> listar(
            @RequestParam(name = "idActividad", required = false) Integer idActividad) {
        List<RegistroErrorResponse> registros = idActividad != null
                ? registroErrorService.listarPorActividad(idActividad)
                : registroErrorService.listarTodos();
        return ResponseEntity.ok(ApiResponse.of(registros));
    }

    @GetMapping("/{idRegistroError}")
    public ResponseEntity<ApiResponse<RegistroErrorResponse>> obtenerPorId(
            @PathVariable Integer idRegistroError) {
        return ResponseEntity.ok(ApiResponse.of(registroErrorService.obtenerPorId(idRegistroError)));
    }

    @PatchMapping("/{idRegistroError}/estado")
    public ResponseEntity<ApiResponse<RegistroErrorResponse>> cambiarEstado(
            @PathVariable Integer idRegistroError, @RequestParam String estado) {
        RegistroErrorResponse actualizado = registroErrorService.cambiarEstado(idRegistroError, estado);
        return ResponseEntity.ok(ApiResponse.of("Estado del error actualizado correctamente.", actualizado));
    }
}
