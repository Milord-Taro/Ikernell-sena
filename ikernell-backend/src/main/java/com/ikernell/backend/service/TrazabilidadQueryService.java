package com.ikernell.backend.service;

import com.ikernell.backend.dto.TrazabilidadResponse;
import com.ikernell.backend.mapper.TrazabilidadMapper;
import com.ikernell.backend.repository.TrazabilidadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Separado de TrazabilidadService (audit/, que escribe) porque este es de
 * solo lectura para el Controller -- mantiene la regla de capas
 * (Controller nunca llama a un Repository directamente).
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TrazabilidadQueryService {

    private final TrazabilidadRepository trazabilidadRepository;
    private final TrazabilidadMapper trazabilidadMapper;

    public List<TrazabilidadResponse> listarTodos() {
        return trazabilidadRepository.findAllByOrderByFechaEventoDesc()
                .stream()
                .map(trazabilidadMapper::toResponse)
                .toList();
    }

    public List<TrazabilidadResponse> listarPorEntidad(String entidad) {
        return trazabilidadRepository.findByEntidadOrderByFechaEventoDesc(entidad)
                .stream()
                .map(trazabilidadMapper::toResponse)
                .toList();
    }
}
