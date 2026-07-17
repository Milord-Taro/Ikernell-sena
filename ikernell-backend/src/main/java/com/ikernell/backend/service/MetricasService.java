package com.ikernell.backend.service;

import com.ikernell.backend.dto.BarraDato;
import com.ikernell.backend.dto.ItemFeed;
import com.ikernell.backend.dto.ItemRanking;
import com.ikernell.backend.dto.MetricaTarjeta;
import com.ikernell.backend.dto.MetricasResponse;
import com.ikernell.backend.dto.PuntoDiario;
import com.ikernell.backend.entity.Interrupcion;
import com.ikernell.backend.entity.MensajeContacto;
import com.ikernell.backend.entity.RegistroError;
import com.ikernell.backend.enums.EstadoActividad;
import com.ikernell.backend.enums.EstadoMensaje;
import com.ikernell.backend.enums.EstadoProyecto;
import com.ikernell.backend.enums.EstadoRegistroError;
import com.ikernell.backend.enums.NivelCriticidad;
import com.ikernell.backend.repository.ActividadRepository;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.InterrupcionRepository;
import com.ikernell.backend.repository.MensajeContactoRepository;
import com.ikernell.backend.repository.ProyectoRepository;
import com.ikernell.backend.repository.RegistroErrorRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * CORREGIDO (B4 + B5): reemplaza el patrón anterior de MetricasPage.tsx,
 * que traía proyectos/actividades/errores/interrupciones/usuarios/mensajes
 * COMPLETOS al navegador -- para cualquier rol, incluido un Desarrollador
 * -- y calculaba los conteos ahí con .filter().length. Acá cada card,
 * distribución y ranking se calcula con SQL agregado (COUNT/GROUP BY/SUM),
 * y cada método está acotado exactamente a lo que ese rol puede ver:
 * Coordinador ve la organización completa, Líder solo sus proyectos
 * (donde es líder vigente), Desarrollador solo lo suyo.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MetricasService {

    private static final List<EstadoActividad> ACTIVIDADES_PENDIENTES =
            List.of(EstadoActividad.PENDIENTE, EstadoActividad.EN_DESARROLLO);
    private static final List<EstadoRegistroError> ERRORES_ABIERTOS =
            List.of(EstadoRegistroError.ABIERTO, EstadoRegistroError.EN_PROGRESO);
    private static final int DIAS_TENDENCIA = 14;

    private final ProyectoRepository proyectoRepository;
    private final ActividadRepository actividadRepository;
    private final RegistroErrorRepository registroErrorRepository;
    private final InterrupcionRepository interrupcionRepository;
    private final UsuarioRepository usuarioRepository;
    private final MensajeContactoRepository mensajeContactoRepository;
    private final AsignacionProyectoRepository asignacionProyectoRepository;

    /** Org-wide: mismo número para cualquier Coordinador. */
    public MetricasResponse coordinador() {
        List<MetricaTarjeta> cards = List.of(
                new MetricaTarjeta("Proyectos activos", proyectoRepository.countByEstado(EstadoProyecto.EN_EJECUCION)),
                new MetricaTarjeta("Actividades pendientes", actividadRepository.countByEstadoIn(ACTIVIDADES_PENDIENTES)),
                new MetricaTarjeta("Errores abiertos", registroErrorRepository.countByEstadoIn(ERRORES_ABIERTOS)),
                new MetricaTarjeta("Equipo (usuarios activos)", usuarioRepository.countByActivoTrue()),
                new MetricaTarjeta("Mensajes no leídos", mensajeContactoRepository.countByEstado(EstadoMensaje.PENDIENTE)),
                new MetricaTarjeta("Minutos perdidos (interrupciones)", interrupcionRepository.sumarMinutos()));

        List<ItemRanking> ranking = registroErrorRepository.rankingPorProyecto(ERRORES_ABIERTOS, PageRequest.of(0, 5));

        List<RegistroError> erroresFeed = registroErrorRepository.findTop8ByOrderByFechaRegistroDesc();
        List<Interrupcion> interrupcionesFeed = interrupcionRepository.findTop8ByOrderByFechaRegistroDesc();
        List<MensajeContacto> mensajesFeed = mensajeContactoRepository.findTop8ByOrderByFechaEnvioDesc();

        return new MetricasResponse(
                cards,
                aBarras(registroErrorRepository.contarPorSeveridad(), NivelCriticidad.values(), NivelCriticidad::getValor),
                aBarras(registroErrorRepository.contarPorEstado(), EstadoRegistroError.values(), EstadoRegistroError::getValor),
                aBarras(actividadRepository.contarPorEstado(), EstadoActividad.values(), EstadoActividad::getValor),
                aBarras(proyectoRepository.contarPorEstado(), EstadoProyecto.values(), EstadoProyecto::getValor),
                ranking,
                aTendencia(actividadRepository.contarFinalizadasPorDia(desdeInicioTendencia())),
                feedDe(erroresFeed, interrupcionesFeed, mensajesFeed));
    }

    /** Acotado a SUS proyectos (donde es líder vigente), no org-wide. */
    public MetricasResponse lider(Integer idUsuario) {
        List<Integer> misProyectoIds = asignacionProyectoRepository.idsProyectosDondeEsLiderVigente(idUsuario);

        if (misProyectoIds.isEmpty()) {
            return respuestaVacia(List.of(
                    "Mis proyectos activos", "Actividades pendientes", "Errores abiertos",
                    "Mi equipo", "Minutos perdidos (interrupciones)"));
        }

        List<MetricaTarjeta> cards = List.of(
                new MetricaTarjeta("Mis proyectos activos", proyectoRepository.countByIdProyectoInAndEstado(misProyectoIds, EstadoProyecto.EN_EJECUCION)),
                new MetricaTarjeta("Actividades pendientes", actividadRepository.countByEtapa_Proyecto_IdProyectoInAndEstadoIn(misProyectoIds, ACTIVIDADES_PENDIENTES)),
                new MetricaTarjeta("Errores abiertos", registroErrorRepository.countByActividad_Etapa_Proyecto_IdProyectoInAndEstadoIn(misProyectoIds, ERRORES_ABIERTOS)),
                new MetricaTarjeta("Mi equipo", asignacionProyectoRepository.contarUsuariosDistintosEnProyectos(misProyectoIds)),
                new MetricaTarjeta("Minutos perdidos (interrupciones)", interrupcionRepository.sumarMinutosEnProyectos(misProyectoIds)));

        List<RegistroError> erroresFeed = registroErrorRepository.findTop8ByActividad_Etapa_Proyecto_IdProyectoInOrderByFechaRegistroDesc(misProyectoIds);
        List<Interrupcion> interrupcionesFeed = interrupcionRepository.findTop8ByActividad_Etapa_Proyecto_IdProyectoInOrderByFechaRegistroDesc(misProyectoIds);

        return new MetricasResponse(
                cards,
                aBarras(registroErrorRepository.contarPorSeveridadEnProyectos(misProyectoIds), NivelCriticidad.values(), NivelCriticidad::getValor),
                aBarras(registroErrorRepository.contarPorEstadoEnProyectos(misProyectoIds), EstadoRegistroError.values(), EstadoRegistroError::getValor),
                aBarras(actividadRepository.contarPorEstadoEnProyectos(misProyectoIds), EstadoActividad.values(), EstadoActividad::getValor),
                null,
                null,
                aTendencia(actividadRepository.contarFinalizadasPorDiaEnProyectos(desdeInicioTendencia(), misProyectoIds)),
                feedDe(erroresFeed, interrupcionesFeed, List.of()));
    }

    /** Todo acotado a lo que tiene asignado el propio Desarrollador. */
    public MetricasResponse desarrollador(Integer idUsuario) {
        List<MetricaTarjeta> cards = List.of(
                new MetricaTarjeta("Actividades pendientes", actividadRepository.countByUsuario_IdUsuarioAndEstadoIn(idUsuario, ACTIVIDADES_PENDIENTES)),
                new MetricaTarjeta("Actividades finalizadas", actividadRepository.countByUsuario_IdUsuarioAndEstadoIn(idUsuario, List.of(EstadoActividad.FINALIZADA))),
                new MetricaTarjeta("Mis errores abiertos", registroErrorRepository.countByActividad_Usuario_IdUsuarioAndEstadoIn(idUsuario, ERRORES_ABIERTOS)),
                new MetricaTarjeta("Proyectos en los que participo", actividadRepository.countProyectosDistintosDeUsuario(idUsuario)),
                new MetricaTarjeta("Minutos perdidos (interrupciones)", interrupcionRepository.sumarMinutosDeUsuario(idUsuario)));

        List<RegistroError> erroresFeed = registroErrorRepository.findTop8ByActividad_Usuario_IdUsuarioOrderByFechaRegistroDesc(idUsuario);
        List<Interrupcion> interrupcionesFeed = interrupcionRepository.findTop8ByActividad_Usuario_IdUsuarioOrderByFechaRegistroDesc(idUsuario);

        return new MetricasResponse(
                cards,
                aBarras(registroErrorRepository.contarPorSeveridadDeUsuario(idUsuario), NivelCriticidad.values(), NivelCriticidad::getValor),
                aBarras(registroErrorRepository.contarPorEstadoDeUsuario(idUsuario), EstadoRegistroError.values(), EstadoRegistroError::getValor),
                aBarras(actividadRepository.contarPorEstadoDeUsuario(idUsuario), EstadoActividad.values(), EstadoActividad::getValor),
                null,
                null,
                aTendencia(actividadRepository.contarFinalizadasPorDiaDeUsuario(desdeInicioTendencia(), idUsuario)),
                feedDe(erroresFeed, interrupcionesFeed, List.of()));
    }

    // ================= Helpers =================

    private LocalDateTime desdeInicioTendencia() {
        return LocalDate.now().minusDays(DIAS_TENDENCIA - 1L).atStartOfDay();
    }

    /**
     * Convierte el resultado crudo de una consulta GROUP BY (enum, count)
     * en una lista COMPLETA de barras, con 0 para las categorías que no
     * tuvieron ninguna fila -- el frontend siempre pinta todas las
     * categorías del enum, no solo las que tienen datos.
     */
    private <E> List<BarraDato> aBarras(List<Object[]> filas, E[] ordenEsperado, java.util.function.Function<E, String> etiqueta) {
        Map<E, Long> conteos = new HashMap<>();
        for (Object[] fila : filas) {
            @SuppressWarnings("unchecked")
            E clave = (E) fila[0];
            conteos.put(clave, ((Number) fila[1]).longValue());
        }
        return Arrays.stream(ordenEsperado)
                .map(e -> new BarraDato(etiqueta.apply(e), conteos.getOrDefault(e, 0L)))
                .toList();
    }

    /**
     * Rellena los DIAS_TENDENCIA días con 0 donde la consulta nativa no
     * trajo fila -- mismo motivo que aBarras().
     */
    private List<PuntoDiario> aTendencia(List<Object[]> filas) {
        Map<LocalDate, Long> conteos = new HashMap<>();
        for (Object[] fila : filas) {
            LocalDate dia = ((java.sql.Date) fila[0]).toLocalDate();
            conteos.put(dia, ((Number) fila[1]).longValue());
        }

        List<PuntoDiario> resultado = new ArrayList<>();
        LocalDate hoy = LocalDate.now();
        for (int i = DIAS_TENDENCIA - 1; i >= 0; i--) {
            LocalDate dia = hoy.minusDays(i);
            String etiqueta = dia.getDayOfMonth() + "/" + dia.getMonthValue();
            resultado.add(new PuntoDiario(etiqueta, conteos.getOrDefault(dia, 0L)));
        }
        return resultado;
    }

    private List<ItemFeed> feedDe(List<RegistroError> errores, List<Interrupcion> interrupciones, List<MensajeContacto> mensajes) {
        List<ItemFeed> items = new ArrayList<>();

        errores.forEach(e -> items.add(new ItemFeed(
                "error-" + e.getIdRegistroError(),
                "error",
                e.getTitulo(),
                e.getActividad().getNombreActividad() + " · " + e.getSeveridad().getValor(),
                e.getFechaRegistro())));

        interrupciones.forEach(i -> items.add(new ItemFeed(
                "interrupcion-" + i.getIdInterrupcion(),
                "interrupcion",
                i.getTipoInterrupcion().getNombreTipoInterrupcion(),
                i.getActividad().getNombreActividad() + " · " + i.getDuracionMinutos() + " min",
                i.getFechaRegistro())));

        mensajes.forEach(m -> items.add(new ItemFeed(
                "mensaje-" + m.getIdMensajeContacto(),
                "mensaje",
                m.getAsunto(),
                "De: " + m.getNombreRemitente(),
                m.getFechaEnvio())));

        return items.stream()
                .sorted(Comparator.comparing(ItemFeed::fecha).reversed())
                .limit(8)
                .toList();
    }

    /** Respuesta con todo en cero -- Líder que todavía no tiene proyectos asignados. */
    private MetricasResponse respuestaVacia(List<String> etiquetasCards) {
        List<MetricaTarjeta> cards = etiquetasCards.stream().map(e -> new MetricaTarjeta(e, 0L)).toList();
        return new MetricasResponse(
                cards,
                aBarras(List.of(), NivelCriticidad.values(), NivelCriticidad::getValor),
                aBarras(List.of(), EstadoRegistroError.values(), EstadoRegistroError::getValor),
                aBarras(List.of(), EstadoActividad.values(), EstadoActividad::getValor),
                null,
                null,
                aTendencia(List.of()),
                List.of());
    }
}
