package com.ikernell.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ikernell.backend.audit.DetalleObjectMapper;
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
import com.ikernell.backend.enums.RolProyecto;
import com.ikernell.backend.enums.TipoNotificacion;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ForbiddenException;
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
    private final CodigoGeneradorService codigoGeneradorService;


    @Transactional
    public ActividadResponse crear(ActividadRequest request, String correoSolicitante) {
        Etapa etapa = buscarEtapaOFallar(request.getIdEtapa());
        Usuario solicitante = autorizacionProyectoService.verificarPuedeGestionar(
                correoSolicitante, etapa.getProyecto().getIdProyecto());

        validarFechas(request);

        Actividad actividad = actividadMapper.toEntity(request);
        actividad.setEtapa(etapa);
        actividad.setCodigoActividad(codigoGeneradorService.siguienteCodigoActividad(etapa));

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

        ActividadResponse response = actividadMapper.toResponse(guardada);
        trazabilidadService.registrar(
                solicitante, "Actividad", guardada.getCodigoActividad(),
                OperacionTrazabilidad.CREAR, construirDetalle(response));

        return response;
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
        return actividadRepository.findByEtapa_IdEtapaOrderByIdActividadAsc(idEtapa)
                .stream()
                .map(actividadMapper::toResponse)
                .toList();
    }

    public List<ActividadResponse> listarPorUsuario(Integer idUsuario) {
        return actividadRepository.findByUsuario_IdUsuarioOrderByIdActividadAsc(idUsuario)
                .stream()
                .map(actividadMapper::toResponse)
                .toList();
    }

    public ActividadResponse obtenerPorId(Integer idActividad) {
        return actividadMapper.toResponse(buscarOFallar(idActividad));
    }

    /**
     * El chequeo de ownership se hace tanto contra el proyecto ACTUAL de
     * la actividad (vía su etapa) como contra el proyecto DESTINO (vía la
     * etapa que venga en el request) -- antes solo se validaba el actual,
     * lo que permitía mover una actividad a la etapa de un proyecto ajeno
     * con solo mandar su id en el payload. Mismo criterio que
     * EtapaService.actualizar().
     */
    @Transactional
    public ActividadResponse actualizar(Integer idActividad, ActividadRequest request, String correoSolicitante) {
        Actividad actividad = buscarOFallar(idActividad);
        Usuario solicitante = autorizacionProyectoService.verificarPuedeGestionar(
                correoSolicitante, actividad.getEtapa().getProyecto().getIdProyecto());

        Etapa etapa = buscarEtapaOFallar(request.getIdEtapa());
        autorizacionProyectoService.verificarPuedeGestionar(
                correoSolicitante, etapa.getProyecto().getIdProyecto());

        validarFechas(request);

        actividadMapper.actualizarEntidadDesdeRequest(request, actividad);
        actividad.setEtapa(etapa);

        Actividad actualizada = actividadRepository.save(actividad);

        ActividadResponse response = actividadMapper.toResponse(actualizada);
        trazabilidadService.registrar(
                solicitante, "Actividad", actualizada.getCodigoActividad(),
                OperacionTrazabilidad.ACTUALIZAR, construirDetalle(response));

        return response;
    }

    @Transactional
    public ActividadResponse asignar(Integer idActividad, Integer idUsuario, String correoSolicitante) {
        Actividad actividad = buscarOFallar(idActividad);
        Usuario solicitante = autorizacionProyectoService.verificarPuedeGestionar(
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
        trazabilidadService.registrar(
                solicitante, "Actividad", guardada.getCodigoActividad(),
                OperacionTrazabilidad.ASIGNAR, construirDetalle(actividadMapper.toResponse(guardada)));

        return actividadMapper.toResponse(guardada);
    }

    /**
     * CORREGIDO (HU-11): ahora exige ownership -- solo el desarrollador
     * responsable de la actividad puede cambiar su estado. Antes quedaba
     * abierto a cualquier autenticado, lo cual contradecía la propia HU.
     *
     * NUEVO: una vez la actividad queda Cancelada (el propio desarrollador
     * la cancela, eso sí lo puede hacer bajo la regla de ownership de
     * arriba), se bloquea para él -- de ahí en adelante solo el
     * Coordinador o el Líder vigente de ESE proyecto pueden seguir
     * cambiando su estado, igual que hicimos con Proyecto.cambiarEstado.
     *
     * El Proyecto padre además debe estar "En ejecución". Si el proyecto
     * está en Planeación, Suspendido, Finalizado o Cancelado, se
     * rechaza -- no tiene sentido seguir moviendo actividades de un
     * proyecto que no está corriendo.
     */
    @Transactional
    public ActividadResponse cambiarEstado(
            Integer idActividad, String estadoTexto, String notaFinalizacion, String correoSolicitante) {
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
        Usuario solicitante;
        if (actividad.getEstado() == EstadoActividad.CANCELADA) {
            solicitante = autorizacionProyectoService.verificarPuedeGestionar(
                    correoSolicitante, actividad.getEtapa().getProyecto().getIdProyecto());
        } else if (!actividad.getUsuario().getCorreoElectronico().equals(correoSolicitante)) {
            throw new ForbiddenException(
                    "Solo el desarrollador responsable de esta actividad puede cambiar su estado.");
        } else {
            solicitante = actividad.getUsuario();
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
        // NUEVO: qué hizo el desarrollador -- misma lógica que fechaFinalizacion,
        // solo tiene sentido si termina en Finalizada.
        actividad.setNotaFinalizacion(
                nuevoEstado == EstadoActividad.FINALIZADA ? notaFinalizacion : null);
        Actividad guardada = actividadRepository.save(actividad);
        notificarCierreALider(guardada, nuevoEstado, solicitante);

        ActividadResponse response = actividadMapper.toResponse(guardada);
        trazabilidadService.registrar(
                solicitante, "Actividad", guardada.getCodigoActividad(),
                OperacionTrazabilidad.CAMBIAR_ESTADO, construirDetalle(response));

        return response;
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
            return DetalleObjectMapper.INSTANCE.writeValueAsString(response);
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

    /**
     * NUEVO: el Líder vigente del proyecto se entera cuando una actividad
     * se Finaliza o Cancela -- son los dos cierres de ciclo de vida que le
     * importan para dar seguimiento, a diferencia de estados intermedios
     * (En desarrollo) que son ruido para él. Si el propio Líder fue quien
     * hizo el cambio, no se le notifica a sí mismo (mismo criterio
     * anti-ruido que RegistroErrorService).
     */
    private void notificarCierreALider(Actividad actividad, EstadoActividad nuevoEstado, Usuario solicitante) {
        if (nuevoEstado != EstadoActividad.FINALIZADA && nuevoEstado != EstadoActividad.CANCELADA) {
            return;
        }

        Integer idProyecto = actividad.getEtapa().getProyecto().getIdProyecto();
        asignacionProyectoRepository
                .findByProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(idProyecto, RolProyecto.LIDER)
                .map(asignacion -> asignacion.getUsuario())
                .filter(lider -> !lider.getIdUsuario().equals(solicitante.getIdUsuario()))
                .ifPresent(lider -> notificacionService.crear(new NotificacionRequest(
                        lider.getIdUsuario(),
                        nuevoEstado == EstadoActividad.FINALIZADA ? "Actividad finalizada" : "Actividad cancelada",
                        "\"" + actividad.getNombreActividad() + "\" en " + actividad.getEtapa().getNombreEtapa()
                                + " -- " + actividad.getUsuario().getNombres() + " " + actividad.getUsuario().getApellidos(),
                        TipoNotificacion.ACTIVIDAD,
                        "/dashboard/proyectos/" + idProyecto)));
    }
}
