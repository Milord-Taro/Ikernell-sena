package com.ikernell.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ikernell.backend.audit.DetalleObjectMapper;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.constants.RolConstantes;
import com.ikernell.backend.dto.AsignacionProyectoRequest;
import com.ikernell.backend.dto.AsignacionProyectoResponse;
import com.ikernell.backend.dto.NotificacionRequest;
import com.ikernell.backend.entity.AsignacionProyecto;
import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.enums.RolProyecto;
import com.ikernell.backend.enums.TipoNotificacion;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.AsignacionProyectoMapper;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.ProyectoRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AsignacionProyectoService {

    private final AsignacionProyectoRepository asignacionProyectoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProyectoRepository proyectoRepository;
    private final AsignacionProyectoMapper asignacionProyectoMapper;
    private final AutorizacionProyectoService autorizacionProyectoService;
    private final NotificacionService notificacionService;
    private final TrazabilidadService trazabilidadService;


    @Transactional
    public AsignacionProyectoResponse crear(AsignacionProyectoRequest request, String correoSolicitante) {
        Usuario solicitante = autorizacionProyectoService.verificarPuedeGestionar(
                correoSolicitante, request.getIdProyecto());

        Usuario usuario = usuarioRepository.findById(request.getIdUsuario())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con id " + request.getIdUsuario() + "."));

        Proyecto proyecto = proyectoRepository.findById(request.getIdProyecto())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un proyecto con id " + request.getIdProyecto() + "."));

        // CERRADO: el Coordinador nunca es parte del equipo de un
        // proyecto puntual (gestiona por su rol organizacional). Antes
        // solo el frontend lo ocultaba de la lista; ahora también lo
        // rechaza el backend si alguien lo intenta vía API directa.
        if (usuario.getRol().getCodigoRol().equals(RolConstantes.COORDINADOR)) {
            throw new BusinessException("El Coordinador no puede ser miembro del equipo de un proyecto.");
        }

        // CERRADO: solo alguien con rol organizacional "Líder de
        // Proyecto" puede ocupar el puesto de Líder EN un proyecto. Un
        // Desarrollador sí puede terminar como Desarrollador en varios
        // proyectos, pero no como Líder de ninguno -- eso es un cambio
        // de rol organizacional, no una asignación de equipo.
        if (request.getRolProyecto() == RolProyecto.LIDER
                && !usuario.getRol().getCodigoRol().equals(RolConstantes.LIDER_PROYECTO)) {
            throw new BusinessException(
                    "Solo un usuario con rol organizacional 'Líder de Proyecto' puede asignarse como líder de un proyecto.");
        }

        asignacionProyectoRepository
                .findByUsuario_IdUsuarioAndProyecto_IdProyectoAndFechaDesvinculacionIsNull(
                        request.getIdUsuario(), request.getIdProyecto())
                .ifPresent(existente -> {
                    throw new ConflictException(
                            "El usuario ya tiene una asignación vigente en este proyecto.");
                });

        // NUEVO: solo puede haber UN Líder vigente por proyecto. Si se
        // está asignando un nuevo Líder y ya existe uno, se reemplaza
        // (se desvincula automáticamente al anterior) en vez de acumular
        // varios líderes simultáneos, que no tiene sentido de negocio.
        if (request.getRolProyecto() == RolProyecto.LIDER) {
            asignacionProyectoRepository
                    .findByProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(
                            request.getIdProyecto(), RolProyecto.LIDER)
                    .ifPresent(liderAnterior -> {
                        liderAnterior.setFechaDesvinculacion(LocalDate.now());
                        asignacionProyectoRepository.save(liderAnterior);
                    });
        }

        AsignacionProyecto asignacion = asignacionProyectoMapper.toEntity(request);
        asignacion.setUsuario(usuario);
        asignacion.setProyecto(proyecto);

        AsignacionProyecto guardada = asignacionProyectoRepository.save(asignacion);

        notificacionService.crear(new NotificacionRequest(
                usuario.getIdUsuario(),
                "Te agregaron a un proyecto",
                "Ahora eres " + request.getRolProyecto().getValor() + " en \"" + proyecto.getNombreProyecto() + "\".",
                TipoNotificacion.PROYECTO,
                "/dashboard/proyectos/" + proyecto.getIdProyecto()));

        AsignacionProyectoResponse response = asignacionProyectoMapper.toResponse(guardada);
        trazabilidadService.registrar(
                solicitante, "AsignacionProyecto", String.valueOf(guardada.getIdAsignacionProyecto()),
                OperacionTrazabilidad.ASIGNAR, construirDetalle(response));

        return response;
    }

    public List<AsignacionProyectoResponse> listarPorProyecto(Integer idProyecto) {
        return asignacionProyectoRepository.findByProyecto_IdProyecto(idProyecto)
                .stream()
                .map(asignacionProyectoMapper::toResponse)
                .toList();
    }

    public List<AsignacionProyectoResponse> listarPorUsuario(Integer idUsuario) {
        return asignacionProyectoRepository.findByUsuario_IdUsuario(idUsuario)
                .stream()
                .map(asignacionProyectoMapper::toResponse)
                .toList();
    }

    @Transactional
    public AsignacionProyectoResponse desvincular(Integer idAsignacionProyecto, String correoSolicitante) {
        AsignacionProyecto asignacion = asignacionProyectoRepository.findById(idAsignacionProyecto)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una asignación con id " + idAsignacionProyecto + "."));

        Usuario solicitante = autorizacionProyectoService.verificarPuedeGestionar(
                correoSolicitante, asignacion.getProyecto().getIdProyecto());

        if (asignacion.getFechaDesvinculacion() != null) {
            throw new BusinessException("Esta asignación ya fue desvinculada anteriormente.");
        }

        asignacion.setFechaDesvinculacion(LocalDate.now());
        AsignacionProyecto guardada = asignacionProyectoRepository.save(asignacion);

        AsignacionProyectoResponse response = asignacionProyectoMapper.toResponse(guardada);
        trazabilidadService.registrar(
                solicitante, "AsignacionProyecto", String.valueOf(guardada.getIdAsignacionProyecto()),
                OperacionTrazabilidad.DESASIGNAR, construirDetalle(response));

        return response;
    }

    private String construirDetalle(AsignacionProyectoResponse response) {
        try {
            return DetalleObjectMapper.INSTANCE.writeValueAsString(response);
        } catch (JsonProcessingException ex) {
            return "No fue posible serializar el detalle: " + ex.getMessage();
        }
    }
}
