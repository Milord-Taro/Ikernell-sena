package com.ikernell.backend.service;

import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.repository.UsuarioRepository;
import com.ikernell.backend.security.TokenRecuperacionStore;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecuperacionContrasenaService {

    private final UsuarioRepository usuarioRepository;
    private final TokenRecuperacionStore tokenStore;
    private final PasswordEncoder passwordEncoder;

    /**
     * SIMULADO: no envía correo real todavía (eso llega en el Sprint 6 con
     * el módulo notification/). Por ahora solo registra el token en el log,
     * simulando el enlace que se enviaría por correo.
     */
    public void solicitarRecuperacion(String correoElectronico) {
        String correo = correoElectronico.toLowerCase();

        usuarioRepository.findByCorreoElectronico(correo).ifPresent(usuario -> {
            String token = tokenStore.generarToken(correo);
            log.info("[SIMULADO] Enlace de recuperación para {}: token={}", correo, token);
        });

        // Sin importar si el correo existe o no, la respuesta al cliente es
        // siempre la misma (ver AuthController): evita que este endpoint se
        // use para averiguar qué correos están registrados en el sistema.
    }

    @Transactional
    public void restablecerContrasena(String token, String nuevaContrasena) {
        String correoElectronico = tokenStore.consumirToken(token);

        if (correoElectronico == null) {
            throw new BusinessException("El token de recuperación no es válido o ya expiró.");
        }

        Usuario usuario = usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElseThrow(() -> new BusinessException("El token de recuperación no es válido o ya expiró."));

        usuario.setHashContrasena(passwordEncoder.encode(nuevaContrasena));
        usuarioRepository.save(usuario);
    }
}
