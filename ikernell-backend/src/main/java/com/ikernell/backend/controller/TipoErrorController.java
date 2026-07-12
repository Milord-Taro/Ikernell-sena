package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.TipoErrorRequest;
import com.ikernell.backend.dto.TipoErrorResponse;
import com.ikernell.backend.service.TipoErrorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
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

/**
 * A diferencia de Profesion/Especialidad, aquí el GET queda abierto a
 * cualquier autenticado: un Desarrollador necesita listarlo directamente
 * para elegir un tipo al registrar un RegistroError (Sprint 5), no lo ve
 * solo anidado en otra respuesta.
 */
@RestController
@RequestMapping("/api/tipos-error")
@RequiredArgsConstructor
public class TipoErrorController {

    private final TipoErrorService tipoErrorService;

    @PostMapping
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<TipoErrorResponse>> crear(
            @Valid @RequestBody TipoErrorRequest request, Authentication authentication) {
        TipoErrorResponse creado = tipoErrorService.crear(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Tipo de error creado correctamente.", creado));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TipoErrorResponse>>> listar(
            @RequestParam(name = "soloActivos", defaultValue = "false") boolean soloActivos) {
        List<TipoErrorResponse> tipos = soloActivos
                ? tipoErrorService.listarActivos() : tipoErrorService.listarTodos();
        return ResponseEntity.ok(ApiResponse.of(tipos));
    }

    @GetMapping("/{idTipoError}")
    public ResponseEntity<ApiResponse<TipoErrorResponse>> obtenerPorId(@PathVariable Integer idTipoError) {
        return ResponseEntity.ok(ApiResponse.of(tipoErrorService.obtenerPorId(idTipoError)));
    }

    @PutMapping("/{idTipoError}")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<TipoErrorResponse>> actualizar(
            @PathVariable Integer idTipoError, @Valid @RequestBody TipoErrorRequest request,
            Authentication authentication) {
        TipoErrorResponse actualizado = tipoErrorService.actualizar(idTipoError, request, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Tipo de error actualizado correctamente.", actualizado));
    }

    @PatchMapping("/{idTipoError}/estado")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<TipoErrorResponse>> cambiarEstado(
            @PathVariable Integer idTipoError, @RequestParam boolean activo, Authentication authentication) {
        TipoErrorResponse actualizado =
                tipoErrorService.cambiarEstado(idTipoError, activo, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of(
                activo ? "Tipo de error activado." : "Tipo de error desactivado.", actualizado));
    }

    @DeleteMapping("/{idTipoError}")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<Void>> eliminar(
            @PathVariable Integer idTipoError, Authentication authentication) {
        tipoErrorService.eliminar(idTipoError, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Tipo de error eliminado correctamente."));
    }
}
