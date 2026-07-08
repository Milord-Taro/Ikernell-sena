package com.ikernell.backend.service;

import com.ikernell.backend.dto.ProyectoRequest;
import com.ikernell.backend.dto.ProyectoResponse;
import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.enums.EstadoProyecto;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.ProyectoMapper;
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
    private final ProyectoMapper proyectoMapper;

    @Transactional
    public ProyectoResponse crear(ProyectoRequest request) {
        validarCodigoDisponible(request.getCodigoProyecto(), null);
        validarFechas(request);

        Proyecto proyecto = proyectoMapper.toEntity(request);
        // El estado inicial siempre es PLANEACION (default del builder de la
        // entidad se pisaría con null si no se fija explícitamente aquí,
        // porque toEntity() lo ignora a propósito).
        proyecto.setEstado(EstadoProyecto.PLANEACION);

        Proyecto guardado = proyectoRepository.save(proyecto);

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
    public ProyectoResponse actualizar(Integer idProyecto, ProyectoRequest request) {
        Proyecto proyecto = buscarOFallar(idProyecto);

        validarCodigoDisponible(request.getCodigoProyecto(), idProyecto);
        validarFechas(request);

        proyectoMapper.actualizarEntidadDesdeRequest(request, proyecto);

        Proyecto actualizado = proyectoRepository.save(proyecto);

        return proyectoMapper.toResponse(actualizado);
    }

    @Transactional
    public ProyectoResponse cambiarEstado(Integer idProyecto, String nuevoEstadoTexto) {
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
