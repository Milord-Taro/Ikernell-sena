package com.ikernell.backend.service;

import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.constants.RolConstantes;
import com.ikernell.backend.dto.AsignacionProyectoRequest;
import com.ikernell.backend.dto.AsignacionProyectoResponse;
import com.ikernell.backend.dto.NotificacionRequest;
import com.ikernell.backend.entity.AsignacionProyecto;
import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.entity.Rol;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.RolProyecto;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.mapper.AsignacionProyectoMapper;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.ProyectoRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * AsignacionProyectoService.crear concentra las reglas de negocio de "quién
 * puede estar en el equipo de un proyecto y con qué rol". Antes de este test
 * no había cobertura, y encima acá vive el arreglo P0.2 (un solo Líder
 * vigente por proyecto): se verifica que al reasignar líder se desvincula al
 * anterior CON flush previo, y que una violación del índice único degrada a
 * 409 en vez de 500. Complementa a AutorizacionProyectoServiceTest, que
 * cubre el "puede gestionar", no el "puede pertenecer".
 */
@ExtendWith(MockitoExtension.class)
class AsignacionProyectoServiceTest {

    @Mock
    private AsignacionProyectoRepository asignacionProyectoRepository;
    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private ProyectoRepository proyectoRepository;
    @Mock
    private AsignacionProyectoMapper asignacionProyectoMapper;
    @Mock
    private AutorizacionProyectoService autorizacionProyectoService;
    @Mock
    private NotificacionService notificacionService;
    @Mock
    private TrazabilidadService trazabilidadService;

    @InjectMocks
    private AsignacionProyectoService asignacionProyectoService;

    private static final String CORREO_SOLICITANTE = "coordinador@ikernell.com";
    private static final int ID_PROYECTO = 10;

    private Proyecto proyecto;
    private Usuario liderOrg;
    private Usuario desarrolladorOrg;
    private Usuario coordinadorOrg;

    @BeforeEach
    void setUp() {
        proyecto = Proyecto.builder()
                .idProyecto(ID_PROYECTO)
                .nombreProyecto("Proyecto de prueba")
                .build();

        liderOrg = usuarioConRol(2, "lider.org@ikernell.com", RolConstantes.LIDER_PROYECTO);
        desarrolladorOrg = usuarioConRol(3, "dev.org@ikernell.com", RolConstantes.DESARROLLADOR);
        coordinadorOrg = usuarioConRol(4, "coord.org@ikernell.com", RolConstantes.COORDINADOR);

        // El solicitante siempre puede gestionar el proyecto en estos tests;
        // lenient porque algún test corta antes de llegar a usarlo.
        lenient().when(autorizacionProyectoService.verificarPuedeGestionar(CORREO_SOLICITANTE, ID_PROYECTO))
                .thenReturn(usuarioConRol(1, CORREO_SOLICITANTE, RolConstantes.COORDINADOR));
        lenient().when(proyectoRepository.findById(ID_PROYECTO)).thenReturn(Optional.of(proyecto));
    }

    private Usuario usuarioConRol(int id, String correo, String codigoRol) {
        return Usuario.builder()
                .idUsuario(id)
                .correoElectronico(correo)
                .rol(Rol.builder().codigoRol(codigoRol).build())
                .build();
    }

    private AsignacionProyectoRequest request(int idUsuario, RolProyecto rol) {
        return new AsignacionProyectoRequest(idUsuario, ID_PROYECTO, rol);
    }

    // ---------- reglas de rol ----------

    @Test
    void crear_rechaza_cuandoElUsuarioEsCoordinador() {
        when(usuarioRepository.findById(4)).thenReturn(Optional.of(coordinadorOrg));

        assertThatThrownBy(() ->
                asignacionProyectoService.crear(request(4, RolProyecto.DESARROLLADOR), CORREO_SOLICITANTE))
                .isInstanceOf(BusinessException.class);

        verify(asignacionProyectoRepository, never()).saveAndFlush(any());
    }

    @Test
    void crear_rechaza_cuandoSeAsignaComoLiderAUnUsuarioQueNoEsLiderOrganizacional() {
        // Un Desarrollador organizacional NO puede ocupar el puesto de Líder
        // de un proyecto: eso sería un cambio de rol, no una asignación.
        when(usuarioRepository.findById(3)).thenReturn(Optional.of(desarrolladorOrg));

        assertThatThrownBy(() ->
                asignacionProyectoService.crear(request(3, RolProyecto.LIDER), CORREO_SOLICITANTE))
                .isInstanceOf(BusinessException.class);

        verify(asignacionProyectoRepository, never()).saveAndFlush(any());
    }

    @Test
    void crear_rechaza_cuandoElUsuarioYaTieneAsignacionVigenteEnEseProyecto() {
        when(usuarioRepository.findById(3)).thenReturn(Optional.of(desarrolladorOrg));
        when(asignacionProyectoRepository
                .findByUsuario_IdUsuarioAndProyecto_IdProyectoAndFechaDesvinculacionIsNull(3, ID_PROYECTO))
                .thenReturn(Optional.of(AsignacionProyecto.builder().build()));

        assertThatThrownBy(() ->
                asignacionProyectoService.crear(request(3, RolProyecto.DESARROLLADOR), CORREO_SOLICITANTE))
                .isInstanceOf(ConflictException.class);

        verify(asignacionProyectoRepository, never()).saveAndFlush(any());
    }

    // ---------- P0.2: un solo Líder vigente por proyecto ----------

    @Test
    void crear_desvinculaAlLiderAnterior_conFlush_alAsignarUnNuevoLider() {
        Usuario liderSaliente = usuarioConRol(9, "saliente@ikernell.com", RolConstantes.LIDER_PROYECTO);
        AsignacionProyecto asignacionAnterior = AsignacionProyecto.builder()
                .idAsignacionProyecto(500)
                .usuario(liderSaliente)
                .proyecto(proyecto)
                .rolProyecto(RolProyecto.LIDER)
                .build();

        when(usuarioRepository.findById(2)).thenReturn(Optional.of(liderOrg));
        when(asignacionProyectoRepository
                .findByUsuario_IdUsuarioAndProyecto_IdProyectoAndFechaDesvinculacionIsNull(2, ID_PROYECTO))
                .thenReturn(Optional.empty());
        when(asignacionProyectoRepository
                .findByProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(ID_PROYECTO, RolProyecto.LIDER))
                .thenReturn(Optional.of(asignacionAnterior));
        when(asignacionProyectoMapper.toEntity(any())).thenReturn(AsignacionProyecto.builder().build());
        when(asignacionProyectoRepository.saveAndFlush(any())).thenAnswer(inv -> inv.getArgument(0));
        when(asignacionProyectoMapper.toResponse(any()))
                .thenReturn(AsignacionProyectoResponse.builder().idAsignacionProyecto(501).build());

        asignacionProyectoService.crear(request(2, RolProyecto.LIDER), CORREO_SOLICITANTE);

        // El líder saliente quedó desvinculado HOY y su UPDATE se forzó con
        // saveAndFlush ANTES de insertar el nuevo (sin esto, el índice
        // uq_lider_vigente_por_proyecto rompería el reemplazo normal).
        assertThat(asignacionAnterior.getFechaDesvinculacion()).isEqualTo(LocalDate.now());
        verify(asignacionProyectoRepository).saveAndFlush(asignacionAnterior);
        // Dos saveAndFlush en total: el del saliente y el del nuevo líder.
        verify(asignacionProyectoRepository, times(2)).saveAndFlush(any());

        // Y al saliente se le notifica que ya no es líder.
        ArgumentCaptor<NotificacionRequest> captor = ArgumentCaptor.forClass(NotificacionRequest.class);
        verify(notificacionService, times(2)).crear(captor.capture());
        List<Integer> destinatarios = captor.getAllValues().stream()
                .map(NotificacionRequest::getIdUsuario).toList();
        assertThat(destinatarios).contains(9);  // el líder saliente
    }

    @Test
    void crear_traduceViolacionDelIndice_a409_enCarreraDeDosLideres() {
        // Dos asignaciones de líder concurrentes: ninguna ve un líder previo
        // (findBy...LIDER vacío para ambas), pero el índice único rechaza la
        // segunda al insertar. Debe salir ConflictException, no un 500.
        when(usuarioRepository.findById(2)).thenReturn(Optional.of(liderOrg));
        when(asignacionProyectoRepository
                .findByUsuario_IdUsuarioAndProyecto_IdProyectoAndFechaDesvinculacionIsNull(2, ID_PROYECTO))
                .thenReturn(Optional.empty());
        when(asignacionProyectoRepository
                .findByProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(ID_PROYECTO, RolProyecto.LIDER))
                .thenReturn(Optional.empty());
        when(asignacionProyectoMapper.toEntity(any())).thenReturn(AsignacionProyecto.builder().build());
        when(asignacionProyectoRepository.saveAndFlush(any()))
                .thenThrow(new DataIntegrityViolationException("uq_lider_vigente_por_proyecto"));

        assertThatThrownBy(() ->
                asignacionProyectoService.crear(request(2, RolProyecto.LIDER), CORREO_SOLICITANTE))
                .isInstanceOf(ConflictException.class);

        // No se notifica ni se audita una asignación que nunca se consumó.
        verify(notificacionService, never()).crear(any());
        verify(trazabilidadService, never()).registrar(any(), any(), any(), any(), any());
    }

    // ---------- happy path ----------

    @Test
    void crear_asignaDesarrollador_notificaAlUsuarioYRegistraTrazabilidad() {
        when(usuarioRepository.findById(3)).thenReturn(Optional.of(desarrolladorOrg));
        when(asignacionProyectoRepository
                .findByUsuario_IdUsuarioAndProyecto_IdProyectoAndFechaDesvinculacionIsNull(3, ID_PROYECTO))
                .thenReturn(Optional.empty());
        when(asignacionProyectoMapper.toEntity(any())).thenReturn(AsignacionProyecto.builder().build());
        when(asignacionProyectoRepository.saveAndFlush(any())).thenAnswer(inv -> inv.getArgument(0));
        when(asignacionProyectoMapper.toResponse(any()))
                .thenReturn(AsignacionProyectoResponse.builder().idAsignacionProyecto(700).build());

        AsignacionProyectoResponse resultado =
                asignacionProyectoService.crear(request(3, RolProyecto.DESARROLLADOR), CORREO_SOLICITANTE);

        assertThat(resultado.getIdAsignacionProyecto()).isEqualTo(700);
        // Un Desarrollador no dispara el branch de reemplazo de líder.
        verify(asignacionProyectoRepository, never())
                .findByProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(any(), any());
        verify(notificacionService, times(1)).crear(any());
        verify(trazabilidadService).registrar(any(), any(), any(), any(), any());
    }

    // ---------- desvincular ----------

    @Test
    void desvincular_rechaza_siLaAsignacionYaEstabaDesvinculada() {
        AsignacionProyecto yaDesvinculada = AsignacionProyecto.builder()
                .idAsignacionProyecto(800)
                .usuario(desarrolladorOrg)
                .proyecto(proyecto)
                .rolProyecto(RolProyecto.DESARROLLADOR)
                .fechaDesvinculacion(LocalDate.now().minusDays(1))
                .build();
        when(asignacionProyectoRepository.findById(800)).thenReturn(Optional.of(yaDesvinculada));
        when(autorizacionProyectoService.verificarPuedeGestionar(CORREO_SOLICITANTE, ID_PROYECTO))
                .thenReturn(coordinadorOrg);

        assertThatThrownBy(() ->
                asignacionProyectoService.desvincular(800, CORREO_SOLICITANTE))
                .isInstanceOf(BusinessException.class);

        verify(asignacionProyectoRepository, never()).save(any());
    }
}
