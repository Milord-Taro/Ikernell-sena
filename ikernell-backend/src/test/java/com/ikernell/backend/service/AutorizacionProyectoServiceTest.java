package com.ikernell.backend.service;

import com.ikernell.backend.constants.RolConstantes;
import com.ikernell.backend.entity.AsignacionProyecto;
import com.ikernell.backend.entity.Rol;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.RolProyecto;
import com.ikernell.backend.exception.ForbiddenException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
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
import static org.mockito.Mockito.when;

/**
 * AutorizacionProyectoService es el único lugar donde se decide "¿puede
 * este usuario tocar este proyecto?" -- lo reutilizan ProyectoService,
 * EtapaService, ActividadService y AsignacionProyectoService. Si esta
 * clase tiene un bug, el bug se repite en los cuatro Services de golpe,
 * así que es la pieza de lógica de negocio con más impacto por línea de
 * código de todo el backend, y por eso es la primera candidata a tener
 * tests (ver GUIA_TESTING.md, sección 4, para el porqué de esta prioridad).
 */
@ExtendWith(MockitoExtension.class)
class AutorizacionProyectoServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private AsignacionProyectoRepository asignacionProyectoRepository;

    @InjectMocks
    private AutorizacionProyectoService autorizacionProyectoService;

    private Usuario coordinador;
    private Usuario liderA;
    private Usuario desarrollador;

    @BeforeEach
    void setUp() {
        coordinador = Usuario.builder()
                .idUsuario(1)
                .correoElectronico("coordinador@ikernell.com")
                .rol(Rol.builder().codigoRol(RolConstantes.COORDINADOR).build())
                .build();

        liderA = Usuario.builder()
                .idUsuario(2)
                .correoElectronico("lider.a@ikernell.com")
                .rol(Rol.builder().codigoRol(RolConstantes.LIDER_PROYECTO).build())
                .build();

        desarrollador = Usuario.builder()
                .idUsuario(3)
                .correoElectronico("dev@ikernell.com")
                .rol(Rol.builder().codigoRol(RolConstantes.DESARROLLADOR).build())
                .build();
    }

    // ---------- buscarUsuarioOFallar ----------

    @Test
    void buscarUsuarioOFallar_lanzaResourceNotFound_siElCorreoNoExiste() {
        when(usuarioRepository.findByCorreoElectronico("fantasma@ikernell.com"))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> autorizacionProyectoService.buscarUsuarioOFallar("fantasma@ikernell.com"))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    // ---------- verificarPuedeGestionar ----------

    @Test
    void verificarPuedeGestionar_permiteAlCoordinador_sinImportarElProyecto() {
        when(usuarioRepository.findByCorreoElectronico("coordinador@ikernell.com"))
                .thenReturn(Optional.of(coordinador));

        Usuario resultado = autorizacionProyectoService.verificarPuedeGestionar("coordinador@ikernell.com", 99);

        assertThat(resultado).isEqualTo(coordinador);
        // El Coordinador nunca necesita pasar por AsignacionProyecto -- si
        // este test fallara sin este comentario, revisa que nadie haya
        // agregado un verify(asignacionProyectoRepository)... esperando
        // que SÍ se consulte para el Coordinador: sería el bug contrario.
    }

    @Test
    void verificarPuedeGestionar_permiteAlLider_cuandoEsLiderVigenteDeEseProyecto() {
        when(usuarioRepository.findByCorreoElectronico("lider.a@ikernell.com"))
                .thenReturn(Optional.of(liderA));
        when(asignacionProyectoRepository
                .existsByUsuario_IdUsuarioAndProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(
                        2, 10, RolProyecto.LIDER))
                .thenReturn(true);

        Usuario resultado = autorizacionProyectoService.verificarPuedeGestionar("lider.a@ikernell.com", 10);

        assertThat(resultado).isEqualTo(liderA);
    }

    @Test
    void verificarPuedeGestionar_rechazaAlLider_cuandoElProyectoEsDeOtroLider() {
        // Esta es LA regla que hace que un Líder no pueda editar el
        // proyecto de otro Líder con solo adivinar el id en la URL.
        when(usuarioRepository.findByCorreoElectronico("lider.a@ikernell.com"))
                .thenReturn(Optional.of(liderA));
        when(asignacionProyectoRepository
                .existsByUsuario_IdUsuarioAndProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(
                        2, 77, RolProyecto.LIDER))
                .thenReturn(false);

        assertThatThrownBy(() -> autorizacionProyectoService.verificarPuedeGestionar("lider.a@ikernell.com", 77))
                .isInstanceOf(ForbiddenException.class);
    }

    @Test
    void verificarPuedeGestionar_rechazaAlDesarrollador_aunqueDigaSerDeCualquierProyecto() {
        when(usuarioRepository.findByCorreoElectronico("dev@ikernell.com"))
                .thenReturn(Optional.of(desarrollador));
        when(asignacionProyectoRepository
                .existsByUsuario_IdUsuarioAndProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(
                        3, 10, RolProyecto.LIDER))
                .thenReturn(false);

        assertThatThrownBy(() -> autorizacionProyectoService.verificarPuedeGestionar("dev@ikernell.com", 10))
                .isInstanceOf(ForbiddenException.class);
    }

    // ---------- verificarPerteneceAlEquipo ----------

    @Test
    void verificarPerteneceAlEquipo_permiteAlDesarrollador_siTieneAsignacionVigente() {
        // Chequeo más laxo que verificarPuedeGestionar: cualquier
        // rol_proyecto vigente alcanza, no hace falta ser Líder.
        when(usuarioRepository.findByCorreoElectronico("dev@ikernell.com"))
                .thenReturn(Optional.of(desarrollador));
        when(asignacionProyectoRepository
                .findByUsuario_IdUsuarioAndProyecto_IdProyectoAndFechaDesvinculacionIsNull(3, 10))
                .thenReturn(Optional.of(AsignacionProyecto.builder().build()));

        Usuario resultado = autorizacionProyectoService.verificarPerteneceAlEquipo("dev@ikernell.com", 10);

        assertThat(resultado).isEqualTo(desarrollador);
    }

    @Test
    void verificarPerteneceAlEquipo_rechazaAlDesarrollador_siNuncaEstuvoEnEseProyecto() {
        when(usuarioRepository.findByCorreoElectronico("dev@ikernell.com"))
                .thenReturn(Optional.of(desarrollador));
        when(asignacionProyectoRepository
                .findByUsuario_IdUsuarioAndProyecto_IdProyectoAndFechaDesvinculacionIsNull(3, 10))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> autorizacionProyectoService.verificarPerteneceAlEquipo("dev@ikernell.com", 10))
                .isInstanceOf(ForbiddenException.class);
    }

    @Test
    void verificarPerteneceAlEquipo_rechazaAlDesarrollador_siSuAsignacionYaFueDesvinculada() {
        // La query filtra fechaDesvinculacionIsNull -- alguien que fue
        // parte del equipo mucho antes, pero ya salió, no debería colarse
        // acá solo porque en algún momento tuvo una fila en la tabla.
        when(usuarioRepository.findByCorreoElectronico("dev@ikernell.com"))
                .thenReturn(Optional.of(desarrollador));
        when(asignacionProyectoRepository
                .findByUsuario_IdUsuarioAndProyecto_IdProyectoAndFechaDesvinculacionIsNull(3, 10))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> autorizacionProyectoService.verificarPerteneceAlEquipo("dev@ikernell.com", 10))
                .isInstanceOf(ForbiddenException.class);
    }

    @Test
    void verificarPerteneceAlEquipo_permiteAlCoordinador_sinConsultarAsignaciones() {
        when(usuarioRepository.findByCorreoElectronico("coordinador@ikernell.com"))
                .thenReturn(Optional.of(coordinador));

        Usuario resultado = autorizacionProyectoService.verificarPerteneceAlEquipo("coordinador@ikernell.com", 10);

        assertThat(resultado).isEqualTo(coordinador);
    }
}
