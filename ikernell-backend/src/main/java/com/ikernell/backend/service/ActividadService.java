package com.ikernell.backend.service;

import com.ikernell.backend.dto.ActividadRequest;
import com.ikernell.backend.dto.ActividadResponse;
import com.ikernell.backend.entity.Actividad;
import com.ikernell.backend.entity.Etapa;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.EstadoActividad;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.ActividadMapper;
import com.ikernell.backend.repository.ActividadRepository;
import com.ikernell.backend.repository.EtapaRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ActividadService {

    private final ActividadRepository actividadRepository;
    private final EtapaRepository etapaRepository;
    private final UsuarioRepository usuarioRepository;
    private final ActividadMapper actividadMapper;

    @Transactional
    public ActividadResponse crear(ActividadRequest request) {
        Etapa etapa = buscarEtapaOFallar(request.getIdEtapa());
        validarCodigoDisponible(request.getCodigoActividad(), null);
        validarFechas(request);

        Actividad actividad = actividadMapper.toEntity(request);
        actividad.setEtapa(etapa);

        if (request.getIdUsuario() != null) {
            Usuario usuario = buscarUsuarioOFallar(request.getIdUsuario());
            actividad.setUsuario(usuario);
            actividad.setEstado(EstadoActividad.PENDIENTE);
        } else {
            actividad.setEstado(EstadoActividad.PENDIENTE_DE_ASIGNACION);
        }

        Actividad guardada = actividadRepository.save(actividad);

        return actividadMapper.toResponse(guardada);
    }

    public List<ActividadResponse> listarPorEtapa(Integer idEtapa) {
        return actividadRepository.findByEtapa_IdEtapa(idEtapa)
                .stream()
                .map(actividadMapper::toResponse)
                .toList();
    }

    public List<ActividadResponse> listarPorUsuario(Integer idUsuario) {
        return actividadRepository.findByUsuario_IdUsuario(idUsuario)
                .stream()
                .map(actividadMapper::toResponse)
                .toList();
    }

    public ActividadResponse obtenerPorId(Integer idActividad) {
        return actividadMapper.toResponse(buscarOFallar(idActividad));
    }

    /**
     * Edita datos descriptivos únicamente. NO toca usuario ni estado --
     * para eso están asignar() y cambiarEstado().
     */
    @Transactional
    public ActividadResponse actualizar(Integer idActividad, ActividadRequest request) {
        Actividad actividad = buscarOFallar(idActividad);
        Etapa etapa = buscarEtapaOFallar(request.getIdEtapa());

        validarCodigoDisponible(request.getCodigoActividad(), idActividad);
        validarFechas(request);

        actividadMapper.actualizarEntidadDesdeRequest(request, actividad);
        actividad.setEtapa(etapa);

        Actividad actualizada = actividadRepository.save(actividad);

        return actividadMapper.toResponse(actualizada);
    }

    /**
     * Asigna un desarrollador a una actividad sin asignar. Solo válido si
     * el estado actual es PENDIENTE_DE_ASIGNACION (garantiza la regla
     * cruzada estado<->usuario de la tabla).
     */
    @Transactional
    public ActividadResponse asignar(Integer idActividad, Integer idUsuario) {
        Actividad actividad = buscarOFallar(idActividad);

        if (actividad.getEstado() != EstadoActividad.PENDIENTE_DE_ASIGNACION) {
            throw new BusinessException(
                    "Esta actividad ya tiene un desarrollador asignado.");
        }

        Usuario usuario = buscarUsuarioOFallar(idUsuario);
        actividad.setUsuario(usuario);
        actividad.setEstado(EstadoActividad.PENDIENTE);

        Actividad guardada = actividadRepository.save(actividad);

        return actividadMapper.toResponse(guardada);
    }

    /**
     * Cambia el estado entre PENDIENTE / EN_DESARROLLO / FINALIZADA / CANCELADA.
     * PENDIENTE_DE_ASIGNACION nunca se fija manualmente aquí -- solo se
     * llega a él al crear sin desarrollador.
     */
    @Transactional
    public ActividadResponse cambiarEstado(Integer idActividad, String estadoTexto) {
        Actividad actividad = buscarOFallar(idActividad);
        EstadoActividad nuevoEstado = parsearEstado(estadoTexto);

        if (nuevoEstado == EstadoActividad.PENDIENTE_DE_ASIGNACION) {
            throw new BusinessException(
                    "No se puede volver manualmente a 'Pendiente de asignación'.");
        }
        if (actividad.getUsuario() == null) {
            throw new BusinessException(
                    "La actividad no tiene un desarrollador asignado todavía.");
        }

        actividad.setEstado(nuevoEstado);
        Actividad guardada = actividadRepository.save(actividad);

        return actividadMapper.toResponse(guardada);
    }

    private EstadoActividad parsearEstado(String estadoTexto) {
        try {
            return EstadoActividad.desdeValor(estadoTexto);
        } catch (IllegalArgumentException ex) {
            throw new BusinessException(ex.getMessage());
        }
    }

    private void validarFechas(ActividadRequest request) {
        if (request.getFechaFin().isBefore(request.getFechaInicio())) {
            throw new BusinessException("La fecha de fin no puede ser anterior a la fecha de inicio.");
        }
    }

    private Actividad buscarOFallar(Integer idActividad) {
        return actividadRepository.findById(idActividad)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una actividad con id " + idActividad + "."));
    }

    private Etapa buscarEtapaOFallar(Integer idEtapa) {
        return etapaRepository.findById(idEtapa)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una etapa con id " + idEtapa + "."));
    }

    private Usuario buscarUsuarioOFallar(Integer idUsuario) {
        return usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con id " + idUsuario + "."));
    }

    private void validarCodigoDisponible(String codigoActividad, Integer idActividadActual) {
        actividadRepository.findByCodigoActividad(codigoActividad).ifPresent(existente -> {
            if (idActividadActual == null || !existente.getIdActividad().equals(idActividadActual)) {
                throw new ConflictException(
                        "Ya existe una actividad con el código '" + codigoActividad + "'.");
            }
        });
    }
}
