package com.ikernell.backend.service;

import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.constants.RolConstantes;
import com.ikernell.backend.dto.UsuarioResponse;
import com.ikernell.backend.entity.Rol;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.mapper.UsuarioMapper;
import com.ikernell.backend.repository.EspecialidadRepository;
import com.ikernell.backend.repository.ProfesionRepository;
import com.ikernell.backend.repository.RolRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Cubre las reglas de negocio de UsuarioService.cambiarEstado, que en la
 * matriz de roles aparecen como "Inhabilitar Coordinador: bloqueado" y el
 * auto-cuidado de no dejar a un Coordinador desactivarse a sí mismo. Son
 * reglas que solo viven en el Service (no en un @PreAuthorize), así que sin
 * este test serían afirmaciones no verificadas.
 */
@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private RolRepository rolRepository;
    @Mock
    private ProfesionRepository profesionRepository;
    @Mock
    private EspecialidadRepository especialidadRepository;
    @Mock
    private UsuarioMapper usuarioMapper;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private NotificacionService notificacionService;
    @Mock
    private TrazabilidadService trazabilidadService;
    @Mock
    private CodigoGeneradorService codigoGeneradorService;

    @InjectMocks
    private UsuarioService usuarioService;

    private static final String CORREO_COORD = "coordinador@ikernell.com";

    private Usuario coordinadorSolicitante;

    @BeforeEach
    void setUp() {
        coordinadorSolicitante = usuarioConRol(1, CORREO_COORD, RolConstantes.COORDINADOR);
        when(usuarioRepository.findByCorreoElectronico(CORREO_COORD))
                .thenReturn(Optional.of(coordinadorSolicitante));
    }

    private Usuario usuarioConRol(int id, String correo, String codigoRol) {
        return Usuario.builder()
                .idUsuario(id)
                .codigoUsuario("USR-00" + id)
                .correoElectronico(correo)
                .activo(true)
                .rol(Rol.builder().codigoRol(codigoRol).build())
                .build();
    }

    @Test
    void cambiarEstado_rechaza_cuandoIntentasCambiarTuPropioEstado() {
        // El solicitante y el objetivo son el mismo id (1): el lookup del
        // objetivo devuelve al propio solicitante, y la regla de auto-cuidado
        // corta antes de guardar.
        when(usuarioRepository.findById(1)).thenReturn(Optional.of(coordinadorSolicitante));

        assertThatThrownBy(() ->
                usuarioService.cambiarEstado(1, false, CORREO_COORD))
                .isInstanceOf(BusinessException.class);

        verify(usuarioRepository, never()).save(any());
    }

    @Test
    void cambiarEstado_rechaza_alIntentarInhabilitarAOtroCoordinador() {
        Usuario otroCoordinador = usuarioConRol(2, "otro.coord@ikernell.com", RolConstantes.COORDINADOR);
        when(usuarioRepository.findById(2)).thenReturn(Optional.of(otroCoordinador));

        assertThatThrownBy(() ->
                usuarioService.cambiarEstado(2, false, CORREO_COORD))
                .isInstanceOf(BusinessException.class);

        verify(usuarioRepository, never()).save(any());
    }

    @Test
    void cambiarEstado_permite_inhabilitarAUnDesarrollador() {
        Usuario desarrollador = usuarioConRol(3, "dev@ikernell.com", RolConstantes.DESARROLLADOR);
        when(usuarioRepository.findById(3)).thenReturn(Optional.of(desarrollador));
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(inv -> inv.getArgument(0));
        when(usuarioMapper.toResponse(any(Usuario.class)))
                .thenReturn(UsuarioResponse.builder().idUsuario(3).activo(false).build());

        UsuarioResponse resultado = usuarioService.cambiarEstado(3, false, CORREO_COORD);

        assertThat(desarrollador.getActivo()).isFalse();
        assertThat(resultado.getActivo()).isFalse();
        verify(usuarioRepository).save(desarrollador);
        verify(trazabilidadService).registrar(any(), any(), any(), any(), any());
    }
}
