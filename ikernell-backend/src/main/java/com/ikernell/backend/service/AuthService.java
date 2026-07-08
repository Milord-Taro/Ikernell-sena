package com.ikernell.backend.service;

import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.dto.LoginRequest;
import com.ikernell.backend.dto.LoginResponse;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.exception.UnauthorizedException;
import com.ikernell.backend.mapper.UsuarioMapper;
import com.ikernell.backend.repository.UsuarioRepository;
import com.ikernell.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TrazabilidadService trazabilidadService;

    @Transactional
    public LoginResponse login(LoginRequest request) {
        String correo = request.getCorreoElectronico().toLowerCase();

        // Mismo mensaje de error si el correo no existe o la contraseña es
        // incorrecta: evita que alguien pueda deducir qué correos están
        // registrados probando distintos valores (enumeración de usuarios).
        Usuario usuario = usuarioRepository.findByCorreoElectronico(correo)
                .orElseThrow(() -> new UnauthorizedException("Correo o contraseña incorrectos."));

        if (!usuario.getActivo()) {
            throw new UnauthorizedException("El usuario se encuentra inactivo.");
        }

        if (!passwordEncoder.matches(request.getContrasena(), usuario.getHashContrasena())) {
            throw new UnauthorizedException("Correo o contraseña incorrectos.");
        }

        String token = jwtService.generarToken(usuario.getCorreoElectronico(), usuario.getRol().getCodigoRol());

        trazabilidadService.registrar(
                usuario,
                "Usuario",
                usuario.getCodigoUsuario(),
                OperacionTrazabilidad.AUTENTICAR,
                "Inicio de sesión exitoso.");

        return LoginResponse.builder()
                .token(token)
                .tipoToken("Bearer")
                .expiraEnMs(jwtService.getExpiracionMs())
                .usuario(usuarioMapper.toResponse(usuario))
                .build();
    }
}