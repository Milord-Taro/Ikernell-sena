package com.ikernell.backend.service;

import com.ikernell.backend.dto.EspecialidadRequest;
import com.ikernell.backend.dto.EspecialidadResponse;
import com.ikernell.backend.entity.Especialidad;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.EspecialidadMapper;
import com.ikernell.backend.repository.EspecialidadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EspecialidadService {

    private final EspecialidadRepository especialidadRepository;
    private final EspecialidadMapper especialidadMapper;

    @Transactional
    public EspecialidadResponse crear(EspecialidadRequest request) {
        validarCodigoDisponible(request.getCodigoEspecialidad(), null);
        validarNombreDisponible(request.getNombreEspecialidad(), null);

        Especialidad especialidad = especialidadMapper.toEntity(request);
        Especialidad guardada = especialidadRepository.save(especialidad);

        return especialidadMapper.toResponse(guardada);
    }

    public List<EspecialidadResponse> listarTodas() {
        return especialidadRepository.findAll()
                .stream()
                .map(especialidadMapper::toResponse)
                .toList();
    }

    public List<EspecialidadResponse> listarActivas() {
        return especialidadRepository.findByActivoTrue()
                .stream()
                .map(especialidadMapper::toResponse)
                .toList();
    }

    public EspecialidadResponse obtenerPorId(Integer idEspecialidad) {
        return especialidadMapper.toResponse(buscarOFallar(idEspecialidad));
    }

    @Transactional
    public EspecialidadResponse actualizar(Integer idEspecialidad, EspecialidadRequest request) {
        Especialidad especialidad = buscarOFallar(idEspecialidad);

        validarCodigoDisponible(request.getCodigoEspecialidad(), idEspecialidad);
        validarNombreDisponible(request.getNombreEspecialidad(), idEspecialidad);

        especialidadMapper.actualizarEntidadDesdeRequest(request, especialidad);
        Especialidad actualizada = especialidadRepository.save(especialidad);

        return especialidadMapper.toResponse(actualizada);
    }

    @Transactional
    public EspecialidadResponse cambiarEstado(Integer idEspecialidad, boolean activo) {
        Especialidad especialidad = buscarOFallar(idEspecialidad);
        especialidad.setActivo(activo);
        Especialidad guardada = especialidadRepository.save(especialidad);

        return especialidadMapper.toResponse(guardada);
    }

    private Especialidad buscarOFallar(Integer idEspecialidad) {
        return especialidadRepository.findById(idEspecialidad)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una especialidad con id " + idEspecialidad + "."));
    }

    private void validarCodigoDisponible(String codigoEspecialidad, Integer idEspecialidadActual) {
        especialidadRepository.findByCodigoEspecialidad(codigoEspecialidad).ifPresent(existente -> {
            if (idEspecialidadActual == null || !existente.getIdEspecialidad().equals(idEspecialidadActual)) {
                throw new ConflictException(
                        "Ya existe una especialidad con el código '" + codigoEspecialidad + "'.");
            }
        });
    }

    private void validarNombreDisponible(String nombreEspecialidad, Integer idEspecialidadActual) {
        especialidadRepository.findByNombreEspecialidadIgnoreCase(nombreEspecialidad).ifPresent(existente -> {
            if (idEspecialidadActual == null || !existente.getIdEspecialidad().equals(idEspecialidadActual)) {
                throw new ConflictException(
                        "Ya existe una especialidad con el nombre '" + nombreEspecialidad + "'.");
            }
        });
    }
}
