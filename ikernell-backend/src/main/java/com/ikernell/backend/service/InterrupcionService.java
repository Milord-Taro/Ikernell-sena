package com.ikernell.backend.service;

import com.ikernell.backend.dto.InterrupcionRequest;
import com.ikernell.backend.dto.InterrupcionResponse;
import com.ikernell.backend.entity.Actividad;
import com.ikernell.backend.entity.Interrupcion;
import com.ikernell.backend.entity.TipoInterrupcion;
import com.ikernell.backend.enums.EstadoActividad;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.InterrupcionMapper;
import com.ikernell.backend.repository.ActividadRepository;
import com.ikernell.backend.repository.InterrupcionRepository;
import com.ikernell.backend.repository.TipoInterrupcionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InterrupcionService {

    private final InterrupcionRepository interrupcionRepository;
    private final ActividadRepository actividadRepository;
    private final TipoInterrupcionRepository tipoInterrupcionRepository;
    private final InterrupcionMapper interrupcionMapper;

    @Transactional
    public InterrupcionResponse crear(InterrupcionRequest request) {
        Actividad actividad = actividadRepository.findById(request.getIdActividad())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una actividad con id " + request.getIdActividad() + "."));

        // NUEVO: una interrupción implica que se estaba trabajando
        // activamente en ese momento -- no tiene sentido registrar una
        // sobre algo ya Finalizado o Cancelado. Un RegistroError SÍ se
        // deja sin esta restricción a propósito (un bug puede
        // descubrirse después de dar la actividad por terminada).
        if (actividad.getEstado() == EstadoActividad.FINALIZADA
                || actividad.getEstado() == EstadoActividad.CANCELADA) {
            throw new BusinessException(
                    "No se puede registrar una interrupción sobre una actividad '"
                            + actividad.getEstado().getValor() + "'.");
        }

        TipoInterrupcion tipoInterrupcion = tipoInterrupcionRepository.findById(request.getIdTipoInterrupcion())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un tipo de interrupción con id " + request.getIdTipoInterrupcion() + "."));

        validarCodigoDisponible(request.getCodigoInterrupcion());

        Interrupcion interrupcion = interrupcionMapper.toEntity(request);
        interrupcion.setActividad(actividad);
        interrupcion.setTipoInterrupcion(tipoInterrupcion);

        Interrupcion guardada = interrupcionRepository.save(interrupcion);

        return interrupcionMapper.toResponse(guardada);
    }

    public List<InterrupcionResponse> listarTodos() {
        return interrupcionRepository.findAll().stream().map(interrupcionMapper::toResponse).toList();
    }

    public List<InterrupcionResponse> listarPorActividad(Integer idActividad) {
        return interrupcionRepository.findByActividad_IdActividad(idActividad)
                .stream()
                .map(interrupcionMapper::toResponse)
                .toList();
    }

    public InterrupcionResponse obtenerPorId(Integer idInterrupcion) {
        Interrupcion interrupcion = interrupcionRepository.findById(idInterrupcion)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una interrupción con id " + idInterrupcion + "."));

        return interrupcionMapper.toResponse(interrupcion);
    }

    private void validarCodigoDisponible(String codigo) {
        interrupcionRepository.findByCodigoInterrupcion(codigo).ifPresent(existente -> {
            throw new ConflictException("Ya existe una interrupción con el código '" + codigo + "'.");
        });
    }
}
