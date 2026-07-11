package com.ikernell.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.dto.ActividadRequest;
import com.ikernell.backend.dto.ActividadResponse;
import com.ikernell.backend.dto.NotificacionRequest;
import com.ikernell.backend.entity.Actividad;
import com.ikernell.backend.entity.Etapa;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.EstadoActividad;
import com.ikernell.backend.enums.EstadoProyecto;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.enums.TipoNotificacion;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.ActividadMapper;
import com.ikernell.backend.repository.ActividadRepository;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.EtapaRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ActividadService {

    private final ActividadRepository actividadRepository;
    private final EtapaRepository etapaRepository;
    private final UsuarioRepository usuarioRepository;
    private final ActividadMapper actividadMapper;
    private final AutorizacionProyectoService autorizacionProyectoService;
    private final AsignacionProyectoRepository asignacionProyectoRepository;
    private final TrazabilidadService trazabilidadService;
    private final NotificacionService notificacionService;

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper().registerModule(new JavaTimeModule());

    @Transactional
    public ActividadResponse crear(ActividadRequest request, String correoSolicitante) {
        Etapa etapa = buscarEtapaOFallar(request.getIdEtapa());
        autorizacionProyectoService.verificarPuedeGestionar(
                correoSolicitante, etapa.getProyecto().getIdProyecto());

        validarCodigoDisponible(request.getCodigoActividad(), null);
        validarFechas(request);

        Actividad actividad = actividadMapper.toEntity(request);
        actividad.setEtapa(etapa);

        if (request.getIdUsuario() != null) {
            validarPerteneceAlEquipo(request.getIdUsuario(), etapa.getProyecto().getIdProyecto());
            Usuario usuario = buscarUsuarioOFallar(request.getIdUsuario());
            actividad.setUsuario(usuario);
            actividad.setEstado(EstadoActividad.PENDIENTE);
        } else {
            actividad.setEstado(EstadoActividad.PENDIENTE_DE_ASIGNACION);
        }

        Actividad guardada = actividadRepository.save(actividad);
        // NUEVO: si nace ya asignada, se notifica al desarrollador de una vez.
        if (guardada.getUsuario() != null) {
            notificarAsignacion(guardada);
        }


        return actividadMapper.toResponse(guardada);
    }

    /**
     * NUEVO: por consistencia con RegistroErrorService/InterrupcionService
     * (donde "sin filtro" = listar todo). Antes, sin idEtapa ni idUsuario,
     * el Controller devolvía lista vacía -- eso hacía imposible calcular
     * KPIs "org-wide" o "de mis proyectos" sin un fan-out etapa por etapa.
     */
    public List<ActividadResponse> listarTodas() {
        return actividadRepository.findAll()
                .stream()
                .map(actividadMapper::toResponse)
                .toList();
    }

    public List<ActividadResponse> listarPorEtapa(Integer idEtapa) {
        return actividadRepository.findByEtapa_IdEtapa(idEtapa)
                .stream()
                .map(actividadMapper::toResponse)
                .toList();
    }

    public List<ActividadResponse> listarPorUsuario(Integer idUsuario) {
        return actividadRepository.findByUsuario_IdUsuario(idUsuario)
                .stream()
                .map(actividadMapper::toResponse)
                .toList();
    }

    public ActividadResponse obtenerPorId(Integer idActividad) {
        return actividadMapper.toResponse(buscarOFallar(idActividad));
    }

    @Transactional
    public ActividadResponse actualizar(Integer idActividad, ActividadRequest request, String correoSolicitante) {
        Actividad actividad = buscarOFallar(idActividad);
        autorizacionProyectoService.verificarPuedeGestionar(
                correoSolicitante, actividad.getEtapa().getProyecto().getIdProyecto());

        Etapa etapa = buscarEtapaOFallar(request.getIdEtapa());

        validarCodigoDisponible(request.getCodigoActividad(), idActividad);
        validarFechas(request);

        actividadMapper.actualizarEntidadDesdeRequest(request, actividad);
        actividad.setEtapa(etapa);

        Actividad actualizada = actividadRepository.save(actividad);

        return actividadMapper.toResponse(actualizada);
    }

    @Transactional
    public ActividadResponse asignar(Integer idActividad, Integer idUsuario, String correoSolicitante) {
        Actividad actividad = buscarOFallar(idActividad);
        autorizacionProyectoService.verificarPuedeGestionar(
                correoSolicitante, actividad.getEtapa().getProyecto().getIdProyecto());

        if (actividad.getEstado() != EstadoActividad.PENDIENTE_DE_ASIGNACION) {
            throw new BusinessException(
                    "Esta actividad ya tiene un desarrollador asignado.");
        }

        validarPerteneceAlEquipo(idUsuario, actividad.getEtapa().getProyecto().getIdProyecto());
        Usuario usuario = buscarUsuarioOFallar(idUsuario);
        actividad.setUsuario(usuario);
        actividad.setEstado(EstadoActividad.PENDIENTE);

        Actividad guardada = actividadRepository.save(actividad);
        notificarAsignacion(guardada);

        return actividadMapper.toResponse(guardada);
    }

    /**
     * SIN CAMBIOS de rol respecto al diseño anterior: sigue abierto a
     * cualquier autenticado (el propio desarrollador ejecuta su
     * actividad, sin importar quién sea el líder del proyecto).
     *
     * CERRADO -- regla pendiente marcada en el plan de Fase 8: el
     * Desarrollador solo puede ejecutar/cambiar el estado de una
     * Actividad si el Proyecto padre está "En ejecución". Si el proyecto
     * está en Planeación, Suspendido, Finalizado o Cancelado, se
     * rechaza -- no tiene sentido seguir moviendo actividades de un
     * proyecto que no está corriendo.
     */
    @Transactional
    public ActividadResponse cambiarEstado(Integer idActividad, String estadoTexto) {
        Actividad actividad = buscarOFallar(idActividad);
        EstadoActividad nuevoEstado = parsearEstado(estadoTexto);

        if (nuevoEstado == EstadoActividad.PENDIENTE_DE_ASIGNACION) {
            throw new BusinessException(
                    "No se puede volver manualmente a 'Pendiente de asignación'.");
        }
        if (actividad.getUsuario() == null) {
            throw new BusinessException(
                    "La actividad no tiene un desarrollador asignado todavía.");
        }
        if (actividad.getEtapa().getProyecto().getEstado() != EstadoProyecto.EN_EJECUCION) {
            throw new BusinessException(
                    "No se puede cambiar el estado de la actividad: el proyecto '"
                            + actividad.getEtapa().getProyecto().getNombreProyecto()
                            + "' no está en ejecución (estado actual: "
                            + actividad.getEtapa().getProyecto().getEstado().getValor() + ").");
        }

        actividad.setEstado(nuevoEstado);
        // NUEVO: se llena solo al llegar a Finalizada; si por algún motivo
        // se corrige hacia otro estado después, se limpia -- no debe
        // quedar una fecha de finalización "fantasma" en algo que ya no
        // está finalizado.
        actividad.setFechaFinalizacion(
                nuevoEstado == EstadoActividad.FINALIZADA ? LocalDateTime.now() : null);
        Actividad guardada = actividadRepository.save(actividad);

        return actividadMapper.toResponse(guardada);
    }

    /**
     * Delete físico, protegido por ON DELETE RESTRICT en BD
     * (fk_registro_error_actividad, fk_interrupcion_actividad). Ownership
     * validado igual que actualizar()/asignar(): contra el proyecto dueño de la
     * etapa de la actividad. Si la actividad todavía tiene errores o
     * interrupciones registradas, la BD rechaza el borrado y lo traducimos a un
     * ConflictException legible. El snapshot (JSON del Response actual) queda en
     * Trazabilidad.detalle antes de borrar la fila.
     */
    @Transactional
    public void eliminar(Integer idActividad, String correoSolicitante) {
        Actividad actividad = buscarOFallar(idActividad);
        Usuario solicitante = autorizacionProyectoService.verificarPuedeGestionar(
                correoSolicitante, actividad.getEtapa().getProyecto().getIdProyecto());

        String detalle = construirDetalle(actividadMapper.toResponse(actividad));

        try {
            actividadRepository.delete(actividad);
            actividadRepository.flush();
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException(
                    "No se puede eliminar la actividad '" + actividad.getNombreActividad()
                            + "': tiene errores o interrupciones registradas.");
        }

        trazabilidadService.registrar(
                solicitante, "Actividad", actividad.getCodigoActividad(),
                OperacionTrazabilidad.ELIMINAR, detalle);
    }

    private EstadoActividad parsearEstado(String estadoTexto) {
        try {
            return EstadoActividad.desdeValor(estadoTexto);
        } catch (IllegalArgumentException ex) {
            throw new BusinessException(ex.getMessage());
        }
    }

    /**
     * CERRADO: antes crear()/asignar() solo verificaban que el usuario
     * existiera, no que fuera parte del equipo del proyecto dueño de la
     * etapa. El frontend ya limitaba el selector al equipo vigente, pero
     * la API en sí lo permitía igual si se llamaba directo.
     */
    private void validarPerteneceAlEquipo(Integer idUsuario, Integer idProyecto) {
        boolean pertenece = asignacionProyectoRepository
                .findByUsuario_IdUsuarioAndProyecto_IdProyectoAndFechaDesvinculacionIsNull(idUsuario, idProyecto)
                .isPresent();
        if (!pertenece) {
            throw new BusinessException(
                    "El usuario seleccionado no forma parte del equipo vigente de este proyecto.");
        }
    }

    private void validarFechas(ActividadRequest request) {
        if (request.getFechaFin().isBefore(request.getFechaInicio())) {
            throw new BusinessException("La fecha de fin no puede ser anterior a la fecha de inicio.");
        }
    }

    private String construirDetalle(ActividadResponse response) {
        try {
            return OBJECT_MAPPER.writeValueAsString(response);
        } catch (JsonProcessingException ex) {
            return "No fue posible serializar el detalle: " + ex.getMessage();
        }
    }

    private Actividad buscarOFallar(Integer idActividad) {
        return actividadRepository.findById(idActividad)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una actividad con id " + idActividad + "."));
    }

    private Etapa buscarEtapaOFallar(Integer idEtapa) {
        return etapaRepository.findById(idEtapa)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una etapa con id " + idEtapa + "."));
    }

    private Usuario buscarUsuarioOFallar(Integer idUsuario) {
        return usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con id " + idUsuario + "."));
    }

    private void validarCodigoDisponible(String codigoActividad, Integer idActividadActual) {
        actividadRepository.findByCodigoActividad(codigoActividad).ifPresent(existente -> {
            if (idActividadActual == null || !existente.getIdActividad().equals(idActividadActual)) {
                throw new ConflictException(
                        "Ya existe una actividad con el código '" + codigoActividad + "'.");
            }
        });
    }

    /**
     * NUEVO: notifica al desarrollador cuando se le asigna una actividad
     * (al crearla ya asignada, o vía asignar()). urlDestino apunta al
     * Proyecto -- no existe una página de detalle de Actividad propia.
     */
    private void notificarAsignacion(Actividad actividad) {
        notificacionService.crear(new NotificacionRequest(
                actividad.getUsuario().getIdUsuario(),
                "Nueva actividad asignada",
                "Se te asignó \"" + actividad.getNombreActividad() + "\" en la etapa "
                        + actividad.getEtapa().getNombreEtapa() + ".",
                TipoNotificacion.ACTIVIDAD,
                "/dashboard/proyectos/" + actividad.getEtapa().getProyecto().getIdProyecto()));
    }
}
