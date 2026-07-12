package com.ikernell.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ikernell.backend.audit.DetalleObjectMapper;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.dto.EspecialidadRequest;
import com.ikernell.backend.dto.EspecialidadResponse;
import com.ikernell.backend.entity.Especialidad;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.EspecialidadMapper;
import com.ikernell.backend.repository.EspecialidadRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EspecialidadService {

    private final EspecialidadRepository especialidadRepository;
    private final UsuarioRepository usuarioRepository;
    private final EspecialidadMapper especialidadMapper;
    private final TrazabilidadService trazabilidadService;


    @Transactional
    public EspecialidadResponse crear(EspecialidadRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        validarCodigoDisponible(request.getCodigoEspecialidad(), null);
        validarNombreDisponible(request.getNombreEspecialidad(), null);

        Especialidad especialidad = especialidadMapper.toEntity(request);
        Especialidad guardada = especialidadRepository.save(especialidad);

        EspecialidadResponse response = especialidadMapper.toResponse(guardada);
        trazabilidadService.registrar(
                solicitante, "Especialidad", guardada.getCodigoEspecialidad(),
                OperacionTrazabilidad.CREAR, construirDetalle(response));

        return response;
    }

    public List<EspecialidadResponse> listarTodas() {
        return especialidadRepository.findAllByOrderByIdEspecialidadAsc()
                .stream()
                .map(especialidadMapper::toResponse)
                .toList();
    }

    public List<EspecialidadResponse> listarActivas() {
        return especialidadRepository.findByActivoTrueOrderByIdEspecialidadAsc()
                .stream()
                .map(especialidadMapper::toResponse)
                .toList();
    }

    public EspecialidadResponse obtenerPorId(Integer idEspecialidad) {
        return especialidadMapper.toResponse(buscarOFallar(idEspecialidad));
    }

    @Transactional
    public EspecialidadResponse actualizar(Integer idEspecialidad, EspecialidadRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        Especialidad especialidad = buscarOFallar(idEspecialidad);

        validarCodigoDisponible(request.getCodigoEspecialidad(), idEspecialidad);
        validarNombreDisponible(request.getNombreEspecialidad(), idEspecialidad);

        especialidadMapper.actualizarEntidadDesdeRequest(request, especialidad);
        Especialidad actualizada = especialidadRepository.save(especialidad);

        EspecialidadResponse response = especialidadMapper.toResponse(actualizada);
        trazabilidadService.registrar(
                solicitante, "Especialidad", actualizada.getCodigoEspecialidad(),
                OperacionTrazabilidad.ACTUALIZAR, construirDetalle(response));

        return response;
    }

    @Transactional
    public EspecialidadResponse cambiarEstado(Integer idEspecialidad, boolean activo, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        Especialidad especialidad = buscarOFallar(idEspecialidad);
        especialidad.setActivo(activo);
        Especialidad guardada = especialidadRepository.save(especialidad);

        EspecialidadResponse response = especialidadMapper.toResponse(guardada);
        trazabilidadService.registrar(
                solicitante, "Especialidad", guardada.getCodigoEspecialidad(),
                activo ? OperacionTrazabilidad.ACTUALIZAR : OperacionTrazabilidad.INHABILITAR,
                construirDetalle(response));

        return response;
    }

    /**
     * Delete físico, protegido por ON DELETE RESTRICT en BD (fk_usuario_especialidad).
     * Si algún usuario todavía tiene esta especialidad, la BD rechaza el borrado y lo
     * traducimos a un ConflictException legible. El snapshot (JSON del Response actual)
     * queda en Trazabilidad.detalle antes de borrar la fila.
     */
    @Transactional
    public void eliminar(Integer idEspecialidad, String correoSolicitante) {
        Especialidad especialidad = buscarOFallar(idEspecialidad);
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);

        String detalle = construirDetalle(especialidadMapper.toResponse(especialidad));

        try {
            especialidadRepository.delete(especialidad);
            especialidadRepository.flush();
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException(
                    "No se puede eliminar la especialidad '" + especialidad.getNombreEspecialidad()
                            + "': está en uso por uno o más usuarios.");
        }

        trazabilidadService.registrar(
                solicitante, "Especialidad", especialidad.getCodigoEspecialidad(),
                OperacionTrazabilidad.ELIMINAR, detalle);
    }

    private Especialidad buscarOFallar(Integer idEspecialidad) {
        return especialidadRepository.findById(idEspecialidad)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una especialidad con id " + idEspecialidad + "."));
    }

    private Usuario buscarSolicitanteOFallar(String correoElectronico) {
        return usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoElectronico + "'."));
    }

    private String construirDetalle(EspecialidadResponse response) {
        try {
            return DetalleObjectMapper.INSTANCE.writeValueAsString(response);
        } catch (JsonProcessingException ex) {
            return "No fue posible serializar el detalle: " + ex.getMessage();
        }
    }

    private void validarCodigoDisponible(String codigoEspecialidad, Integer idEspecialidadActual) {
        especialidadRepository.findByCodigoEspecialidad(codigoEspecialidad).ifPresent(existente -> {
            if (idEspecialidadActual == null || !existente.getIdEspecialidad().equals(idEspecialidadActual)) {
                throw new ConflictException(
                        "Ya existe una especialidad con el código '" + codigoEspecialidad + "'.");
            }
        });
    }

    private void validarNombreDisponible(String nombreEspecialidad, Integer idEspecialidadActual) {
        especialidadRepository.findByNombreEspecialidadIgnoreCase(nombreEspecialidad).ifPresent(existente -> {
            if (idEspecialidadActual == null || !existente.getIdEspecialidad().equals(idEspecialidadActual)) {
                throw new ConflictException(
                        "Ya existe una especialidad con el nombre '" + nombreEspecialidad + "'.");
            }
        });
    }
}
