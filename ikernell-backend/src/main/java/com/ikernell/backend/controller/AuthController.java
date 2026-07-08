package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.LoginRequest;
import com.ikernell.backend.dto.LoginResponse;
import com.ikernell.backend.dto.RecuperarContrasenaRequest;
import com.ikernell.backend.dto.RestablecerContrasenaRequest;
import com.ikernell.backend.service.AuthService;
import com.ikernell.backend.service.RecuperacionContrasenaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final RecuperacionContrasenaService recuperacionContrasenaService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse respuesta = authService.login(request);
        return ResponseEntity.ok(ApiResponse.of("Inicio de sesión exitoso.", respuesta));
    }

    @PostMapping("/recuperar-contrasena")
    public ResponseEntity<ApiResponse<Void>> recuperarContrasena(
            @Valid @RequestBody RecuperarContrasenaRequest request) {

        recuperacionContrasenaService.solicitarRecuperacion(request.getCorreoElectronico());

        // Mensaje genérico a propósito: no revela si el correo existe o no.
        return ResponseEntity.ok(ApiResponse.of(
                "Si el correo está registrado, se ha enviado un enlace de recuperación."));
    }

    @PostMapping("/restablecer-contrasena")
    public ResponseEntity<ApiResponse<Void>> restablecerContrasena(
            @Valid @RequestBody RestablecerContrasenaRequest request) {

        recuperacionContrasenaService.restablecerContrasena(request.getToken(), request.getNuevaContrasena());

        return ResponseEntity.ok(ApiResponse.of("Contraseña actualizada correctamente."));
    }
}