package com.ikernell.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * ================= TEMPORAL =================
 * Esta configuración deja TODOS los endpoints abiertos, sin autenticación.
 * Es intencional mientras se construyen los catálogos base (Sprint 1).
 *
 * Se reemplaza por completo en el Sprint 2, cuando se implemente JWT:
 * ahí sí se definirán qué endpoints requieren autenticación y qué rol
 * puede acceder a cada uno.
 *
 * No confundir con una decisión de diseño final: esto NO debe llegar
 * así hasta el final del proyecto.
 * =============================================
 */
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

        return http.build();
    }
}
