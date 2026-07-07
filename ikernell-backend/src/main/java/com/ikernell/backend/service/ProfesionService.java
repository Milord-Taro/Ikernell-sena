package com.ikernell.backend.service;

import com.ikernell.backend.dto.ProfesionRequest;
import com.ikernell.backend.dto.ProfesionResponse;
import com.ikernell.backend.entity.Profesion;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.ProfesionMapper;
import com.ikernell.backend.repository.ProfesionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProfesionService {

    private final ProfesionRepository profesionRepository;
    private final ProfesionMapper profesionMapper;

    @Transactional
    public ProfesionResponse crear(ProfesionRequest request) {
        validarCodigoDisponible(request.getCodigoProfesion(), null);
        validarNombreDisponible(request.getNombreProfesion(), null);

        Profesion profesion = profesionMapper.toEntity(request);
        Profesion guardada = profesionRepository.save(profesion);

        return profesionMapper.toResponse(guardada);
    }

    public List<ProfesionResponse> listarTodas() {
        return profesionRepository.findAll()
                .stream()
                .map(profesionMapper::toResponse)
                .toList();
    }

    public List<ProfesionResponse> listarActivas() {
        return profesionRepository.findByActivoTrue()
                .stream()
                .map(profesionMapper::toResponse)
                .toList();
    }

    public ProfesionResponse obtenerPorId(Integer idProfesion) {
        return profesionMapper.toResponse(buscarOFallar(idProfesion));
    }

    @Transactional
    public ProfesionResponse actualizar(Integer idProfesion, ProfesionRequest request) {
        Profesion profesion = buscarOFallar(idProfesion);

        validarCodigoDisponible(request.getCodigoProfesion(), idProfesion);
        validarNombreDisponible(request.getNombreProfesion(), idProfesion);

        profesionMapper.actualizarEntidadDesdeRequest(request, profesion);
        Profesion actualizada = profesionRepository.save(profesion);

        return profesionMapper.toResponse(actualizada);
    }

    @Transactional
    public ProfesionResponse cambiarEstado(Integer idProfesion, boolean activo) {
        Profesion profesion = buscarOFallar(idProfesion);
        profesion.setActivo(activo);
        Profesion guardada = profesionRepository.save(profesion);

        return profesionMapper.toResponse(guardada);
    }

    private Profesion buscarOFallar(Integer idProfesion) {
        return profesionRepository.findById(idProfesion)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una profesión con id " + idProfesion + "."));
    }

    private void validarCodigoDisponible(String codigoProfesion, Integer idProfesionActual) {
        profesionRepository.findByCodigoProfesion(codigoProfesion).ifPresent(existente -> {
            if (idProfesionActual == null || !existente.getIdProfesion().equals(idProfesionActual)) {
                throw new ConflictException(
                        "Ya existe una profesión con el código '" + codigoProfesion + "'.");
            }
        });
    }

    private void validarNombreDisponible(String nombreProfesion, Integer idProfesionActual) {
        profesionRepository.findByNombreProfesionIgnoreCase(nombreProfesion).ifPresent(existente -> {
            if (idProfesionActual == null || !existente.getIdProfesion().equals(idProfesionActual)) {
                throw new ConflictException(
                        "Ya existe una profesión con el nombre '" + nombreProfesion + "'.");
            }
        });
    }
}
