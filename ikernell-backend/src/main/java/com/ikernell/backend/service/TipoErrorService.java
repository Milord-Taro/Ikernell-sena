package com.ikernell.backend.service;

import com.ikernell.backend.dto.TipoErrorRequest;
import com.ikernell.backend.dto.TipoErrorResponse;
import com.ikernell.backend.entity.TipoError;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.TipoErrorMapper;
import com.ikernell.backend.repository.TipoErrorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TipoErrorService {

    private final TipoErrorRepository tipoErrorRepository;
    private final TipoErrorMapper tipoErrorMapper;

    @Transactional
    public TipoErrorResponse crear(TipoErrorRequest request) {
        validarCodigoDisponible(request.getCodigoTipoError(), null);
        validarNombreDisponible(request.getNombreTipoError(), null);

        TipoError tipoError = tipoErrorMapper.toEntity(request);
        TipoError guardado = tipoErrorRepository.save(tipoError);

        return tipoErrorMapper.toResponse(guardado);
    }

    public List<TipoErrorResponse> listarTodos() {
        return tipoErrorRepository.findAll().stream().map(tipoErrorMapper::toResponse).toList();
    }

    public List<TipoErrorResponse> listarActivos() {
        return tipoErrorRepository.findByActivoTrue().stream().map(tipoErrorMapper::toResponse).toList();
    }

    public TipoErrorResponse obtenerPorId(Integer idTipoError) {
        return tipoErrorMapper.toResponse(buscarOFallar(idTipoError));
    }

    @Transactional
    public TipoErrorResponse actualizar(Integer idTipoError, TipoErrorRequest request) {
        TipoError tipoError = buscarOFallar(idTipoError);

        validarCodigoDisponible(request.getCodigoTipoError(), idTipoError);
        validarNombreDisponible(request.getNombreTipoError(), idTipoError);

        tipoErrorMapper.actualizarEntidadDesdeRequest(request, tipoError);
        TipoError actualizado = tipoErrorRepository.save(tipoError);

        return tipoErrorMapper.toResponse(actualizado);
    }

    @Transactional
    public TipoErrorResponse cambiarEstado(Integer idTipoError, boolean activo) {
        TipoError tipoError = buscarOFallar(idTipoError);
        tipoError.setActivo(activo);
        TipoError guardado = tipoErrorRepository.save(tipoError);

        return tipoErrorMapper.toResponse(guardado);
    }

    private TipoError buscarOFallar(Integer idTipoError) {
        return tipoErrorRepository.findById(idTipoError)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un tipo de error con id " + idTipoError + "."));
    }

    private void validarCodigoDisponible(String codigo, Integer idActual) {
        tipoErrorRepository.findByCodigoTipoError(codigo).ifPresent(existente -> {
            if (idActual == null || !existente.getIdTipoError().equals(idActual)) {
                throw new ConflictException("Ya existe un tipo de error con el código '" + codigo + "'.");
            }
        });
    }

    private void validarNombreDisponible(String nombre, Integer idActual) {
        tipoErrorRepository.findByNombreTipoErrorIgnoreCase(nombre).ifPresent(existente -> {
            if (idActual == null || !existente.getIdTipoError().equals(idActual)) {
                throw new ConflictException("Ya existe un tipo de error con el nombre '" + nombre + "'.");
            }
        });
    }
}
