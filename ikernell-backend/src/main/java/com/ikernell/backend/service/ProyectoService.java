package com.ikernell.backend.service;

import com.ikernell.backend.constants.RolConstantes;
import com.ikernell.backend.dto.ProyectoRequest;
import com.ikernell.backend.dto.ProyectoResponse;
import com.ikernell.backend.entity.AsignacionProyecto;
import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.EstadoProyecto;
import com.ikernell.backend.enums.RolProyecto;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.ProyectoMapper;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.ProyectoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProyectoService {

    private final ProyectoRepository proyectoRepository;
    private final AsignacionProyectoRepository asignacionProyectoRepository;
    private final ProyectoMapper proyectoMapper;
    private final AutorizacionProyectoService autorizacionProyectoService;

    /**
     * Cualquiera con el rol organizacional Líder de Proyecto o Coordinador
     * puede crear un proyecto (el @PreAuthorize del Controller ya filtra
     * esto). Si quien crea es Líder de Proyecto, queda auto-vinculado como
     * el Líder de ESTE proyecto en AsignacionProyecto -- así desde el
     * primer momento hay un dueño claro y nadie más puede tocarlo salvo
     * Coordinador. Si quien crea es Coordinador, no se autovincula (el
     * Coordinador ya puede gestionar cualquier proyecto sin necesitar
     * estar en AsignacionProyecto).
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
            AsignacionProyecto asignacion = AsignacionProyecto.builder()
                    .usuario(creador)
                    .proyecto(guardado)
                    .rolProyecto(RolProyecto.LIDER)
                    .build();
            asignacionProyectoRepository.save(asignacion);
        }

        return proyectoMapper.toResponse(guardado);
    }

    public List<ProyectoResponse> listarTodos() {
        return proyectoRepository.findAll()
                .stream()
                .map(proyectoMapper::toResponse)
                .toList();
    }

    public List<ProyectoResponse> listarPorEstado(String estadoTexto) {
        EstadoProyecto estado = parsearEstado(estadoTexto);

        return proyectoRepository.findByEstado(estado)
                .stream()
                .map(proyectoMapper::toResponse)
                .toList();
    }

    public ProyectoResponse obtenerPorId(Integer idProyecto) {
        return proyectoMapper.toResponse(buscarOFallar(idProyecto));
    }

    @Transactional
    public ProyectoResponse actualizar(Integer idProyecto, ProyectoRequest request, String correoSolicitante) {
        autorizacionProyectoService.verificarPuedeGestionar(correoSolicitante, idProyecto);

        Proyecto proyecto = buscarOFallar(idProyecto);

        validarCodigoDisponible(request.getCodigoProyecto(), idProyecto);
        validarFechas(request);

        proyectoMapper.actualizarEntidadDesdeRequest(request, proyecto);

        Proyecto actualizado = proyectoRepository.save(proyecto);

        return proyectoMapper.toResponse(actualizado);
    }

    @Transactional
    public ProyectoResponse cambiarEstado(Integer idProyecto, String nuevoEstadoTexto, String correoSolicitante) {
        autorizacionProyectoService.verificarPuedeGestionar(correoSolicitante, idProyecto);

        Proyecto proyecto = buscarOFallar(idProyecto);
        EstadoProyecto nuevoEstado = parsearEstado(nuevoEstadoTexto);

        proyecto.setEstado(nuevoEstado);
        Proyecto guardado = proyectoRepository.save(proyecto);

        return proyectoMapper.toResponse(guardado);
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