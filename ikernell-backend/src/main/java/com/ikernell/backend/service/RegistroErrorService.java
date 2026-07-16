package com.ikernell.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ikernell.backend.audit.DetalleObjectMapper;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.constants.RolConstantes;
import com.ikernell.backend.dto.NotificacionRequest;
import com.ikernell.backend.dto.RegistroErrorRequest;
import com.ikernell.backend.dto.RegistroErrorResponse;
import com.ikernell.backend.entity.Actividad;
import com.ikernell.backend.entity.RegistroError;
import com.ikernell.backend.entity.TipoError;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.EstadoRegistroError;
import com.ikernell.backend.enums.NivelCriticidad;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.enums.RolProyecto;
import com.ikernell.backend.enums.TipoNotificacion;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ForbiddenException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.RegistroErrorMapper;
import com.ikernell.backend.repository.ActividadRepository;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.RegistroErrorRepository;
import com.ikernell.backend.repository.TipoErrorRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RegistroErrorService {

    private final RegistroErrorRepository registroErrorRepository;
    private final ActividadRepository actividadRepository;
    private final TipoErrorRepository tipoErrorRepository;
    private final RegistroErrorMapper registroErrorMapper;
    private final AsignacionProyectoRepository asignacionProyectoRepository;
    private final AutorizacionProyectoService autorizacionProyectoService;
    private final NotificacionService notificacionService;
    private final UsuarioRepository usuarioRepository;
    private final TrazabilidadService trazabilidadService;
    private final CodigoGeneradorService codigoGeneradorService;


    /**
     * CORREGIDO: antes cualquier autenticado podía reportar un error en
     * CUALQUIER actividad de CUALQUIER proyecto -- ahora se exige
     * pertenecer al equipo vigente del proyecto dueño de la actividad (o
     * ser Coordinador). No se exige ser el dueño de la actividad en sí:
     * cualquier miembro del equipo puede reportar errores encontrados en
     * el trabajo de sus compañeros de proyecto, no solo en el propio.
     */
    @Transactional
    public RegistroErrorResponse crear(RegistroErrorRequest request, String correoSolicitante) {
        Actividad actividad = actividadRepository.findById(request.getIdActividad())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una actividad con id " + request.getIdActividad() + "."));

        Usuario solicitante = autorizacionProyectoService.verificarPerteneceAlEquipo(
                correoSolicitante, actividad.getEtapa().getProyecto().getIdProyecto());

        TipoError tipoError = tipoErrorRepository.findById(request.getIdTipoError())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un tipo de error con id " + request.getIdTipoError() + "."));

        RegistroError registroError = registroErrorMapper.toEntity(request);
        registroError.setActividad(actividad);
        registroError.setTipoError(tipoError);
        // NUEVO: quién lo creó -- cualquier miembro vigente del equipo del
        // proyecto (no necesariamente el dueño de la actividad), o el
        // Coordinador.
        registroError.setUsuarioCreador(solicitante);
        // NUEVO: todo registro nace Abierto -- nunca se crea ya
        // Resuelto/Descartado, eso solo se llega ahí vía cambiarEstado().
        registroError.setEstado(EstadoRegistroError.ABIERTO);

        RegistroError guardado = guardarConCodigoUnico(registroError, actividad);

        // NUEVO: solo Alta/Crítica notifica -- Baja/Media son ruido para
        // el Líder, se ven igual en la vista de supervisión de Errores.
        if (guardado.getSeveridad() == NivelCriticidad.ALTA || guardado.getSeveridad() == NivelCriticidad.CRITICA) {
            Integer idProyecto = actividad.getEtapa().getProyecto().getIdProyecto();
            asignacionProyectoRepository
                    .findByProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(idProyecto, RolProyecto.LIDER)
                    .ifPresent(asignacionLider -> notificacionService.crear(new NotificacionRequest(
                            asignacionLider.getUsuario().getIdUsuario(),
                            "Error " + guardado.getSeveridad().getValor().toLowerCase() + " registrado",
                            guardado.getTitulo() + " -- " + actividad.getNombreActividad(),
                            TipoNotificacion.ERROR,
                            "/dashboard/proyectos/" + idProyecto)));
        }

        RegistroErrorResponse response = registroErrorMapper.toResponse(guardado);
        trazabilidadService.registrar(
                solicitante, "RegistroError", guardado.getCodigoRegistroError(),
                OperacionTrazabilidad.CREAR, construirDetalle(response));

        return response;
    }

    public List<RegistroErrorResponse> listarTodos() {
        return registroErrorRepository.findAllByOrderByIdRegistroErrorAsc().stream().map(registroErrorMapper::toResponse).toList();
    }

    public List<RegistroErrorResponse> listarPorActividad(Integer idActividad) {
        return registroErrorRepository.findByActividad_IdActividadOrderByIdRegistroErrorAsc(idActividad)
                .stream()
                .map(registroErrorMapper::toResponse)
                .toList();
    }

    public RegistroErrorResponse obtenerPorId(Integer idRegistroError) {
        RegistroError registroError = buscarOFallar(idRegistroError);
        return registroErrorMapper.toResponse(registroError);
    }

    /**
     * NUEVO: quien reportó el error se entera cuando se Resuelve o
     * Descarta -- son los dos cierres de ciclo de vida que le interesan;
     * "En progreso" es ruido para quien solo quiere saber si su reporte
     * se atendió. Si el creador fue quien mismo cambió el estado (caso
     * común: el propio desarrollador lo resuelve), no se le notifica a
     * sí mismo.
     */
    private void notificarResolucionAlCreador(RegistroError registroError, EstadoRegistroError nuevoEstado, Usuario solicitante) {
        if (nuevoEstado != EstadoRegistroError.RESUELTO && nuevoEstado != EstadoRegistroError.DESCARTADO) {
            return;
        }

        Usuario creador = registroError.getUsuarioCreador();
        if (creador == null || creador.getIdUsuario().equals(solicitante.getIdUsuario())) {
            return;
        }

        notificacionService.crear(new NotificacionRequest(
                creador.getIdUsuario(),
                nuevoEstado == EstadoRegistroError.RESUELTO ? "Tu error fue resuelto" : "Tu error fue descartado",
                registroError.getTitulo() + " -- " + registroError.getActividad().getNombreActividad(),
                TipoNotificacion.ERROR,
                "/dashboard/proyectos/" + registroError.getActividad().getEtapa().getProyecto().getIdProyecto()));
    }

    /**
     * CORREGIDO: antes no exigía ninguna relación con el proyecto -- cualquier
     * autenticado podía cambiar el estado de un error ajeno. Igual que en
     * crear(), se exige pertenecer al equipo vigente del proyecto dueño de
     * la actividad (o ser Coordinador): no hay un único "responsable" del
     * error como sí lo hay en Actividad (usuarioCreador es quien lo
     * reportó, no necesariamente quien lo resuelve), así que el límite
     * natural es el mismo que para reportarlo.
     */
    @Transactional
    public RegistroErrorResponse cambiarEstado(
            Integer idRegistroError, String estadoTexto, String notaResolucion, String correoSolicitante) {
        RegistroError registroError = buscarOFallar(idRegistroError);
        Usuario solicitante = autorizacionProyectoService.verificarPerteneceAlEquipo(
                correoSolicitante, registroError.getActividad().getEtapa().getProyecto().getIdProyecto());

        EstadoRegistroError nuevoEstado = parsearEstado(estadoTexto);

        registroError.setEstado(nuevoEstado);
        // NUEVO: la nota de resolución solo tiene sentido si el error quedó
        // Resuelto o Descartado -- se limpia en cualquier otro estado, igual
        // que fechaFinalizacion en Actividad, para no dejar un dato huérfano.
        registroError.setNotaResolucion(
                (nuevoEstado == EstadoRegistroError.RESUELTO || nuevoEstado == EstadoRegistroError.DESCARTADO)
                        ? notaResolucion : null);
        RegistroError guardado = registroErrorRepository.save(registroError);
        notificarResolucionAlCreador(guardado, nuevoEstado, solicitante);

        RegistroErrorResponse response = registroErrorMapper.toResponse(guardado);
        trazabilidadService.registrar(
                solicitante, "RegistroError", guardado.getCodigoRegistroError(),
                OperacionTrazabilidad.CAMBIAR_ESTADO, construirDetalle(response));

        return response;
    }

    /**
     * Delete físico, sin restricción de integridad referencial (nada
     * cuelga de un RegistroError). Reservado al usuario que lo creó, o a
     * un Coordinador como red de seguridad -- igual criterio que el resto
     * de la app (líder/coordinador siempre pueden intervenir).
     */
    @Transactional
    public void eliminar(Integer idRegistroError, String correoSolicitante) {
        Usuario solicitante = usuarioRepository.findByCorreoElectronico(correoSolicitante)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoSolicitante + "'."));

        RegistroError registroError = buscarOFallar(idRegistroError);

        boolean esCreador = registroError.getUsuarioCreador() != null
                && registroError.getUsuarioCreador().getIdUsuario().equals(solicitante.getIdUsuario());
        boolean esCoordinador = RolConstantes.COORDINADOR.equals(solicitante.getRol().getCodigoRol());

        if (!esCreador && !esCoordinador) {
            throw new ForbiddenException(
                    "Solo quien registró este error, o un Coordinador, puede eliminarlo.");
        }

        String detalle = construirDetalle(registroErrorMapper.toResponse(registroError));

        registroErrorRepository.delete(registroError);

        trazabilidadService.registrar(
                solicitante, "RegistroError", registroError.getCodigoRegistroError(),
                OperacionTrazabilidad.ELIMINAR, detalle);
    }

    private String construirDetalle(RegistroErrorResponse response) {
        try {
            return DetalleObjectMapper.INSTANCE.writeValueAsString(response);
        } catch (JsonProcessingException ex) {
            return "No fue posible serializar el detalle: " + ex.getMessage();
        }
    }

    private EstadoRegistroError parsearEstado(String estadoTexto) {
        try {
            return EstadoRegistroError.desdeValor(estadoTexto);
        } catch (IllegalArgumentException ex) {
            throw new BusinessException(ex.getMessage());
        }
    }

    /**
     * CORREGIDO: ver comentario equivalente en
     * UsuarioService.guardarConCodigoUnico() -- dos altas concurrentes
     * DENTRO DE LA MISMA ACTIVIDAD pueden calcular el mismo siguiente
     * código antes de que la primera termine de guardar; se traduce la
     * violación de uq_registro_error_codigo a un 409 legible en vez de un
     * 500 sin explicación.
     */
    private RegistroError guardarConCodigoUnico(RegistroError registroError, Actividad actividad) {
        registroError.setCodigoRegistroError(codigoGeneradorService.siguienteCodigoRegistroError(actividad));
        try {
            return registroErrorRepository.save(registroError);
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException("No se pudo generar un código único para el registro de error, intenta nuevamente.");
        }
    }

    private RegistroError buscarOFallar(Integer idRegistroError) {
        return registroErrorRepository.findById(idRegistroError)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un registro de error con id " + idRegistroError + "."));
    }

}
