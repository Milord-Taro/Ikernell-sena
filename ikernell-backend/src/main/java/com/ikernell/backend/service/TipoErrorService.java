package com.ikernell.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ikernell.backend.audit.DetalleObjectMapper;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.dto.TipoErrorRequest;
import com.ikernell.backend.dto.TipoErrorResponse;
import com.ikernell.backend.entity.TipoError;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.TipoErrorMapper;
import com.ikernell.backend.repository.TipoErrorRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TipoErrorService {

    private final TipoErrorRepository tipoErrorRepository;
    private final UsuarioRepository usuarioRepository;
    private final TipoErrorMapper tipoErrorMapper;
    private final TrazabilidadService trazabilidadService;


    @Transactional
    public TipoErrorResponse crear(TipoErrorRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        validarCodigoDisponible(request.getCodigoTipoError(), null);
        validarNombreDisponible(request.getNombreTipoError(), null);

        TipoError tipoError = tipoErrorMapper.toEntity(request);
        TipoError guardado = tipoErrorRepository.save(tipoError);

        TipoErrorResponse response = tipoErrorMapper.toResponse(guardado);
        trazabilidadService.registrar(
                solicitante, "TipoError", guardado.getCodigoTipoError(),
                OperacionTrazabilidad.CREAR, construirDetalle(response));

        return response;
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
    public TipoErrorResponse actualizar(Integer idTipoError, TipoErrorRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        TipoError tipoError = buscarOFallar(idTipoError);

        validarCodigoDisponible(request.getCodigoTipoError(), idTipoError);
        validarNombreDisponible(request.getNombreTipoError(), idTipoError);

        tipoErrorMapper.actualizarEntidadDesdeRequest(request, tipoError);
        TipoError actualizado = tipoErrorRepository.save(tipoError);

        TipoErrorResponse response = tipoErrorMapper.toResponse(actualizado);
        trazabilidadService.registrar(
                solicitante, "TipoError", actualizado.getCodigoTipoError(),
                OperacionTrazabilidad.ACTUALIZAR, construirDetalle(response));

        return response;
    }

    @Transactional
    public TipoErrorResponse cambiarEstado(Integer idTipoError, boolean activo, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        TipoError tipoError = buscarOFallar(idTipoError);
        tipoError.setActivo(activo);
        TipoError guardado = tipoErrorRepository.save(tipoError);

        TipoErrorResponse response = tipoErrorMapper.toResponse(guardado);
        trazabilidadService.registrar(
                solicitante, "TipoError", guardado.getCodigoTipoError(),
                activo ? OperacionTrazabilidad.ACTUALIZAR : OperacionTrazabilidad.INHABILITAR,
                construirDetalle(response));

        return response;
    }

    /**
     * Delete físico, protegido por ON DELETE RESTRICT en BD (fk_registro_error_tipo).
     * Si algún RegistroError todavía usa este tipo, la BD rechaza el borrado y lo
     * traducimos a un ConflictException legible. El snapshot (JSON del Response
     * actual) queda en Trazabilidad.detalle antes de borrar la fila.
     */
    @Transactional
    public void eliminar(Integer idTipoError, String correoSolicitante) {
        TipoError tipoError = buscarOFallar(idTipoError);
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);

        String detalle = construirDetalle(tipoErrorMapper.toResponse(tipoError));

        try {
            tipoErrorRepository.delete(tipoError);
            tipoErrorRepository.flush();
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException(
                    "No se puede eliminar el tipo de error '" + tipoError.getNombreTipoError()
                            + "': está en uso por uno o más registros de error.");
        }

        trazabilidadService.registrar(
                solicitante, "TipoError", tipoError.getCodigoTipoError(),
                OperacionTrazabilidad.ELIMINAR, detalle);
    }

    private TipoError buscarOFallar(Integer idTipoError) {
        return tipoErrorRepository.findById(idTipoError)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un tipo de error con id " + idTipoError + "."));
    }

    private Usuario buscarSolicitanteOFallar(String correoElectronico) {
        return usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoElectronico + "'."));
    }

    private String construirDetalle(TipoErrorResponse response) {
        try {
            return DetalleObjectMapper.INSTANCE.writeValueAsString(response);
        } catch (JsonProcessingException ex) {
            return "No fue posible serializar el detalle: " + ex.getMessage();
        }
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
