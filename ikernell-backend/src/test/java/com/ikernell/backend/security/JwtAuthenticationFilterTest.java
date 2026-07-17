package com.ikernell.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

/**
 * El filtro es la puerta que se ejecuta en CADA petición autenticada. La
 * regla que más importa acá -- y la que faltaba (ver audit_output.md) -- es
 * que un usuario inhabilitado NO debe quedar autenticado aunque su JWT siga
 * firmado y sin expirar: el estado 'activo' en BD manda sobre el token. La
 * semilla trae un usuario deshabilitado justamente para demostrar esto.
 */
@ExtendWith(MockitoExtension.class)
class JwtAuthenticationFilterTest {

    @Mock
    private JwtService jwtService;
    @Mock
    private CustomUserDetailsService userDetailsService;
    @Mock
    private HttpServletRequest request;
    @Mock
    private HttpServletResponse response;
    @Mock
    private FilterChain filterChain;

    private JwtAuthenticationFilter filtro;

    @BeforeEach
    void setUp() {
        // Construcción manual en vez de @InjectMocks: la inyección por
        // constructor de Mockito falla al reflejar los tipos de parámetro
        // de este filtro, y no aporta nada frente a pasar los mocks a mano.
        filtro = new JwtAuthenticationFilter(jwtService, userDetailsService);
    }

    @AfterEach
    void limpiarContexto() {
        SecurityContextHolder.clearContext();
    }

    private UserDetails usuario(boolean habilitado) {
        return User.builder()
                .username("mateo.salinas@ikernell.com")
                .password("hash")
                .disabled(!habilitado)
                .authorities("ROLE_Desarrollador")
                .build();
    }

    @Test
    void noAutentica_cuandoElUsuarioEstaInhabilitado_aunqueElTokenSeaValido() throws Exception {
        when(request.getHeader("Authorization")).thenReturn("Bearer token-valido");
        when(jwtService.extraerCorreo("token-valido")).thenReturn("mateo.salinas@ikernell.com");
        when(userDetailsService.loadUserByUsername("mateo.salinas@ikernell.com"))
                .thenReturn(usuario(false));
        // El token está firmado y sin expirar: la única razón para rechazarlo
        // es isEnabled() == false. Con lenient() dejamos claro que da igual si
        // el filtro llega o no a validar el token -- no debe autenticar igual.
        lenient().when(jwtService.esTokenValido(anyString(), anyString())).thenReturn(true);

        filtro.doFilterInternal(request, response, filterChain);

        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
    }

    @Test
    void autentica_cuandoElUsuarioEstaHabilitadoYElTokenEsValido() throws Exception {
        when(request.getHeader("Authorization")).thenReturn("Bearer token-valido");
        when(jwtService.extraerCorreo("token-valido")).thenReturn("mateo.salinas@ikernell.com");
        when(userDetailsService.loadUserByUsername("mateo.salinas@ikernell.com"))
                .thenReturn(usuario(true));
        when(jwtService.esTokenValido("token-valido", "mateo.salinas@ikernell.com")).thenReturn(true);

        filtro.doFilterInternal(request, response, filterChain);

        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNotNull();
        assertThat(SecurityContextHolder.getContext().getAuthentication().getName())
                .isEqualTo("mateo.salinas@ikernell.com");
    }

    @Test
    void noAutentica_cuandoNoHayEncabezadoBearer() throws Exception {
        when(request.getHeader("Authorization")).thenReturn(null);

        filtro.doFilterInternal(request, response, filterChain);

        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
    }
}
