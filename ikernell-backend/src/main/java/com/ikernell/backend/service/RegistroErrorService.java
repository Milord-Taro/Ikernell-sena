package com.ikernell.backend.service;

import com.ikernell.backend.dto.RegistroErrorRequest;
import com.ikernell.backend.dto.RegistroErrorResponse;
import com.ikernell.backend.entity.Actividad;
import com.ikernell.backend.entity.RegistroError;
import com.ikernell.backend.entity.TipoError;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.RegistroErrorMapper;
import com.ikernell.backend.repository.ActividadRepository;
import com.ikernell.backend.repository.RegistroErrorRepository;
import com.ikernell.backend.repository.TipoErrorRepository;
import lombok.RequiredArgsConstructor;
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

    @Transactional
    public RegistroErrorResponse crear(RegistroErrorRequest request) {
        Actividad actividad = actividadRepository.findById(request.getIdActividad())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una actividad con id " + request.getIdActividad() + "."));

        TipoError tipoError = tipoErrorRepository.findById(request.getIdTipoError())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un tipo de error con id " + request.getIdTipoError() + "."));

        validarCodigoDisponible(request.getCodigoRegistroError());

        RegistroError registroError = registroErrorMapper.toEntity(request);
        registroError.setActividad(actividad);
        registroError.setTipoError(tipoError);

        RegistroError guardado = registroErrorRepository.save(registroError);

        return registroErrorMapper.toResponse(guardado);
    }

    public List<RegistroErrorResponse> listarTodos() {
        return registroErrorRepository.findAll().stream().map(registroErrorMapper::toResponse).toList();
    }

    public List<RegistroErrorResponse> listarPorActividad(Integer idActividad) {
        return registroErrorRepository.findByActividad_IdActividad(idActividad)
                .stream()
                .map(registroErrorMapper::toResponse)
                .toList();
    }

    public RegistroErrorResponse obtenerPorId(Integer idRegistroError) {
        RegistroError registroError = registroErrorRepository.findById(idRegistroError)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un registro de error con id " + idRegistroError + "."));

        return registroErrorMapper.toResponse(registroError);
    }

    private void validarCodigoDisponible(String codigo) {
        registroErrorRepository.findByCodigoRegistroError(codigo).ifPresent(existente -> {
            throw new ConflictException("Ya existe un registro de error con el código '" + codigo + "'.");
        });
    }
}
