package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.NotificacionRequest;
import com.ikernell.backend.dto.NotificacionResponse;
import com.ikernell.backend.service.NotificacionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
 * Creación manual/administrativa (Coordinador) mientras no exista
 * generación automática desde los demás módulos. Lectura y marcado como
 * leída son siempre sobre las notificaciones DEL PROPIO usuario ("/me"),
 * nunca por id de otro usuario.
 */
@RestController
@RequestMapping("/api/notificaciones")
@RequiredArgsConstructor
public class NotificacionController {

    private final NotificacionService notificacionService;

    @PostMapping
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<NotificacionResponse>> crear(
            @Valid @RequestBody NotificacionRequest request) {
        NotificacionResponse creada = notificacionService.crear(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Notificación creada correctamente.", creada));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<NotificacionResponse>>> misNotificaciones(
            @RequestParam(name = "soloNoLeidas", defaultValue = "false") boolean soloNoLeidas,
            Authentication authentication) {
        List<NotificacionResponse> notificaciones =
                notificacionService.listarMisNotificaciones(authentication.getName(), soloNoLeidas);
        return ResponseEntity.ok(ApiResponse.of(notificaciones));
    }

    @PatchMapping("/{idNotificacion}/leida")
    public ResponseEntity<ApiResponse<NotificacionResponse>> marcarComoLeida(
            @PathVariable Integer idNotificacion, Authentication authentication) {
        NotificacionResponse actualizada =
                notificacionService.marcarComoLeida(idNotificacion, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Notificación marcada como leída.", actualizada));
    }
}
