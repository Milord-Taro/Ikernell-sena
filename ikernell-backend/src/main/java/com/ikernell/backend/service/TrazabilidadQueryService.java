package com.ikernell.backend.service;

import com.ikernell.backend.dto.PaginaResponse;
import com.ikernell.backend.dto.TrazabilidadResponse;
import com.ikernell.backend.mapper.TrazabilidadMapper;
import com.ikernell.backend.repository.TrazabilidadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Separado de TrazabilidadService (audit/, que escribe) porque este es de
 * solo lectura para el Controller -- mantiene la regla de capas
 * (Controller nunca llama a un Repository directamente).
 *
 * CORREGIDO (C7): antes reconstruía "detalle anterior" en memoria,
 * recorriendo TODO el historial del recurso en cada lectura -- ahora esa
 * columna ya viene calculada desde que se creó el evento (ver
 * TrazabilidadService.registrar()), así que acá es un mapeo directo.
 *
 * CORREGIDO (B4): antes devolvía la tabla completa en cada lectura --
 * la única tabla que crece sin límite en todo el sistema. Ahora pagina en
 * la base de datos.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TrazabilidadQueryService {

    private final TrazabilidadRepository trazabilidadRepository;
    private final TrazabilidadMapper trazabilidadMapper;

    public PaginaResponse<TrazabilidadResponse> listarTodos(Pageable pageable) {
        return PaginaResponse.de(trazabilidadRepository.findAllByOrderByFechaEventoDesc(pageable)
                .map(trazabilidadMapper::toResponse));
    }

    public PaginaResponse<TrazabilidadResponse> listarPorEntidad(String entidad, Pageable pageable) {
        return PaginaResponse.de(trazabilidadRepository.findByEntidadOrderByFechaEventoDesc(entidad, pageable)
                .map(trazabilidadMapper::toResponse));
    }
}
