package com.ikernell.backend.service;

import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.dto.ActividadResponse;
import com.ikernell.backend.entity.Actividad;
import com.ikernell.backend.entity.Etapa;
import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.EstadoActividad;
import com.ikernell.backend.enums.EstadoProyecto;
import com.ikernell.backend.exception.ForbiddenException;
import com.ikernell.backend.mapper.ActividadMapper;
import com.ikernell.backend.repository.ActividadRepository;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.EtapaRepository;
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
import static org.mockito.Mockito.when;

/**
 * Prueba la regla de HU-11: solo el desarrollador responsable de la
 * actividad puede cambiar su estado (ver ActividadService.cambiarEstado).
 */
@ExtendWith(MockitoExtension.class)
class ActividadServiceTest {

    @Mock
    private ActividadRepository actividadRepository;
    @Mock
    private EtapaRepository etapaRepository;
    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private ActividadMapper actividadMapper;
    @Mock
    private AutorizacionProyectoService autorizacionProyectoService;
    @Mock
    private AsignacionProyectoRepository asignacionProyectoRepository;
    @Mock
    private TrazabilidadService trazabilidadService;
    @Mock
    private NotificacionService notificacionService;

    @InjectMocks
    private ActividadService actividadService;

    private Actividad actividad;
    private Usuario desarrolladorAsignado;

    @BeforeEach
    void setUp() {
        Proyecto proyectoEnEjecucion = Proyecto.builder()
                .idProyecto(1)
                .nombreProyecto("Proyecto en ejecución")
                .estado(EstadoProyecto.EN_EJECUCION)
                .build();

        Etapa etapa = Etapa.builder()
                .idEtapa(1)
                .proyecto(proyectoEnEjecucion)
                .build();

        desarrolladorAsignado = Usuario.builder()
                .idUsuario(5)
                .correoElectronico("dev.responsable@ikernell.com")
                .build();

        actividad = Actividad.builder()
                .idActividad(100)
                .etapa(etapa)
                .usuario(desarrolladorAsignado)
                .estado(EstadoActividad.PENDIENTE)
                .build();

        when(actividadRepository.findById(100)).thenReturn(Optional.of(actividad));
    }

    @Test
    void cambiarEstado_rechaza_cuandoQuienLoPideNoEsElDesarrolladorAsignado() {
        assertThatThrownBy(() ->
                actividadService.cambiarEstado(100, "En desarrollo", null, "otro.usuario@ikernell.com"))
                .isInstanceOf(ForbiddenException.class);
    }

    @Test
    void cambiarEstado_permite_cuandoQuienLoPideEsElDesarrolladorAsignado() {
        when(actividadRepository.save(any(Actividad.class))).thenAnswer(inv -> inv.getArgument(0));
        when(actividadMapper.toResponse(any(Actividad.class)))
                .thenReturn(ActividadResponse.builder().idActividad(100).build());

        ActividadResponse resultado =
                actividadService.cambiarEstado(100, "En desarrollo", null, "dev.responsable@ikernell.com");

        assertThat(resultado.getIdActividad()).isEqualTo(100);
    }

    @Test
    void cambiarEstado_rechazaAlDesarrollador_cuandoActividadYaEstaCancelada() {
        actividad.setEstado(EstadoActividad.CANCELADA);
        when(autorizacionProyectoService.verificarPuedeGestionar("dev.responsable@ikernell.com", 1))
                .thenThrow(new ForbiddenException("No eres el líder asignado a este proyecto, y no eres Coordinador."));

        assertThatThrownBy(() ->
                actividadService.cambiarEstado(100, "En desarrollo", null, "dev.responsable@ikernell.com"))
                .isInstanceOf(ForbiddenException.class);
    }

    @Test
    void cambiarEstado_permiteAlLiderDelProyecto_cuandoActividadYaEstaCancelada() {
        actividad.setEstado(EstadoActividad.CANCELADA);
        when(autorizacionProyectoService.verificarPuedeGestionar("lider@ikernell.com", 1))
                .thenReturn(Usuario.builder().idUsuario(99).correoElectronico("lider@ikernell.com").build());
        when(actividadRepository.save(any(Actividad.class))).thenAnswer(inv -> inv.getArgument(0));
        when(actividadMapper.toResponse(any(Actividad.class)))
                .thenReturn(ActividadResponse.builder().idActividad(100).build());

        ActividadResponse resultado =
                actividadService.cambiarEstado(100, "En desarrollo", null, "lider@ikernell.com");

        assertThat(resultado.getIdActividad()).isEqualTo(100);
    }
}
