package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.TipoInterrupcionRequest;
import com.ikernell.backend.dto.TipoInterrupcionResponse;
import com.ikernell.backend.service.TipoInterrupcionService;
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

@RestController
@RequestMapping("/api/tipos-interrupcion")
@RequiredArgsConstructor
public class TipoInterrupcionController {

    private final TipoInterrupcionService tipoInterrupcionService;

    @PostMapping
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<TipoInterrupcionResponse>> crear(
            @Valid @RequestBody TipoInterrupcionRequest request, Authentication authentication) {
        TipoInterrupcionResponse creado = tipoInterrupcionService.crear(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Tipo de interrupción creado correctamente.", creado));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TipoInterrupcionResponse>>> listar(
            @RequestParam(name = "soloActivos", defaultValue = "false") boolean soloActivos) {
        List<TipoInterrupcionResponse> tipos = soloActivos
                ? tipoInterrupcionService.listarActivos() : tipoInterrupcionService.listarTodos();
        return ResponseEntity.ok(ApiResponse.of(tipos));
    }

    @GetMapping("/{idTipoInterrupcion}")
    public ResponseEntity<ApiResponse<TipoInterrupcionResponse>> obtenerPorId(
            @PathVariable Integer idTipoInterrupcion) {
        return ResponseEntity.ok(ApiResponse.of(tipoInterrupcionService.obtenerPorId(idTipoInterrupcion)));
    }

    @PutMapping("/{idTipoInterrupcion}")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<TipoInterrupcionResponse>> actualizar(
            @PathVariable Integer idTipoInterrupcion, @Valid @RequestBody TipoInterrupcionRequest request,
            Authentication authentication) {
        TipoInterrupcionResponse actualizado =
                tipoInterrupcionService.actualizar(idTipoInterrupcion, request, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Tipo de interrupción actualizado correctamente.", actualizado));
    }

    @PatchMapping("/{idTipoInterrupcion}/estado")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<TipoInterrupcionResponse>> cambiarEstado(
            @PathVariable Integer idTipoInterrupcion, @RequestParam boolean activo, Authentication authentication) {
        TipoInterrupcionResponse actualizado =
                tipoInterrupcionService.cambiarEstado(idTipoInterrupcion, activo, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of(
                activo ? "Tipo de interrupción activado." : "Tipo de interrupción desactivado.", actualizado));
    }

    @DeleteMapping("/{idTipoInterrupcion}")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<Void>> eliminar(
            @PathVariable Integer idTipoInterrupcion, Authentication authentication) {
        tipoInterrupcionService.eliminar(idTipoInterrupcion, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Tipo de interrupción eliminado correctamente."));
    }
}
