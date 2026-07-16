package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.RolResponse;
import com.ikernell.backend.dto.UsuarioResumenResponse;
import com.ikernell.backend.entity.Rol;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.TipoIdentificacion;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

/**
 * Prueba la política de visibilidad documentada en AGENTS.md (B1):
 * UsuarioResumenResponse es lo único que debe viajar embebido dentro de
 * otro recurso (líder de un proyecto, responsable de una actividad,
 * etc.), y NUNCA debe incluir campos sensibles como numeroIdentificacion
 * o fechaNacimiento -- antes de esta corrección, cualquier autenticado
 * podía leer la cédula de un compañero con solo listar proyectos.
 *
 * Se usa el UsuarioMapperImpl generado por MapStruct en vez de una copia
 * a mano de la lógica de mapeo -- así el test corre contra el código que
 * de verdad se ejecuta en producción, no contra una reimplementación
 * paralela que podría desincronizarse.
 */
@ExtendWith(MockitoExtension.class)
class UsuarioMapperTest {

    /**
     * Campos que SOLO deben existir en UsuarioResponse (el DTO completo,
     * reservado para Coordinador/Líder gestionando usuarios, o el propio
     * usuario viendo su perfil) -- si cualquiera de estos aparece algún
     * día en UsuarioResumenResponse, este test debe fallar de inmediato.
     */
    private static final Set<String> CAMPOS_PROHIBIDOS_EN_RESUMEN = Set.of(
            "numeroIdentificacion", "fechaNacimiento", "ciudad", "tipoIdentificacion",
            "profesion", "especialidad", "activo", "fechaCreacion", "hashContrasena");

    @Mock
    private RolMapper rolMapper;

    @InjectMocks
    private UsuarioMapperImpl usuarioMapper;

    @Test
    void toResumen_nuncaExponeCamposSensibles_pormasQueSeAgreguenAUsuarioAFuturo() {
        // Guardarraíl estructural: no depende de datos de prueba, solo
        // mira qué campos DECLARA la clase UsuarioResumenResponse. Si
        // alguien agrega "numeroIdentificacion" a ese DTO en el futuro
        // (por ejemplo, para "una pantalla nueva que lo necesita rapidito"),
        // este test revienta ANTES de que el campo llegue a producción.
        List<String> camposDeclarados = Arrays.stream(UsuarioResumenResponse.class.getDeclaredFields())
                .map(Field::getName)
                .toList();

        assertThat(camposDeclarados).doesNotContainAnyElementsOf(CAMPOS_PROHIBIDOS_EN_RESUMEN);
    }

    @Test
    void toResumen_mapeaCorrectamenteLosCamposQueSiSonSeguros() {
        Usuario usuario = Usuario.builder()
                .idUsuario(7)
                .codigoUsuario("USR-007")
                .nombres("Ana")
                .apellidos("Martínez")
                .correoElectronico("ana.martinez@ikernell.com")
                .tipoIdentificacion(TipoIdentificacion.CC)
                .numeroIdentificacion("1234567890") // sensible -- no debe llegar al DTO
                .fechaNacimiento(LocalDate.of(1990, 5, 20)) // sensible -- no debe llegar al DTO
                .rol(Rol.builder().idRol(1).codigoRol("ROL-001").nombreRol("Coordinador").build())
                .build();

        when(rolMapper.toResponse(usuario.getRol()))
                .thenReturn(RolResponse.builder().idRol(1).codigoRol("ROL-001").nombreRol("Coordinador").build());

        UsuarioResumenResponse resumen = usuarioMapper.toResumen(usuario);

        assertThat(resumen.getIdUsuario()).isEqualTo(7);
        assertThat(resumen.getCodigoUsuario()).isEqualTo("USR-007");
        assertThat(resumen.getNombres()).isEqualTo("Ana");
        assertThat(resumen.getApellidos()).isEqualTo("Martínez");
        assertThat(resumen.getCorreoElectronico()).isEqualTo("ana.martinez@ikernell.com");
        assertThat(resumen.getRol().getCodigoRol()).isEqualTo("ROL-001");
    }

    @Test
    void toResponse_elCompletoSiIncluyeLosCamposSensibles_porqueEsSoloParaContextosDeConfianza() {
        // Documenta el contraste a propósito: UsuarioResponse (el
        // completo) SÍ debe seguir trayendo estos campos -- lo usan
        // /api/usuarios (Coordinador/Líder) y el login (perfil propio).
        // Si este test empezara a fallar, sería la señal de que alguien
        // le quitó campos al DTO equivocado.
        List<String> camposDeclarados = Arrays.stream(
                        com.ikernell.backend.dto.UsuarioResponse.class.getDeclaredFields())
                .map(Field::getName)
                .toList();

        assertThat(camposDeclarados).contains("numeroIdentificacion", "fechaNacimiento");
    }
}
