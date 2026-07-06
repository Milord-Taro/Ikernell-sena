package com.ikernell.backend.service;

import com.ikernell.backend.dto.RolRequest;
import com.ikernell.backend.dto.RolResponse;
import com.ikernell.backend.entity.Rol;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.RolMapper;
import com.ikernell.backend.repository.RolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RolService {

    private final RolRepository rolRepository;
    private final RolMapper rolMapper;

    @Transactional
    public RolResponse crear(RolRequest request) {
        validarCodigoDisponible(request.getCodigoRol(), null);
        validarNombreDisponible(request.getNombreRol(), null);

        Rol rol = rolMapper.toEntity(request);
        Rol guardado = rolRepository.save(rol);

        return rolMapper.toResponse(guardado);
    }

    public List<RolResponse> listarTodos() {
        return rolRepository.findAll()
                .stream()
                .map(rolMapper::toResponse)
                .toList();
    }

    public List<RolResponse> listarActivos() {
        return rolRepository.findByActivoTrue()
                .stream()
                .map(rolMapper::toResponse)
                .toList();
    }

    public RolResponse obtenerPorId(Integer idRol) {
        return rolMapper.toResponse(buscarOFallar(idRol));
    }

    @Transactional
    public RolResponse actualizar(Integer idRol, RolRequest request) {
        Rol rol = buscarOFallar(idRol);

        validarCodigoDisponible(request.getCodigoRol(), idRol);
        validarNombreDisponible(request.getNombreRol(), idRol);

        rolMapper.actualizarEntidadDesdeRequest(request, rol);
        Rol actualizado = rolRepository.save(rol);

        return rolMapper.toResponse(actualizado);
    }

    @Transactional
    public RolResponse cambiarEstado(Integer idRol, boolean activo) {
        Rol rol = buscarOFallar(idRol);
        rol.setActivo(activo);
        Rol guardado = rolRepository.save(rol);

        return rolMapper.toResponse(guardado);
    }

    private Rol buscarOFallar(Integer idRol) {
        return rolRepository.findById(idRol)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un rol con id " + idRol + "."));
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
