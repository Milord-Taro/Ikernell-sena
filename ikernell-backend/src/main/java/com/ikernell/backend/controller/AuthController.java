package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.LoginRequest;
import com.ikernell.backend.dto.LoginResponse;
import com.ikernell.backend.service.AuthService;
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

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse respuesta = authService.login(request);

        return ResponseEntity.ok(ApiResponse.of("Inicio de sesión exitoso.", respuesta));
    }
}
