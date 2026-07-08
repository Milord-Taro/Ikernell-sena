package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.MensajeContactoRequest;
import com.ikernell.backend.dto.MensajeContactoResponse;
import com.ikernell.backend.dto.RespuestaMensajeRequest;
import com.ikernell.backend.service.MensajeContactoService;
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
 * POST /api/mensajes-contacto es PÚBLICO (RF-002, sin autenticación) --
 * requiere agregar la ruta a SecurityConfig.permitAll(). El resto es
 * exclusivo del Coordinador (RF-014: gestiona y responde).
 */
@RestController
@RequestMapping("/api/mensajes-contacto")
@RequiredArgsConstructor
public class MensajeContactoController {

    private final MensajeContactoService mensajeContactoService;

    @PostMapping
    public ResponseEntity<ApiResponse<MensajeContactoResponse>> enviar(
            @Valid @RequestBody MensajeContactoRequest request) {
        MensajeContactoResponse enviado = mensajeContactoService.enviar(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Mensaje enviado correctamente.", enviado));
    }

    @GetMapping
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<List<MensajeContactoResponse>>> listar(
            @RequestParam(name = "estado", required = false) String estado) {
        List<MensajeContactoResponse> mensajes = estado != null
                ? mensajeContactoService.listarPorEstado(estado)
                : mensajeContactoService.listarTodos();
        return ResponseEntity.ok(ApiResponse.of(mensajes));
    }

    @GetMapping("/{idMensajeContacto}")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<MensajeContactoResponse>> obtenerPorId(
            @PathVariable Integer idMensajeContacto) {
        return ResponseEntity.ok(ApiResponse.of(mensajeContactoService.obtenerPorId(idMensajeContacto)));
    }

    @PatchMapping("/{idMensajeContacto}/leido")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<MensajeContactoResponse>> marcarComoLeido(
            @PathVariable Integer idMensajeContacto) {
        MensajeContactoResponse actualizado = mensajeContactoService.marcarComoLeido(idMensajeContacto);
        return ResponseEntity.ok(ApiResponse.of("Mensaje marcado como leído.", actualizado));
    }

    @PatchMapping("/{idMensajeContacto}/responder")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<MensajeContactoResponse>> responder(
            @PathVariable Integer idMensajeContacto,
            @Valid @RequestBody RespuestaMensajeRequest request,
            Authentication authentication) {
        MensajeContactoResponse actualizado = mensajeContactoService.responder(
                idMensajeContacto, request, authentication.getName());
        return ResponseEntity.ok(ApiResponse.of("Respuesta enviada correctamente.", actualizado));
    }
}
