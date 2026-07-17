package com.ikernell.backend.service;

import com.ikernell.backend.audit.DetalleObjectMapper;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.dto.EtapaRequest;
import com.ikernell.backend.dto.EtapaResponse;
import com.ikernell.backend.dto.NotificacionRequest;
import com.ikernell.backend.entity.Etapa;
import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.EstadoEtapa;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.enums.RolProyecto;
import com.ikernell.backend.enums.TipoNotificacion;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.EtapaMapper;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.EtapaRepository;
import com.ikernell.backend.repository.ProyectoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EtapaService {

    private final EtapaRepository etapaRepository;
    private final ProyectoRepository proyectoRepository;
    private final AsignacionProyectoRepository asignacionProyectoRepository;
    private final EtapaMapper etapaMapper;
    private final AutorizacionProyectoService autorizacionProyectoService;
    private final TrazabilidadService trazabilidadService;
    private final NotificacionService notificacionService;
    private final CodigoGeneradorService codigoGeneradorService;

    @Transactional
    public EtapaResponse crear(EtapaRequest request, String correoSolicitante) {
        Usuario solicitante = autorizacionProyectoService.verificarPuedeGestionar(
                correoSolicitante, request.getIdProyecto());

        Proyecto proyecto = buscarProyectoOFallar(request.getIdProyecto());

        validarOrdenDisponible(request.getIdProyecto(), request.getOrden(), null);
        validarFechas(request);

        Etapa etapa = etapaMapper.toEntity(request);
        etapa.setProyecto(proyecto);
        etapa.setEstado(EstadoEtapa.PENDIENTE);

        Etapa guardada = guardarConCodigoUnico(etapa, proyecto);

        EtapaResponse response = etapaMapper.toResponse(guardada);
        trazabilidadService.registrar(
                solicitante, "Etapa", guardada.getCodigoEtapa(),
                OperacionTrazabilidad.CREAR, DetalleObjectMapper.serializar(response));

        return response;
    }

    public List<EtapaResponse> listarPorProyecto(Integer idProyecto) {
        return etapaRepository.findByProyecto_IdProyectoOrderByIdEtapaAsc(idProyecto)
                .stream()
                .map(etapaMapper::toResponse)
                .toList();
    }

    public EtapaResponse obtenerPorId(Integer idEtapa) {
        return etapaMapper.toResponse(buscarOFallar(idEtapa));
    }

    /**
     * El chequeo de ownership se hace tanto contra el proyecto ACTUAL de
     * la etapa como contra el proyecto DESTINO (request.getIdProyecto()).
     * Antes solo se validaba el actual -- así no se podía "sacar" una
     * etapa de un proyecto ajeno, pero sí se podía "meter" en uno,
     * moviéndola a un proyecto que el solicitante no gestiona con solo
     * mandar su id en el payload.
     */
    @Transactional
    public EtapaResponse actualizar(Integer idEtapa, EtapaRequest request, String correoSolicitante) {
        Etapa etapa = buscarOFallar(idEtapa);
        Usuario solicitante = autorizacionProyectoService.verificarPuedeGestionar(
                correoSolicitante, etapa.getProyecto().getIdProyecto());
        autorizacionProyectoService.verificarPuedeGestionar(correoSolicitante, request.getIdProyecto());

        Proyecto proyecto = buscarProyectoOFallar(request.getIdProyecto());

        validarOrdenDisponible(request.getIdProyecto(), request.getOrden(), idEtapa);
        validarFechas(request);

        etapaMapper.actualizarEntidadDesdeRequest(request, etapa);
        etapa.setProyecto(proyecto);

        Etapa actualizada = etapaRepository.save(etapa);

        EtapaResponse response = etapaMapper.toResponse(actualizada);
        trazabilidadService.registrar(
                solicitante, "Etapa", actualizada.getCodigoEtapa(),
                OperacionTrazabilidad.ACTUALIZAR, DetalleObjectMapper.serializar(response));

        return response;
    }

    @Transactional
    public EtapaResponse cambiarEstado(Integer idEtapa, String estadoTexto, String correoSolicitante) {
        Etapa etapa = buscarOFallar(idEtapa);
        Usuario solicitante = autorizacionProyectoService.verificarPuedeGestionar(
                correoSolicitante, etapa.getProyecto().getIdProyecto());

        EstadoEtapa nuevoEstado = parsearEstado(estadoTexto);

        etapa.setEstado(nuevoEstado);
        Etapa guardada = etapaRepository.save(etapa);
        notificarFinalizacionALider(guardada, nuevoEstado, solicitante);

        EtapaResponse response = etapaMapper.toResponse(guardada);
        trazabilidadService.registrar(
                solicitante, "Etapa", guardada.getCodigoEtapa(),
                OperacionTrazabilidad.CAMBIAR_ESTADO, DetalleObjectMapper.serializar(response));

        return response;
    }

    /**
     * NUEVO: el Líder vigente del proyecto se entera cuando una etapa se
     * Finaliza (una etapa no tiene estado "Cancelada" -- ver
     * EstadoEtapa). Si el propio Líder fue quien hizo el cambio, no se le
     * notifica a sí mismo.
     */
    private void notificarFinalizacionALider(Etapa etapa, EstadoEtapa nuevoEstado, Usuario solicitante) {
        if (nuevoEstado != EstadoEtapa.FINALIZADA) {
            return;
        }

        Integer idProyecto = etapa.getProyecto().getIdProyecto();
        asignacionProyectoRepository
                .findByProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(idProyecto, RolProyecto.LIDER)
                .map(asignacion -> asignacion.getUsuario())
                .filter(lider -> !lider.getIdUsuario().equals(solicitante.getIdUsuario()))
                .ifPresent(lider -> notificacionService.crear(new NotificacionRequest(
                        lider.getIdUsuario(),
                        "Etapa finalizada",
                        "\"" + etapa.getNombreEtapa() + "\" en " + etapa.getProyecto().getNombreProyecto()
                                + " se marcó como finalizada.",
                        TipoNotificacion.PROYECTO,
                        "/dashboard/proyectos/" + idProyecto)));
    }

    /**
     * Delete físico, protegido por ON DELETE RESTRICT en BD (fk_actividad_etapa).
     * Ownership validado igual que actualizar()/cambiarEstado(): contra el
     * proyecto ACTUAL de la etapa. Si la etapa todavía tiene actividades, la BD
     * rechaza el borrado y lo traducimos a un ConflictException legible. El
     * snapshot (JSON del Response actual) queda en Trazabilidad.detalle antes de
     * borrar la fila.
     */
    @Transactional
    public void eliminar(Integer idEtapa, String correoSolicitante) {
        Etapa etapa = buscarOFallar(idEtapa);
        Usuario solicitante = autorizacionProyectoService.verificarPuedeGestionar(
                correoSolicitante, etapa.getProyecto().getIdProyecto());

        String detalle = DetalleObjectMapper.serializar(etapaMapper.toResponse(etapa));

        try {
            etapaRepository.delete(etapa);
            etapaRepository.flush();
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException(
                    "No se puede eliminar la etapa '" + etapa.getNombreEtapa()
                            + "': tiene actividades registradas.");
        }

        trazabilidadService.registrar(
                solicitante, "Etapa", etapa.getCodigoEtapa(),
                OperacionTrazabilidad.ELIMINAR, detalle);
    }

    private EstadoEtapa parsearEstado(String estadoTexto) {
        try {
            return EstadoEtapa.desdeValor(estadoTexto);
        } catch (IllegalArgumentException ex) {
            throw new BusinessException(ex.getMessage());
        }
    }

    private void validarFechas(EtapaRequest request) {
        if (request.getFechaFin().isBefore(request.getFechaInicio())) {
            throw new BusinessException("La fecha de fin no puede ser anterior a la fecha de inicio.");
        }
    }

    /**
     * CORREGIDO: ver comentario equivalente en
     * UsuarioService.guardarConCodigoUnico() -- dos altas concurrentes
     * DENTRO DEL MISMO PROYECTO pueden calcular el mismo siguiente código
     * antes de que la primera termine de guardar; se traduce la violación
     * de uq_etapa_codigo a un 409 legible en vez de un 500 sin explicación.
     */
    private Etapa guardarConCodigoUnico(Etapa etapa, Proyecto proyecto) {
        etapa.setCodigoEtapa(codigoGeneradorService.siguienteCodigoEtapa(proyecto));
        try {
            return etapaRepository.save(etapa);
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException("No se pudo generar un código único para la etapa, intenta nuevamente.");
        }
    }

    private Etapa buscarOFallar(Integer idEtapa) {
        return etapaRepository.findById(idEtapa)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una etapa con id " + idEtapa + "."));
    }

    private Proyecto buscarProyectoOFallar(Integer idProyecto) {
        return proyectoRepository.findById(idProyecto)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un proyecto con id " + idProyecto + "."));
    }

    private void validarOrdenDisponible(Integer idProyecto, Integer orden, Integer idEtapaActual) {
        etapaRepository.findByProyecto_IdProyectoAndOrden(idProyecto, orden).ifPresent(existente -> {
            if (idEtapaActual == null || !existente.getIdEtapa().equals(idEtapaActual)) {
                throw new ConflictException(
                        "Ya existe una etapa con el orden " + orden + " en este proyecto.");
            }
        });
    }
}
