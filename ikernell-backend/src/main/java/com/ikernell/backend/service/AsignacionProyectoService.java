package com.ikernell.backend.service;

import com.ikernell.backend.dto.AsignacionProyectoRequest;
import com.ikernell.backend.dto.AsignacionProyectoResponse;
import com.ikernell.backend.entity.AsignacionProyecto;
import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.entity.Usuario;
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

    @Transactional
    public AsignacionProyectoResponse crear(AsignacionProyectoRequest request) {
        Usuario usuario = usuarioRepository.findById(request.getIdUsuario())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con id " + request.getIdUsuario() + "."));

        Proyecto proyecto = proyectoRepository.findById(request.getIdProyecto())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un proyecto con id " + request.getIdProyecto() + "."));

        asignacionProyectoRepository
                .findByUsuario_IdUsuarioAndProyecto_IdProyectoAndFechaDesvinculacionIsNull(
                        request.getIdUsuario(), request.getIdProyecto())
                .ifPresent(existente -> {
                    throw new ConflictException(
                            "El usuario ya tiene una asignación vigente en este proyecto.");
                });

        AsignacionProyecto asignacion = asignacionProyectoMapper.toEntity(request);
        asignacion.setUsuario(usuario);
        asignacion.setProyecto(proyecto);

        AsignacionProyecto guardada = asignacionProyectoRepository.save(asignacion);

        return asignacionProyectoMapper.toResponse(guardada);
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
    public AsignacionProyectoResponse desvincular(Integer idAsignacionProyecto) {
        AsignacionProyecto asignacion = asignacionProyectoRepository.findById(idAsignacionProyecto)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una asignación con id " + idAsignacionProyecto + "."));

        if (asignacion.getFechaDesvinculacion() != null) {
            throw new BusinessException("Esta asignación ya fue desvinculada anteriormente.");
        }

        asignacion.setFechaDesvinculacion(LocalDate.now());
        AsignacionProyecto guardada = asignacionProyectoRepository.save(asignacion);

        return asignacionProyectoMapper.toResponse(guardada);
    }
}
