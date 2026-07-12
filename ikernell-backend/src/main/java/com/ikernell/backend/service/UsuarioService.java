package com.ikernell.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ikernell.backend.audit.DetalleObjectMapper;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.dto.CambiarContrasenaRequest;
import com.ikernell.backend.dto.UsuarioRequest;
import com.ikernell.backend.dto.UsuarioResponse;
import com.ikernell.backend.dto.UsuarioUpdateRequest;
import com.ikernell.backend.entity.Especialidad;
import com.ikernell.backend.entity.Profesion;
import com.ikernell.backend.entity.Rol;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.UsuarioMapper;
import com.ikernell.backend.repository.EspecialidadRepository;
import com.ikernell.backend.repository.ProfesionRepository;
import com.ikernell.backend.repository.RolRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final ProfesionRepository profesionRepository;
    private final EspecialidadRepository especialidadRepository;
    private final UsuarioMapper usuarioMapper;
    private final PasswordEncoder passwordEncoder;
    private final TrazabilidadService trazabilidadService;


    @Transactional
    public UsuarioResponse crear(UsuarioRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        String correo = request.getCorreoElectronico().toLowerCase();

        validarCodigoDisponible(request.getCodigoUsuario(), null);
        validarIdentificacionDisponible(request.getNumeroIdentificacion(), null);
        validarCorreoDisponible(correo, null);

        Rol rol = buscarRolOFallar(request.getIdRol());
        Profesion profesion = buscarProfesionOFallar(request.getIdProfesion());
        Especialidad especialidad = buscarEspecialidadOFallar(request.getIdEspecialidad());

        Usuario usuario = usuarioMapper.toEntity(request);
        usuario.setCorreoElectronico(correo);
        usuario.setHashContrasena(passwordEncoder.encode(request.getContrasena()));
        usuario.setRol(rol);
        usuario.setProfesion(profesion);
        usuario.setEspecialidad(especialidad);

        Usuario guardado = usuarioRepository.save(usuario);

        UsuarioResponse response = usuarioMapper.toResponse(guardado);
        trazabilidadService.registrar(
                solicitante, "Usuario", guardado.getCodigoUsuario(),
                OperacionTrazabilidad.CREAR, construirDetalle(response));

        return response;
    }

    public List<UsuarioResponse> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(usuarioMapper::toResponse)
                .toList();
    }

    public List<UsuarioResponse> listarActivos() {
        return usuarioRepository.findByActivoTrue()
                .stream()
                .map(usuarioMapper::toResponse)
                .toList();
    }

    public UsuarioResponse obtenerPorId(Integer idUsuario) {
        return usuarioMapper.toResponse(buscarOFallar(idUsuario));
    }

    /**
     * "Quién soy yo": resuelve el perfil completo a partir del correo que
     * viene del token JWT. Necesario porque el JWT solo lleva correo+rol
     * en sus claims, no el idUsuario -- sin esto, el frontend no tendría
     * forma de recuperar el perfil propio después de un refresh de página.
     */
    public UsuarioResponse obtenerMiPerfil(String correoElectronico) {
        Usuario usuario = usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoElectronico + "'."));

        return usuarioMapper.toResponse(usuario);
    }

    @Transactional
    public UsuarioResponse actualizar(Integer idUsuario, UsuarioUpdateRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        Usuario usuario = buscarOFallar(idUsuario);

        validarCodigoDisponible(request.getCodigoUsuario(), idUsuario);
        validarIdentificacionDisponible(request.getNumeroIdentificacion(), idUsuario);

        Rol rol = buscarRolOFallar(request.getIdRol());
        Profesion profesion = buscarProfesionOFallar(request.getIdProfesion());
        Especialidad especialidad = buscarEspecialidadOFallar(request.getIdEspecialidad());

        usuarioMapper.actualizarEntidadDesdeRequest(request, usuario);
        usuario.setRol(rol);
        usuario.setProfesion(profesion);
        usuario.setEspecialidad(especialidad);

        Usuario actualizado = usuarioRepository.save(usuario);

        UsuarioResponse response = usuarioMapper.toResponse(actualizado);
        trazabilidadService.registrar(
                solicitante, "Usuario", actualizado.getCodigoUsuario(),
                OperacionTrazabilidad.ACTUALIZAR, construirDetalle(response));

        return response;
    }

    @Transactional
    public UsuarioResponse cambiarEstado(Integer idUsuario, boolean activo, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        Usuario usuario = buscarOFallar(idUsuario);
        usuario.setActivo(activo);
        Usuario guardado = usuarioRepository.save(usuario);

        UsuarioResponse response = usuarioMapper.toResponse(guardado);
        trazabilidadService.registrar(
                solicitante, "Usuario", guardado.getCodigoUsuario(),
                activo ? OperacionTrazabilidad.ACTUALIZAR : OperacionTrazabilidad.INHABILITAR,
                construirDetalle(response));

        return response;
    }

    @Transactional
    public void cambiarMiContrasena(String correoElectronico, CambiarContrasenaRequest request) {
        Usuario usuario = usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoElectronico + "'."));

        if (!passwordEncoder.matches(request.getContrasenaActual(), usuario.getHashContrasena())) {
            throw new BusinessException("La contraseña actual no es correcta.");
        }

        usuario.setHashContrasena(passwordEncoder.encode(request.getContrasenaNueva()));
        usuarioRepository.save(usuario);
    }

    private Usuario buscarOFallar(Integer idUsuario) {
        return usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con id " + idUsuario + "."));
    }

    private Usuario buscarSolicitanteOFallar(String correoElectronico) {
        return usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoElectronico + "'."));
    }

    private String construirDetalle(UsuarioResponse response) {
        try {
            return DetalleObjectMapper.INSTANCE.writeValueAsString(response);
        } catch (JsonProcessingException ex) {
            return "No fue posible serializar el detalle: " + ex.getMessage();
        }
    }

    private Rol buscarRolOFallar(Integer idRol) {
        return rolRepository.findById(idRol)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un rol con id " + idRol + "."));
    }

    private Profesion buscarProfesionOFallar(Integer idProfesion) {
        return profesionRepository.findById(idProfesion)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una profesión con id " + idProfesion + "."));
    }

    private Especialidad buscarEspecialidadOFallar(Integer idEspecialidad) {
        return especialidadRepository.findById(idEspecialidad)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una especialidad con id " + idEspecialidad + "."));
    }

    private void validarCodigoDisponible(String codigoUsuario, Integer idUsuarioActual) {
        usuarioRepository.findByCodigoUsuario(codigoUsuario).ifPresent(existente -> {
            if (idUsuarioActual == null || !existente.getIdUsuario().equals(idUsuarioActual)) {
                throw new ConflictException(
                        "Ya existe un usuario con el código '" + codigoUsuario + "'.");
            }
        });
    }

    private void validarIdentificacionDisponible(String numeroIdentificacion, Integer idUsuarioActual) {
        usuarioRepository.findByNumeroIdentificacion(numeroIdentificacion).ifPresent(existente -> {
            if (idUsuarioActual == null || !existente.getIdUsuario().equals(idUsuarioActual)) {
                throw new ConflictException(
                        "Ya existe un usuario con el número de identificación '" + numeroIdentificacion + "'.");
            }
        });
    }

    private void validarCorreoDisponible(String correoElectronico, Integer idUsuarioActual) {
        usuarioRepository.findByCorreoElectronico(correoElectronico).ifPresent(existente -> {
            if (idUsuarioActual == null || !existente.getIdUsuario().equals(idUsuarioActual)) {
                throw new ConflictException(
                        "Ya existe un usuario con el correo '" + correoElectronico + "'.");
            }
        });
    }
}