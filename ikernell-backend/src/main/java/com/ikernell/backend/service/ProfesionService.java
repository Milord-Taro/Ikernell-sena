package com.ikernell.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ikernell.backend.audit.DetalleObjectMapper;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.dto.ProfesionRequest;
import com.ikernell.backend.dto.ProfesionResponse;
import com.ikernell.backend.entity.Profesion;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.ProfesionMapper;
import com.ikernell.backend.repository.ProfesionRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProfesionService {

    private final ProfesionRepository profesionRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProfesionMapper profesionMapper;
    private final TrazabilidadService trazabilidadService;


    @Transactional
    public ProfesionResponse crear(ProfesionRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        validarCodigoDisponible(request.getCodigoProfesion(), null);
        validarNombreDisponible(request.getNombreProfesion(), null);

        Profesion profesion = profesionMapper.toEntity(request);
        Profesion guardada = profesionRepository.save(profesion);

        ProfesionResponse response = profesionMapper.toResponse(guardada);
        trazabilidadService.registrar(
                solicitante, "Profesion", guardada.getCodigoProfesion(),
                OperacionTrazabilidad.CREAR, construirDetalle(response));

        return response;
    }

    public List<ProfesionResponse> listarTodas() {
        return profesionRepository.findAllByOrderByIdProfesionAsc()
                .stream()
                .map(profesionMapper::toResponse)
                .toList();
    }

    public List<ProfesionResponse> listarActivas() {
        return profesionRepository.findByActivoTrueOrderByIdProfesionAsc()
                .stream()
                .map(profesionMapper::toResponse)
                .toList();
    }

    public ProfesionResponse obtenerPorId(Integer idProfesion) {
        return profesionMapper.toResponse(buscarOFallar(idProfesion));
    }

    @Transactional
    public ProfesionResponse actualizar(Integer idProfesion, ProfesionRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        Profesion profesion = buscarOFallar(idProfesion);

        validarCodigoDisponible(request.getCodigoProfesion(), idProfesion);
        validarNombreDisponible(request.getNombreProfesion(), idProfesion);

        profesionMapper.actualizarEntidadDesdeRequest(request, profesion);
        Profesion actualizada = profesionRepository.save(profesion);

        ProfesionResponse response = profesionMapper.toResponse(actualizada);
        trazabilidadService.registrar(
                solicitante, "Profesion", actualizada.getCodigoProfesion(),
                OperacionTrazabilidad.ACTUALIZAR, construirDetalle(response));

        return response;
    }

    @Transactional
    public ProfesionResponse cambiarEstado(Integer idProfesion, boolean activo, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        Profesion profesion = buscarOFallar(idProfesion);
        profesion.setActivo(activo);
        Profesion guardada = profesionRepository.save(profesion);

        ProfesionResponse response = profesionMapper.toResponse(guardada);
        trazabilidadService.registrar(
                solicitante, "Profesion", guardada.getCodigoProfesion(),
                activo ? OperacionTrazabilidad.ACTUALIZAR : OperacionTrazabilidad.INHABILITAR,
                construirDetalle(response));

        return response;
    }

    /**
     * Delete físico, protegido por ON DELETE RESTRICT en BD (fk_usuario_profesion).
     * Si algún usuario todavía tiene esta profesión, la BD rechaza el borrado y lo
     * traducimos a un ConflictException legible. El snapshot (JSON del Response
     * actual) queda en Trazabilidad.detalle antes de borrar la fila.
     */
    @Transactional
    public void eliminar(Integer idProfesion, String correoSolicitante) {
        Profesion profesion = buscarOFallar(idProfesion);
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);

        String detalle = construirDetalle(profesionMapper.toResponse(profesion));

        try {
            profesionRepository.delete(profesion);
            profesionRepository.flush();
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException(
                    "No se puede eliminar la profesión '" + profesion.getNombreProfesion()
                            + "': está en uso por uno o más usuarios.");
        }

        trazabilidadService.registrar(
                solicitante, "Profesion", profesion.getCodigoProfesion(),
                OperacionTrazabilidad.ELIMINAR, detalle);
    }

    private Profesion buscarOFallar(Integer idProfesion) {
        return profesionRepository.findById(idProfesion)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una profesión con id " + idProfesion + "."));
    }

    private Usuario buscarSolicitanteOFallar(String correoElectronico) {
        return usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoElectronico + "'."));
    }

    private String construirDetalle(ProfesionResponse response) {
        try {
            return DetalleObjectMapper.INSTANCE.writeValueAsString(response);
        } catch (JsonProcessingException ex) {
            return "No fue posible serializar el detalle: " + ex.getMessage();
        }
    }

    private void validarCodigoDisponible(String codigoProfesion, Integer idProfesionActual) {
        profesionRepository.findByCodigoProfesion(codigoProfesion).ifPresent(existente -> {
            if (idProfesionActual == null || !existente.getIdProfesion().equals(idProfesionActual)) {
                throw new ConflictException(
                        "Ya existe una profesión con el código '" + codigoProfesion + "'.");
            }
        });
    }

    private void validarNombreDisponible(String nombreProfesion, Integer idProfesionActual) {
        profesionRepository.findByNombreProfesionIgnoreCase(nombreProfesion).ifPresent(existente -> {
            if (idProfesionActual == null || !existente.getIdProfesion().equals(idProfesionActual)) {
                throw new ConflictException(
                        "Ya existe una profesión con el nombre '" + nombreProfesion + "'.");
            }
        });
    }
}
