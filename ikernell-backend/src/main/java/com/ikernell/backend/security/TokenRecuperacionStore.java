package com.ikernell.backend.security;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * ================= TEMPORAL / SIMULADO =================
 * Almacena tokens de recuperación de contraseña EN MEMORIA (se pierden si
 * la app se reinicia, y no funcionaría con más de una instancia del backend
 * corriendo a la vez). Es intencional: todavía no existe envío real de
 * correo, eso llega en el Sprint 6 junto con el módulo notification/.
 *
 * Cuando se implemente el envío real, esto debe reemplazarse por una tabla
 * persistente (ej. token_recuperacion) en la base de datos.
 * =========================================================
 */
@Component
public class TokenRecuperacionStore {

    private static final long VIGENCIA_MINUTOS = 15;

    private final Map<String, EntradaToken> tokens = new ConcurrentHashMap<>();

    public String generarToken(String correoElectronico) {
        // Limpieza oportunista: un token que se genera pero nunca se consume
        // (el usuario pidió recuperar y no completó el flujo) se quedaría en el
        // mapa para siempre. Purgar los expirados en cada alta acota el
        // crecimiento sin necesitar un @Scheduled aparte.
        purgarExpirados();

        String token = UUID.randomUUID().toString();
        LocalDateTime expiracion = LocalDateTime.now().plusMinutes(VIGENCIA_MINUTOS);

        tokens.put(token, new EntradaToken(correoElectronico, expiracion));

        return token;
    }

    private void purgarExpirados() {
        LocalDateTime ahora = LocalDateTime.now();
        tokens.values().removeIf(entrada -> entrada.expiracion().isBefore(ahora));
    }

    /**
     * Valida y consume el token (uso único): si es válido, lo elimina y
     * devuelve el correo asociado; si no existe o ya expiró, devuelve null.
     */
    public String consumirToken(String token) {
        EntradaToken entrada = tokens.remove(token);

        if (entrada == null || entrada.expiracion().isBefore(LocalDateTime.now())) {
            return null;
        }

        return entrada.correoElectronico();
    }

    private record EntradaToken(String correoElectronico, LocalDateTime expiracion) {
    }
}
