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
     * SIMULADO A PROPÓSITO (caso de estudio, sin proveedor de correo real
     * como Outlook/Gmail detrás): en vez de enviar un correo, el código se
     * devuelve directamente en la respuesta para que el frontend lo
     * muestre en pantalla y el usuario lo copie/pegue en el siguiente
     * paso. Esto es intencionalmente menos seguro que un flujo real (revela
     * si el correo existe, y el "canal de entrega" es la propia respuesta
     * HTTP) -- válido para esta demo, pero el día que haya envío de correo
     * real esto debe volver a null/void y el código viajar solo por email.
     */
    public String solicitarRecuperacion(String correoElectronico) {
        String correo = correoElectronico.toLowerCase();

        return usuarioRepository.findByCorreoElectronico(correo)
                .map(usuario -> {
                    String token = tokenStore.generarToken(correo);
                    log.info("[SIMULADO] Código de recuperación para {}: token={}", correo, token);
                    return token;
                })
                .orElse(null);
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
