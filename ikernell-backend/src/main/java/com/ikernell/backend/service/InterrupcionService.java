package com.ikernell.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ikernell.backend.audit.DetalleObjectMapper;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.constants.RolConstantes;
import com.ikernell.backend.dto.InterrupcionRequest;
import com.ikernell.backend.dto.InterrupcionResponse;
import com.ikernell.backend.dto.NotificacionRequest;
import com.ikernell.backend.entity.Actividad;
import com.ikernell.backend.entity.Interrupcion;
import com.ikernell.backend.entity.TipoInterrupcion;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.EstadoActividad;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.enums.RolProyecto;
import com.ikernell.backend.enums.TipoNotificacion;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ForbiddenException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.InterrupcionMapper;
import com.ikernell.backend.repository.ActividadRepository;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.InterrupcionRepository;
import com.ikernell.backend.repository.TipoInterrupcionRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InterrupcionService {

    private final InterrupcionRepository interrupcionRepository;
    private final ActividadRepository actividadRepository;
    private final TipoInterrupcionRepository tipoInterrupcionRepository;
    private final InterrupcionMapper interrupcionMapper;
    private final UsuarioRepository usuarioRepository;
    private final AsignacionProyectoRepository asignacionProyectoRepository;
    private final AutorizacionProyectoService autorizacionProyectoService;
    private final NotificacionService notificacionService;
    private final TrazabilidadService trazabilidadService;
    private final CodigoGeneradorService codigoGeneradorService;


    /**
     * CORREGIDO: mismo bug que tenía RegistroErrorService.crear() -- antes
     * cualquier autenticado podía registrar una interrupción en CUALQUIER
     * actividad de CUALQUIER proyecto. Ahora se exige pertenecer al equipo
     * vigente del proyecto dueño de la actividad (o ser Coordinador).
     */
    @Transactional
    public InterrupcionResponse crear(InterrupcionRequest request, String correoSolicitante) {
        Actividad actividad = actividadRepository.findById(request.getIdActividad())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una actividad con id " + request.getIdActividad() + "."));

        Usuario solicitante = autorizacionProyectoService.verificarPerteneceAlEquipo(
                correoSolicitante, actividad.getEtapa().getProyecto().getIdProyecto());

        // NUEVO: una interrupción implica que se estaba trabajando
        // activamente en ese momento -- no tiene sentido registrar una
        // sobre algo ya Finalizado o Cancelado. Un RegistroError SÍ se
        // deja sin esta restricción a propósito (un bug puede
        // descubrirse después de dar la actividad por terminada).
        if (actividad.getEstado() == EstadoActividad.FINALIZADA
                || actividad.getEstado() == EstadoActividad.CANCELADA) {
            throw new BusinessException(
                    "No se puede registrar una interrupción sobre una actividad '"
                            + actividad.getEstado().getValor() + "'.");
        }

        TipoInterrupcion tipoInterrupcion = tipoInterrupcionRepository.findById(request.getIdTipoInterrupcion())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un tipo de interrupción con id " + request.getIdTipoInterrupcion() + "."));

        Interrupcion interrupcion = interrupcionMapper.toEntity(request);
        interrupcion.setActividad(actividad);
        interrupcion.setTipoInterrupcion(tipoInterrupcion);
        interrupcion.setUsuarioCreador(solicitante);

        Interrupcion guardada = guardarConCodigoUnico(interrupcion, actividad);
        notificarLider(guardada, solicitante);

        InterrupcionResponse response = interrupcionMapper.toResponse(guardada);
        trazabilidadService.registrar(
                solicitante, "Interrupcion", guardada.getCodigoInterrupcion(),
                OperacionTrazabilidad.CREAR, construirDetalle(response));

        return response;
    }

    /**
     * NUEVO: el Líder vigente del proyecto se entera de cada interrupción
     * registrada -- a diferencia de RegistroError, aquí no hay un campo
     * de severidad para filtrar ruido, así que se notifica siempre (una
     * interrupción ya es, por definición, un evento que vale la pena que
     * el Líder conozca, no un dato rutinario). Si el propio Líder fue
     * quien la registró, no se le notifica a sí mismo.
     */
    /**
     * CORREGIDO: ver comentario equivalente en
     * UsuarioService.guardarConCodigoUnico() -- dos altas concurrentes
     * DENTRO DE LA MISMA ACTIVIDAD pueden calcular el mismo siguiente
     * código antes de que la primera termine de guardar; se traduce la
     * violación de uq_interrupcion_codigo a un 409 legible en vez de un
     * 500 sin explicación.
     */
    private Interrupcion guardarConCodigoUnico(Interrupcion interrupcion, Actividad actividad) {
        interrupcion.setCodigoInterrupcion(codigoGeneradorService.siguienteCodigoInterrupcion(actividad));
        try {
            return interrupcionRepository.save(interrupcion);
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException("No se pudo generar un código único para la interrupción, intenta nuevamente.");
        }
    }

    private void notificarLider(Interrupcion interrupcion, Usuario solicitante) {
        Integer idProyecto = interrupcion.getActividad().getEtapa().getProyecto().getIdProyecto();
        asignacionProyectoRepository
                .findByProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(idProyecto, RolProyecto.LIDER)
                .map(asignacion -> asignacion.getUsuario())
                .filter(lider -> !lider.getIdUsuario().equals(solicitante.getIdUsuario()))
                .ifPresent(lider -> notificacionService.crear(new NotificacionRequest(
                        lider.getIdUsuario(),
                        "Nueva interrupción registrada",
                        interrupcion.getTipoInterrupcion().getNombreTipoInterrupcion() + " en "
                                + interrupcion.getActividad().getNombreActividad(),
                        TipoNotificacion.INTERRUPCION,
                        "/dashboard/proyectos/" + idProyecto)));
    }

    /**
     * Delete físico, sin restricción de integridad referencial. Reservado
     * al usuario que la creó, o a un Coordinador como red de seguridad --
     * igual criterio que RegistroErrorService.eliminar().
     */
    @Transactional
    public void eliminar(Integer idInterrupcion, String correoSolicitante) {
        Usuario solicitante = usuarioRepository.findByCorreoElectronico(correoSolicitante)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoSolicitante + "'."));

        Interrupcion interrupcion = interrupcionRepository.findById(idInterrupcion)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una interrupción con id " + idInterrupcion + "."));

        boolean esCreador = interrupcion.getUsuarioCreador() != null
                && interrupcion.getUsuarioCreador().getIdUsuario().equals(solicitante.getIdUsuario());
        boolean esCoordinador = RolConstantes.COORDINADOR.equals(solicitante.getRol().getCodigoRol());

        if (!esCreador && !esCoordinador) {
            throw new ForbiddenException(
                    "Solo quien registró esta interrupción, o un Coordinador, puede eliminarla.");
        }

        String detalle = construirDetalle(interrupcionMapper.toResponse(interrupcion));

        interrupcionRepository.delete(interrupcion);

        trazabilidadService.registrar(
                solicitante, "Interrupcion", interrupcion.getCodigoInterrupcion(),
                OperacionTrazabilidad.ELIMINAR, detalle);
    }

    private String construirDetalle(InterrupcionResponse response) {
        try {
            return DetalleObjectMapper.INSTANCE.writeValueAsString(response);
        } catch (JsonProcessingException ex) {
            return "No fue posible serializar el detalle: " + ex.getMessage();
        }
    }

    public List<InterrupcionResponse> listarTodos() {
        return interrupcionRepository.findAll().stream().map(interrupcionMapper::toResponse).toList();
    }

    public List<InterrupcionResponse> listarPorActividad(Integer idActividad) {
        return interrupcionRepository.findByActividad_IdActividad(idActividad)
                .stream()
                .map(interrupcionMapper::toResponse)
                .toList();
    }

    public InterrupcionResponse obtenerPorId(Integer idInterrupcion) {
        Interrupcion interrupcion = interrupcionRepository.findById(idInterrupcion)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una interrupción con id " + idInterrupcion + "."));

        return interrupcionMapper.toResponse(interrupcion);
    }

}
