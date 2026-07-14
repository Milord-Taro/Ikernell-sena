package com.ikernell.backend.service;

import com.ikernell.backend.dto.TrazabilidadResponse;
import com.ikernell.backend.entity.Trazabilidad;
import com.ikernell.backend.mapper.TrazabilidadMapper;
import com.ikernell.backend.repository.TrazabilidadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        return construirRespuestas(trazabilidadRepository.findAllByOrderByFechaEventoAsc());
    }

    public List<TrazabilidadResponse> listarPorEntidad(String entidad) {
        return construirRespuestas(trazabilidadRepository.findByEntidadOrderByFechaEventoAsc(entidad));
    }

    /**
     * Recibe los eventos en orden CRONOLÓGICO (más antiguo primero) y, en
     * un solo pase, le asigna a cada uno el "detalle" del evento
     * inmediatamente anterior sobre el mismo recurso (misma entidad +
     * código) -- así el frontend puede armar un diff antes/después sin
     * que el backend tenga que calcularlo campo a campo. Solo se
     * encadenan eventos cuyo "detalle" es JSON (empieza por '{'); los
     * mensajes de auditoría en texto plano (ej. "Inicio de sesión
     * exitoso.") ni generan ni reciben un "anterior".
     *
     * Al final se invierte la lista para devolver el orden habitual
     * (más reciente primero), igual que antes de este cambio.
     */
    private List<TrazabilidadResponse> construirRespuestas(List<Trazabilidad> eventosAsc) {
        Map<String, String> ultimoDetallePorRecurso = new HashMap<>();
        List<TrazabilidadResponse> respuestas = new ArrayList<>(eventosAsc.size());

        for (Trazabilidad evento : eventosAsc) {
            String clave = evento.getEntidad() + "::" + evento.getCodigoRegistro();
            boolean detalleEsJson = esDetalleJson(evento.getDetalle());

            TrazabilidadResponse response = trazabilidadMapper.toResponse(evento);
            if (detalleEsJson) {
                response.setDetalleAnterior(ultimoDetallePorRecurso.get(clave));
                ultimoDetallePorRecurso.put(clave, evento.getDetalle());
            }
            respuestas.add(response);
        }

        Collections.reverse(respuestas);
        return respuestas;
    }

    private boolean esDetalleJson(String detalle) {
        return detalle != null && detalle.strip().startsWith("{");
    }
}
