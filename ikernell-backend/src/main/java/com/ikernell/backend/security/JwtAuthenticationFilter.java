package com.ikernell.backend.security;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String PREFIJO_BEARER = "Bearer ";

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        try {
            autenticarSiHayTokenValido(request);
        } catch (Exception ex) {
            // Defensa en profundidad: cualquier fallo al procesar el token
            // (esperado o inesperado) nunca debe tumbar la petición. Un
            // endpoint público jamás debe fallar por culpa de un token
            // corrupto/expirado enviado de forma incidental por el cliente.
            SecurityContextHolder.clearContext();
            log.debug("Token JWT ignorado ({}): la petición continúa como no autenticada.",
                    ex.getClass().getSimpleName());
        }

        filterChain.doFilter(request, response);
    }

    private void autenticarSiHayTokenValido(HttpServletRequest request) {
        String encabezadoAuth = request.getHeader("Authorization");

        if (encabezadoAuth == null || !encabezadoAuth.startsWith(PREFIJO_BEARER)) {
            return;
        }

        String token = encabezadoAuth.substring(PREFIJO_BEARER.length());

        try {
            String correoElectronico = jwtService.extraerCorreo(token);

            if (correoElectronico == null || SecurityContextHolder.getContext().getAuthentication() != null) {
                return;
            }

            UserDetails userDetails = userDetailsService.loadUserByUsername(correoElectronico);

            if (jwtService.esTokenValido(token, userDetails.getUsername())) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (JwtException | UsernameNotFoundException ex) {
            // Casos ESPERADOS y rutinarios: token expirado, corrupto, o el
            // usuario del token ya no existe/fue inhabilitado. No son un
            // error del sistema, así que no se registran como tal.
            SecurityContextHolder.clearContext();
        }
    }
}