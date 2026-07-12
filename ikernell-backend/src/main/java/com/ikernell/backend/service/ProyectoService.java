package com.ikernell.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ikernell.backend.audit.DetalleObjectMapper;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.constants.RolConstantes;
import com.ikernell.backend.dto.NotificacionRequest;
import com.ikernell.backend.dto.ProyectoRequest;
import com.ikernell.backend.dto.ProyectoResponse;
import com.ikernell.backend.dto.UsuarioResponse;
import com.ikernell.backend.entity.AsignacionProyecto;
import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.EstadoProyecto;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.enums.RolProyecto;
import com.ikernell.backend.enums.TipoNotificacion;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ForbiddenException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.ProyectoMapper;
import com.ikernell.backend.mapper.UsuarioMapper;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.ProyectoRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProyectoService {

    private final ProyectoRepository proyectoRepository;
    private final AsignacionProyectoRepository asignacionProyectoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProyectoMapper proyectoMapper;
    private final UsuarioMapper usuarioMapper;
    private final AutorizacionProyectoService autorizacionProyectoService;
    private final TrazabilidadService trazabilidadService;
    private final NotificacionService notificacionService;


    /**
     * Cualquiera con el rol organizacional Líder de Proyecto o Coordinador
     * puede crear un proyecto (el @PreAuthorize del Controller ya filtra
     * esto).
     *
     * Si quien crea es Líder de Proyecto, queda auto-vinculado como el
     * Líder de ESTE proyecto -- ignora idLiderInicial si por algún motivo
     * viene en el request, ya que la autovinculación tiene prioridad.
     *
     * Si quien crea es Coordinador, NO se autovincula (el Coordinador ya
     * gestiona cualquier proyecto sin necesitar estar en
     * AsignacionProyecto), pero SÍ puede elegir un Líder inicial mediante
     * idLiderInicial -- si no lo manda, el proyecto queda sin líder hasta
     * que alguien lo asigne después desde "Equipo".
     */
    @Transactional
    public ProyectoResponse crear(ProyectoRequest request, String correoCreador) {
        validarCodigoDisponible(request.getCodigoProyecto(), null);
        validarFechas(request);

        Usuario creador = autorizacionProyectoService.buscarUsuarioOFallar(correoCreador);

        Proyecto proyecto = proyectoMapper.toEntity(request);
        proyecto.setEstado(EstadoProyecto.PLANEACION);
        Proyecto guardado = proyectoRepository.save(proyecto);

        if (RolConstantes.LIDER_PROYECTO.equals(creador.getRol().getCodigoRol())) {
            vincularLider(guardado, creador);
        } else if (request.getIdLiderInicial() != null) {
            Usuario liderElegido = usuarioRepository.findById(request.getIdLiderInicial())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "No existe un usuario con id " + request.getIdLiderInicial() + "."));

            if (!RolConstantes.LIDER_PROYECTO.equals(liderElegido.getRol().getCodigoRol())) {
                throw new BusinessException(
                        "El usuario elegido como líder inicial no tiene el rol de Líder de Proyecto.");
            }

            vincularLider(guardado, liderElegido);
        }

        ProyectoResponse response = enriquecerConLider(guardado);
        trazabilidadService.registrar(
                creador, "Proyecto", guardado.getCodigoProyecto(),
                OperacionTrazabilidad.CREAR, construirDetalle(response));

        return response;
    }

    public List<ProyectoResponse> listarTodos() {
        return proyectoRepository.findAll()
                .stream()
                .map(this::enriquecerConLider)
                .toList();
    }

    public List<ProyectoResponse> listarPorEstado(String estadoTexto) {
        EstadoProyecto estado = parsearEstado(estadoTexto);

        return proyectoRepository.findByEstado(estado)
                .stream()
                .map(this::enriquecerConLider)
                .toList();
    }

    public ProyectoResponse obtenerPorId(Integer idProyecto) {
        return enriquecerConLider(buscarOFallar(idProyecto));
    }

    @Transactional
    public ProyectoResponse actualizar(Integer idProyecto, ProyectoRequest request, String correoSolicitante) {
        Usuario solicitante = autorizacionProyectoService.verificarPuedeGestionar(correoSolicitante, idProyecto);

        Proyecto proyecto = buscarOFallar(idProyecto);

        validarCodigoDisponible(request.getCodigoProyecto(), idProyecto);
        validarFechas(request);

        proyectoMapper.actualizarEntidadDesdeRequest(request, proyecto);

        Proyecto actualizado = proyectoRepository.save(proyecto);

        ProyectoResponse response = enriquecerConLider(actualizado);
        trazabilidadService.registrar(
                solicitante, "Proyecto", actualizado.getCodigoProyecto(),
                OperacionTrazabilidad.ACTUALIZAR, construirDetalle(response));

        return response;
    }

    /**
     * Un proyecto Cancelado queda bloqueado para el Líder: solo el
     * Coordinador puede volver a cambiar su estado (o eliminarlo, ver
     * eliminar()). Evita que un líder revierta o siga moviendo un
     * proyecto que ya se decidió cancelar.
     */
    @Transactional
    public ProyectoResponse cambiarEstado(Integer idProyecto, String nuevoEstadoTexto, String correoSolicitante) {
        Usuario solicitante = autorizacionProyectoService.verificarPuedeGestionar(correoSolicitante, idProyecto);

        Proyecto proyecto = buscarOFallar(idProyecto);
        EstadoProyecto nuevoEstado = parsearEstado(nuevoEstadoTexto);

        if (proyecto.getEstado() == EstadoProyecto.CANCELADO
                && !RolConstantes.COORDINADOR.equals(solicitante.getRol().getCodigoRol())) {
            throw new ForbiddenException(
                    "El proyecto está Cancelado: solo un Coordinador puede cambiar su estado.");
        }

        proyecto.setEstado(nuevoEstado);
        Proyecto guardado = proyectoRepository.save(proyecto);
        notificarFinalizacionACoordinadores(guardado, nuevoEstado, solicitante);

        ProyectoResponse response = enriquecerConLider(guardado);
        trazabilidadService.registrar(
                solicitante, "Proyecto", guardado.getCodigoProyecto(),
                OperacionTrazabilidad.CAMBIAR_ESTADO, construirDetalle(response));

        return response;
    }

    /**
     * NUEVO: todos los Coordinadores activos se enteran cuando un
     * proyecto se Finaliza -- es un cierre de ciclo de vida relevante
     * para toda la organización, no solo para el Líder. Si quien hizo el
     * cambio es un Coordinador, no se le notifica a sí mismo.
     */
    private void notificarFinalizacionACoordinadores(Proyecto proyecto, EstadoProyecto nuevoEstado, Usuario solicitante) {
        if (nuevoEstado != EstadoProyecto.FINALIZADO) {
            return;
        }

        usuarioRepository.findByRol_CodigoRolAndActivoTrue(RolConstantes.COORDINADOR).stream()
                .filter(coordinador -> !coordinador.getIdUsuario().equals(solicitante.getIdUsuario()))
                .forEach(coordinador -> notificacionService.crear(new NotificacionRequest(
                        coordinador.getIdUsuario(),
                        "Proyecto finalizado",
                        "\"" + proyecto.getNombreProyecto() + "\" se marcó como finalizado.",
                        TipoNotificacion.PROYECTO,
                        "/dashboard/proyectos/" + proyecto.getIdProyecto())));
    }

    /**
     * Delete físico, protegido por ON DELETE RESTRICT en BD
     * (fk_etapa_proyecto, fk_asignacion_proyecto_proyecto) -- solo se
     * puede eliminar un proyecto sin etapas ni equipo asignado. El
     * snapshot (JSON del Response actual) queda en Trazabilidad.detalle
     * antes de borrar la fila. Reservado a Coordinador (gate de rol en
     * el Controller).
     */
    @Transactional
    public void eliminar(Integer idProyecto, String correoSolicitante) {
        Usuario solicitante = autorizacionProyectoService.buscarUsuarioOFallar(correoSolicitante);
        Proyecto proyecto = buscarOFallar(idProyecto);

        String detalle = construirDetalle(enriquecerConLider(proyecto));

        try {
            proyectoRepository.delete(proyecto);
            proyectoRepository.flush();
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException(
                    "No se puede eliminar el proyecto '" + proyecto.getNombreProyecto()
                            + "': todavía tiene etapas o equipo asignado.");
        }

        trazabilidadService.registrar(
                solicitante, "Proyecto", proyecto.getCodigoProyecto(),
                OperacionTrazabilidad.ELIMINAR, detalle);
    }

    private String construirDetalle(ProyectoResponse response) {
        try {
            return DetalleObjectMapper.INSTANCE.writeValueAsString(response);
        } catch (JsonProcessingException ex) {
            return "No fue posible serializar el detalle: " + ex.getMessage();
        }
    }

    private void vincularLider(Proyecto proyecto, Usuario lider) {
        AsignacionProyecto asignacion = AsignacionProyecto.builder()
                .usuario(lider)
                .proyecto(proyecto)
                .rolProyecto(RolProyecto.LIDER)
                .build();
        asignacionProyectoRepository.save(asignacion);
    }

    /**
     * Agrega el líder vigente (o null) a un ProyectoResponse ya mapeado.
     * Centralizado aquí para no repetir la consulta en cada método.
     */
    private ProyectoResponse enriquecerConLider(Proyecto proyecto) {
        ProyectoResponse response = proyectoMapper.toResponse(proyecto);
        response.setLiderActual(obtenerLiderActual(proyecto.getIdProyecto()));
        return response;
    }

    private UsuarioResponse obtenerLiderActual(Integer idProyecto) {
        return asignacionProyectoRepository
                .findByProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(idProyecto, RolProyecto.LIDER)
                .map(asignacion -> usuarioMapper.toResponse(asignacion.getUsuario()))
                .orElse(null);
    }

    private EstadoProyecto parsearEstado(String estadoTexto) {
        try {
            return EstadoProyecto.desdeValor(estadoTexto);
        } catch (IllegalArgumentException ex) {
            throw new BusinessException(ex.getMessage());
        }
    }

    private void validarFechas(ProyectoRequest request) {
        if (request.getFechaFin().isBefore(request.getFechaInicio())) {
            throw new BusinessException("La fecha de fin no puede ser anterior a la fecha de inicio.");
        }
    }

    private Proyecto buscarOFallar(Integer idProyecto) {
        return proyectoRepository.findById(idProyecto)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un proyecto con id " + idProyecto + "."));
    }

    private void validarCodigoDisponible(String codigoProyecto, Integer idProyectoActual) {
        proyectoRepository.findByCodigoProyecto(codigoProyecto).ifPresent(existente -> {
            if (idProyectoActual == null || !existente.getIdProyecto().equals(idProyectoActual)) {
                throw new ConflictException(
                        "Ya existe un proyecto con el código '" + codigoProyecto + "'.");
            }
        });
    }
}
