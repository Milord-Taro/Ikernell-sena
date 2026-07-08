package com.ikernell.backend.service;

import com.ikernell.backend.dto.TipoInterrupcionRequest;
import com.ikernell.backend.dto.TipoInterrupcionResponse;
import com.ikernell.backend.entity.TipoInterrupcion;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.TipoInterrupcionMapper;
import com.ikernell.backend.repository.TipoInterrupcionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TipoInterrupcionService {

    private final TipoInterrupcionRepository tipoInterrupcionRepository;
    private final TipoInterrupcionMapper tipoInterrupcionMapper;

    @Transactional
    public TipoInterrupcionResponse crear(TipoInterrupcionRequest request) {
        validarCodigoDisponible(request.getCodigoTipoInterrupcion(), null);
        validarNombreDisponible(request.getNombreTipoInterrupcion(), null);

        TipoInterrupcion tipo = tipoInterrupcionMapper.toEntity(request);
        TipoInterrupcion guardado = tipoInterrupcionRepository.save(tipo);

        return tipoInterrupcionMapper.toResponse(guardado);
    }

    public List<TipoInterrupcionResponse> listarTodos() {
        return tipoInterrupcionRepository.findAll().stream().map(tipoInterrupcionMapper::toResponse).toList();
    }

    public List<TipoInterrupcionResponse> listarActivos() {
        return tipoInterrupcionRepository.findByActivoTrue().stream().map(tipoInterrupcionMapper::toResponse).toList();
    }

    public TipoInterrupcionResponse obtenerPorId(Integer idTipoInterrupcion) {
        return tipoInterrupcionMapper.toResponse(buscarOFallar(idTipoInterrupcion));
    }

    @Transactional
    public TipoInterrupcionResponse actualizar(Integer idTipoInterrupcion, TipoInterrupcionRequest request) {
        TipoInterrupcion tipo = buscarOFallar(idTipoInterrupcion);

        validarCodigoDisponible(request.getCodigoTipoInterrupcion(), idTipoInterrupcion);
        validarNombreDisponible(request.getNombreTipoInterrupcion(), idTipoInterrupcion);

        tipoInterrupcionMapper.actualizarEntidadDesdeRequest(request, tipo);
        TipoInterrupcion actualizado = tipoInterrupcionRepository.save(tipo);

        return tipoInterrupcionMapper.toResponse(actualizado);
    }

    @Transactional
    public TipoInterrupcionResponse cambiarEstado(Integer idTipoInterrupcion, boolean activo) {
        TipoInterrupcion tipo = buscarOFallar(idTipoInterrupcion);
        tipo.setActivo(activo);
        TipoInterrupcion guardado = tipoInterrupcionRepository.save(tipo);

        return tipoInterrupcionMapper.toResponse(guardado);
    }

    private TipoInterrupcion buscarOFallar(Integer idTipoInterrupcion) {
        return tipoInterrupcionRepository.findById(idTipoInterrupcion)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un tipo de interrupción con id " + idTipoInterrupcion + "."));
    }

    private void validarCodigoDisponible(String codigo, Integer idActual) {
        tipoInterrupcionRepository.findByCodigoTipoInterrupcion(codigo).ifPresent(existente -> {
            if (idActual == null || !existente.getIdTipoInterrupcion().equals(idActual)) {
                throw new ConflictException("Ya existe un tipo de interrupción con el código '" + codigo + "'.");
            }
        });
    }

    private void validarNombreDisponible(String nombre, Integer idActual) {
        tipoInterrupcionRepository.findByNombreTipoInterrupcionIgnoreCase(nombre).ifPresent(existente -> {
            if (idActual == null || !existente.getIdTipoInterrupcion().equals(idActual)) {
                throw new ConflictException("Ya existe un tipo de interrupción con el nombre '" + nombre + "'.");
            }
        });
    }
}
