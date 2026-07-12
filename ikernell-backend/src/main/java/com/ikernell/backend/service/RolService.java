package com.ikernell.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ikernell.backend.audit.DetalleObjectMapper;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.dto.RolRequest;
import com.ikernell.backend.dto.RolResponse;
import com.ikernell.backend.entity.Rol;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.RolMapper;
import com.ikernell.backend.repository.RolRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RolService {

    private final RolRepository rolRepository;
    private final UsuarioRepository usuarioRepository;
    private final RolMapper rolMapper;
    private final TrazabilidadService trazabilidadService;


    @Transactional
    public RolResponse crear(RolRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        validarCodigoDisponible(request.getCodigoRol(), null);
        validarNombreDisponible(request.getNombreRol(), null);

        Rol rol = rolMapper.toEntity(request);
        Rol guardado = rolRepository.save(rol);

        RolResponse response = rolMapper.toResponse(guardado);
        trazabilidadService.registrar(
                solicitante, "Rol", guardado.getCodigoRol(),
                OperacionTrazabilidad.CREAR, construirDetalle(response));

        return response;
    }

    public List<RolResponse> listarTodos() {
        return rolRepository.findAllByOrderByIdRolAsc()
                .stream()
                .map(rolMapper::toResponse)
                .toList();
    }

    public List<RolResponse> listarActivos() {
        return rolRepository.findByActivoTrueOrderByIdRolAsc()
                .stream()
                .map(rolMapper::toResponse)
                .toList();
    }

    public RolResponse obtenerPorId(Integer idRol) {
        return rolMapper.toResponse(buscarOFallar(idRol));
    }

    @Transactional
    public RolResponse actualizar(Integer idRol, RolRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        Rol rol = buscarOFallar(idRol);

        validarCodigoDisponible(request.getCodigoRol(), idRol);
        validarNombreDisponible(request.getNombreRol(), idRol);

        rolMapper.actualizarEntidadDesdeRequest(request, rol);
        Rol actualizado = rolRepository.save(rol);

        RolResponse response = rolMapper.toResponse(actualizado);
        trazabilidadService.registrar(
                solicitante, "Rol", actualizado.getCodigoRol(),
                OperacionTrazabilidad.ACTUALIZAR, construirDetalle(response));

        return response;
    }

    @Transactional
    public RolResponse cambiarEstado(Integer idRol, boolean activo, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        Rol rol = buscarOFallar(idRol);
        rol.setActivo(activo);
        Rol guardado = rolRepository.save(rol);

        RolResponse response = rolMapper.toResponse(guardado);
        trazabilidadService.registrar(
                solicitante, "Rol", guardado.getCodigoRol(),
                activo ? OperacionTrazabilidad.ACTUALIZAR : OperacionTrazabilidad.INHABILITAR,
                construirDetalle(response));

        return response;
    }

    /**
     * Delete físico, protegido por ON DELETE RESTRICT en BD (fk_usuario_rol).
     * Si algún usuario todavía tiene este rol, la BD rechaza el borrado y lo
     * traducimos a un ConflictException legible. El snapshot (JSON del Response
     * actual) queda en Trazabilidad.detalle antes de borrar la fila.
     */
    @Transactional
    public void eliminar(Integer idRol, String correoSolicitante) {
        Rol rol = buscarOFallar(idRol);
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);

        String detalle = construirDetalle(rolMapper.toResponse(rol));

        try {
            rolRepository.delete(rol);
            rolRepository.flush();
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException(
                    "No se puede eliminar el rol '" + rol.getNombreRol()
                            + "': está en uso por uno o más usuarios.");
        }

        trazabilidadService.registrar(
                solicitante, "Rol", rol.getCodigoRol(),
                OperacionTrazabilidad.ELIMINAR, detalle);
    }

    private Rol buscarOFallar(Integer idRol) {
        return rolRepository.findById(idRol)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un rol con id " + idRol + "."));
    }

    private Usuario buscarSolicitanteOFallar(String correoElectronico) {
        return usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoElectronico + "'."));
    }

    private String construirDetalle(RolResponse response) {
        try {
            return DetalleObjectMapper.INSTANCE.writeValueAsString(response);
        } catch (JsonProcessingException ex) {
            return "No fue posible serializar el detalle: " + ex.getMessage();
        }
    }

    private void validarCodigoDisponible(String codigoRol, Integer idRolActual) {
        rolRepository.findByCodigoRol(codigoRol).ifPresent(existente -> {
            if (idRolActual == null || !existente.getIdRol().equals(idRolActual)) {
                throw new ConflictException(
                        "Ya existe un rol con el código '" + codigoRol + "'.");
            }
        });
    }

    private void validarNombreDisponible(String nombreRol, Integer idRolActual) {
        rolRepository.findByNombreRolIgnoreCase(nombreRol).ifPresent(existente -> {
            if (idRolActual == null || !existente.getIdRol().equals(idRolActual)) {
                throw new ConflictException(
                        "Ya existe un rol con el nombre '" + nombreRol + "'.");
            }
        });
    }
}
