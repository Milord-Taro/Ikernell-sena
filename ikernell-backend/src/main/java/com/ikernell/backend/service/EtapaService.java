package com.ikernell.backend.service;

import com.ikernell.backend.dto.EtapaRequest;
import com.ikernell.backend.dto.EtapaResponse;
import com.ikernell.backend.entity.Etapa;
import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.enums.EstadoEtapa;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.EtapaMapper;
import com.ikernell.backend.repository.EtapaRepository;
import com.ikernell.backend.repository.ProyectoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EtapaService {

    private final EtapaRepository etapaRepository;
    private final ProyectoRepository proyectoRepository;
    private final EtapaMapper etapaMapper;

    @Transactional
    public EtapaResponse crear(EtapaRequest request) {
        Proyecto proyecto = buscarProyectoOFallar(request.getIdProyecto());

        validarCodigoDisponible(request.getCodigoEtapa(), null);
        validarOrdenDisponible(request.getIdProyecto(), request.getOrden(), null);
        validarFechas(request);

        Etapa etapa = etapaMapper.toEntity(request);
        etapa.setProyecto(proyecto);
        etapa.setEstado(EstadoEtapa.PENDIENTE);

        Etapa guardada = etapaRepository.save(etapa);

        return etapaMapper.toResponse(guardada);
    }

    public List<EtapaResponse> listarPorProyecto(Integer idProyecto) {
        return etapaRepository.findByProyecto_IdProyecto(idProyecto)
                .stream()
                .map(etapaMapper::toResponse)
                .toList();
    }

    public EtapaResponse obtenerPorId(Integer idEtapa) {
        return etapaMapper.toResponse(buscarOFallar(idEtapa));
    }

    @Transactional
    public EtapaResponse actualizar(Integer idEtapa, EtapaRequest request) {
        Etapa etapa = buscarOFallar(idEtapa);
        Proyecto proyecto = buscarProyectoOFallar(request.getIdProyecto());

        validarCodigoDisponible(request.getCodigoEtapa(), idEtapa);
        validarOrdenDisponible(request.getIdProyecto(), request.getOrden(), idEtapa);
        validarFechas(request);

        etapaMapper.actualizarEntidadDesdeRequest(request, etapa);
        etapa.setProyecto(proyecto);

        Etapa actualizada = etapaRepository.save(etapa);

        return etapaMapper.toResponse(actualizada);
    }

    @Transactional
    public EtapaResponse cambiarEstado(Integer idEtapa, String estadoTexto) {
        Etapa etapa = buscarOFallar(idEtapa);
        EstadoEtapa nuevoEstado = parsearEstado(estadoTexto);

        etapa.setEstado(nuevoEstado);
        Etapa guardada = etapaRepository.save(etapa);

        return etapaMapper.toResponse(guardada);
    }

    private EstadoEtapa parsearEstado(String estadoTexto) {
        try {
            return EstadoEtapa.desdeValor(estadoTexto);
        } catch (IllegalArgumentException ex) {
            throw new BusinessException(ex.getMessage());
        }
    }

    private void validarFechas(EtapaRequest request) {
        if (request.getFechaFin().isBefore(request.getFechaInicio())) {
            throw new BusinessException("La fecha de fin no puede ser anterior a la fecha de inicio.");
        }
    }

    private Etapa buscarOFallar(Integer idEtapa) {
        return etapaRepository.findById(idEtapa)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una etapa con id " + idEtapa + "."));
    }

    private Proyecto buscarProyectoOFallar(Integer idProyecto) {
        return proyectoRepository.findById(idProyecto)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un proyecto con id " + idProyecto + "."));
    }

    private void validarCodigoDisponible(String codigoEtapa, Integer idEtapaActual) {
        etapaRepository.findByCodigoEtapa(codigoEtapa).ifPresent(existente -> {
            if (idEtapaActual == null || !existente.getIdEtapa().equals(idEtapaActual)) {
                throw new ConflictException(
                        "Ya existe una etapa con el código '" + codigoEtapa + "'.");
            }
        });
    }

    private void validarOrdenDisponible(Integer idProyecto, Integer orden, Integer idEtapaActual) {
        etapaRepository.findByProyecto_IdProyectoAndOrden(idProyecto, orden).ifPresent(existente -> {
            if (idEtapaActual == null || !existente.getIdEtapa().equals(idEtapaActual)) {
                throw new ConflictException(
                        "Ya existe una etapa con el orden " + orden + " en este proyecto.");
            }
        });
    }
}
