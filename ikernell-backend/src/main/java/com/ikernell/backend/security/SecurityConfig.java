package com.ikernell.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * - /api/auth/login, /api/auth/recuperar-contrasena y
 *   /api/auth/restablecer-contrasena son públicos.
 * - CORREGIDO: /api/auth/** completo YA NO es público -- el nuevo
 *   /api/auth/refrescar necesita sesión vigente (extiende un token que
 *   ya existe, no tiene sentido que alguien sin token lo llame). Antes
 *   el wildcard lo habría dejado público por accidente.
 * - POST /api/mensajes-contacto es público (RF-002: cliente anónimo envía
 *   mensaje sin autenticación). El resto de ese controller SÍ requiere
 *   autenticación (gestionado con @PreAuthorize a nivel de método).
 * - Todo lo demás requiere un JWT válido.
 * - @EnableMethodSecurity habilita @PreAuthorize a nivel de método/clase en
 *   los controllers -- sin esta anotación, Spring Security NUNCA evalúa esas
 *   anotaciones (quedan ahí escritas pero no se ejecutan) y lo único que
 *   protege la API es el anyRequest().authenticated() de abajo, sin
 *   distinguir por rol.
 * - NUEVO: /v3/api-docs/** y /swagger-ui/** quedan permitAll aquí, pero
 *   solo existen de verdad en el perfil dev -- en prod,
 *   springdoc.api-docs.enabled=false / springdoc.swagger-ui.enabled=false
 *   (ver application-prod.properties) desregistran esos controllers por
 *   completo, así que la ruta ni siquiera existe (404) sin importar lo que
 *   diga este permitAll. Documentación interactiva nunca debe quedar
 *   pública en producción.
 */
@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // CORREGIDO: antes el origen permitido estaba fijo en el código a
    // "http://localhost:5173" -- imposible de desplegar sin recompilar.
    // Ahora sale de una property por perfil: dev trae el puerto de Vite
    // como valor por defecto (para no exigir configuración extra en
    // desarrollo local), prod la exige por variable de entorno, sin
    // default, igual que jwt.secret. Admite varios orígenes separados por
    // coma (ej. dominio de producción + un preview de staging).
    @Value("${cors.allowed-origins}")
    private String origenesPermitidos;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(
                                "/api/auth/login",
                                "/api/auth/recuperar-contrasena",
                                "/api/auth/restablecer-contrasena")
                        .permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/mensajes-contacto").permitAll()
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html")
                        .permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        List<String> origenes = Arrays.stream(origenesPermitidos.split(","))
                .map(String::strip)
                .filter(origen -> !origen.isEmpty())
                .toList();

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(origenes);
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
