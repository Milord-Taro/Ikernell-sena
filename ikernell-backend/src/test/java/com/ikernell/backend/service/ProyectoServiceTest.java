package com.ikernell.backend.service;

import com.ikernell.backend.constants.RolConstantes;
import com.ikernell.backend.dto.ProyectoResponse;
import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.entity.Rol;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.EstadoProyecto;
import com.ikernell.backend.enums.RolProyecto;
import com.ikernell.backend.exception.ForbiddenException;
import com.ikernell.backend.mapper.ProyectoMapper;
import com.ikernell.backend.mapper.UsuarioMapper;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.ProyectoRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Prueba la regla nueva: un proyecto Cancelado queda bloqueado para
 * cualquiera que no sea Coordinador (ver ProyectoService.cambiarEstado).
 */
@ExtendWith(MockitoExtension.class)
class ProyectoServiceTest {

    @Mock
    private ProyectoRepository proyectoRepository;
    @Mock
    private AsignacionProyectoRepository asignacionProyectoRepository;
    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private ProyectoMapper proyectoMapper;
    @Mock
    private UsuarioMapper usuarioMapper;
    @Mock
    private AutorizacionProyectoService autorizacionProyectoService;
    @Mock
    private com.ikernell.backend.audit.TrazabilidadService trazabilidadService;

    @InjectMocks
    private ProyectoService proyectoService;

    private Proyecto proyectoCancelado;
    private Usuario lider;
    private Usuario coordinador;

    @BeforeEach
    void setUp() {
        proyectoCancelado = Proyecto.builder()
                .idProyecto(1)
                .codigoProyecto("PRY-001")
                .nombreProyecto("Proyecto de prueba")
                .estado(EstadoProyecto.CANCELADO)
                .build();

        lider = Usuario.builder()
                .idUsuario(10)
                .correoElectronico("lider@ikernell.com")
                .rol(Rol.builder().codigoRol(RolConstantes.LIDER_PROYECTO).build())
                .build();

        coordinador = Usuario.builder()
                .idUsuario(20)
                .correoElectronico("coordinador@ikernell.com")
                .rol(Rol.builder().codigoRol(RolConstantes.COORDINADOR).build())
                .build();

        when(proyectoRepository.findById(1)).thenReturn(Optional.of(proyectoCancelado));
    }

    @Test
    void cambiarEstado_rechazaAlLider_cuandoProyectoYaEstaCancelado() {
        when(autorizacionProyectoService.verificarPuedeGestionar("lider@ikernell.com", 1))
                .thenReturn(lider);

        assertThatThrownBy(() ->
                proyectoService.cambiarEstado(1, "Suspendido", "lider@ikernell.com"))
                .isInstanceOf(ForbiddenException.class);
    }

    @Test
    void cambiarEstado_permiteAlCoordinador_cuandoProyectoYaEstaCancelado() {
        when(autorizacionProyectoService.verificarPuedeGestionar("coordinador@ikernell.com", 1))
                .thenReturn(coordinador);
        when(asignacionProyectoRepository
                .findByProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(1, RolProyecto.LIDER))
                .thenReturn(Optional.empty());
        when(proyectoRepository.save(any(Proyecto.class))).thenAnswer(inv -> inv.getArgument(0));
        when(proyectoMapper.toResponse(any(Proyecto.class)))
                .thenReturn(ProyectoResponse.builder().idProyecto(1).estado(EstadoProyecto.SUSPENDIDO).build());

        ProyectoResponse resultado =
                proyectoService.cambiarEstado(1, "Suspendido", "coordinador@ikernell.com");

        assertThat(resultado.getEstado()).isEqualTo(EstadoProyecto.SUSPENDIDO);
        verify(proyectoRepository).save(any(Proyecto.class));
    }
}
