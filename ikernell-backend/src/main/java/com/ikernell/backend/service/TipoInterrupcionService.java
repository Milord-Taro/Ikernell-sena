package com.ikernell.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ikernell.backend.audit.DetalleObjectMapper;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.dto.TipoInterrupcionRequest;
import com.ikernell.backend.dto.TipoInterrupcionResponse;
import com.ikernell.backend.entity.TipoInterrupcion;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.TipoInterrupcionMapper;
import com.ikernell.backend.repository.TipoInterrupcionRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TipoInterrupcionService {

    private final TipoInterrupcionRepository tipoInterrupcionRepository;
    private final UsuarioRepository usuarioRepository;
    private final TipoInterrupcionMapper tipoInterrupcionMapper;
    private final TrazabilidadService trazabilidadService;


    @Transactional
    public TipoInterrupcionResponse crear(TipoInterrupcionRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        validarCodigoDisponible(request.getCodigoTipoInterrupcion(), null);
        validarNombreDisponible(request.getNombreTipoInterrupcion(), null);

        TipoInterrupcion tipo = tipoInterrupcionMapper.toEntity(request);
        TipoInterrupcion guardado = tipoInterrupcionRepository.save(tipo);

        TipoInterrupcionResponse response = tipoInterrupcionMapper.toResponse(guardado);
        trazabilidadService.registrar(
                solicitante, "TipoInterrupcion", guardado.getCodigoTipoInterrupcion(),
                OperacionTrazabilidad.CREAR, construirDetalle(response));

        return response;
    }

    public List<TipoInterrupcionResponse> listarTodos() {
        return tipoInterrupcionRepository.findAll().stream().map(tipoInterrupcionMapper::toResponse).toList();
    }

    public List<TipoInterrupcionResponse> listarActivos() {
        return tipoInterrupcionRepository.findByActivoTrue().stream().map(tipoInterrupcionMapper::toResponse).toList();
    }

    public TipoInterrupcionResponse obtenerPorId(Integer idTipoInterrupcion) {
        return tipoInterrupcionMapper.toResponse(buscarOFallar(idTipoInterrupcion));
    }

    @Transactional
    public TipoInterrupcionResponse actualizar(Integer idTipoInterrupcion, TipoInterrupcionRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        TipoInterrupcion tipo = buscarOFallar(idTipoInterrupcion);

        validarCodigoDisponible(request.getCodigoTipoInterrupcion(), idTipoInterrupcion);
        validarNombreDisponible(request.getNombreTipoInterrupcion(), idTipoInterrupcion);

        tipoInterrupcionMapper.actualizarEntidadDesdeRequest(request, tipo);
        TipoInterrupcion actualizado = tipoInterrupcionRepository.save(tipo);

        TipoInterrupcionResponse response = tipoInterrupcionMapper.toResponse(actualizado);
        trazabilidadService.registrar(
                solicitante, "TipoInterrupcion", actualizado.getCodigoTipoInterrupcion(),
                OperacionTrazabilidad.ACTUALIZAR, construirDetalle(response));

        return response;
    }

    @Transactional
    public TipoInterrupcionResponse cambiarEstado(Integer idTipoInterrupcion, boolean activo, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        TipoInterrupcion tipo = buscarOFallar(idTipoInterrupcion);
        tipo.setActivo(activo);
        TipoInterrupcion guardado = tipoInterrupcionRepository.save(tipo);

        TipoInterrupcionResponse response = tipoInterrupcionMapper.toResponse(guardado);
        trazabilidadService.registrar(
                solicitante, "TipoInterrupcion", guardado.getCodigoTipoInterrupcion(),
                activo ? OperacionTrazabilidad.ACTUALIZAR : OperacionTrazabilidad.INHABILITAR,
                construirDetalle(response));

        return response;
    }

    /**
     * Delete físico, protegido por ON DELETE RESTRICT en BD (fk_interrupcion_tipo).
     * Si alguna Interrupción todavía usa este tipo, la BD rechaza el borrado y lo
     * traducimos a un ConflictException legible. El snapshot (JSON del Response
     * actual) queda en Trazabilidad.detalle antes de borrar la fila.
     */
    @Transactional
    public void eliminar(Integer idTipoInterrupcion, String correoSolicitante) {
        TipoInterrupcion tipo = buscarOFallar(idTipoInterrupcion);
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);

        String detalle = construirDetalle(tipoInterrupcionMapper.toResponse(tipo));

        try {
            tipoInterrupcionRepository.delete(tipo);
            tipoInterrupcionRepository.flush();
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException(
                    "No se puede eliminar el tipo de interrupción '" + tipo.getNombreTipoInterrupcion()
                            + "': está en uso por una o más interrupciones.");
        }

        trazabilidadService.registrar(
                solicitante, "TipoInterrupcion", tipo.getCodigoTipoInterrupcion(),
                OperacionTrazabilidad.ELIMINAR, detalle);
    }

    private TipoInterrupcion buscarOFallar(Integer idTipoInterrupcion) {
        return tipoInterrupcionRepository.findById(idTipoInterrupcion)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un tipo de interrupción con id " + idTipoInterrupcion + "."));
    }

    private Usuario buscarSolicitanteOFallar(String correoElectronico) {
        return usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoElectronico + "'."));
    }

    private String construirDetalle(TipoInterrupcionResponse response) {
        try {
            return DetalleObjectMapper.INSTANCE.writeValueAsString(response);
        } catch (JsonProcessingException ex) {
            return "No fue posible serializar el detalle: " + ex.getMessage();
        }
    }

    private void validarCodigoDisponible(String codigo, Integer idActual) {
        tipoInterrupcionRepository.findByCodigoTipoInterrupcion(codigo).ifPresent(existente -> {
            if (idActual == null || !existente.getIdTipoInterrupcion().equals(idActual)) {
                throw new ConflictException("Ya existe un tipo de interrupción con el código '" + codigo + "'.");
            }
        });
    }

    private void validarNombreDisponible(String nombre, Integer idActual) {
        tipoInterrupcionRepository.findByNombreTipoInterrupcionIgnoreCase(nombre).ifPresent(existente -> {
            if (idActual == null || !existente.getIdTipoInterrupcion().equals(idActual)) {
                throw new ConflictException("Ya existe un tipo de interrupción con el nombre '" + nombre + "'.");
            }
        });
    }
}
