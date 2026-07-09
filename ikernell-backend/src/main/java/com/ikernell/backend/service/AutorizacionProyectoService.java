package com.ikernell.backend.service;

import com.ikernell.backend.constants.RolConstantes;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.RolProyecto;
import com.ikernell.backend.exception.ForbiddenException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Punto único de autorización a nivel de PROYECTO ESPECÍFICO, reutilizado
 * por ProyectoService, EtapaService, ActividadService y
 * AsignacionProyectoService.
 *
 * Regla: Coordinador siempre puede gestionar cualquier proyecto. Un Líder
 * de Proyecto SOLO puede gestionar el/los proyectos donde tiene una
 * AsignacionProyecto vigente con rol_proyecto = 'Líder' -- no puede
 * interferir en proyectos que gestiona otro Líder.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AutorizacionProyectoService {

    private final UsuarioRepository usuarioRepository;
    private final AsignacionProyectoRepository asignacionProyectoRepository;

    /**
     * Solo busca el usuario por correo, sin verificar ownership de ningún
     * proyecto -- útil en creación, donde el proyecto todavía no existe.
     */
    public Usuario buscarUsuarioOFallar(String correoElectronico) {
        return usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoElectronico + "'."));
    }

    /**
     * Lanza ForbiddenException si el usuario no puede gestionar este
     * proyecto. Devuelve el Usuario resuelto para que quien la llama no
     * tenga que volver a buscarlo (ej. para auto-vincularlo como Líder
     * al crear un proyecto nuevo).
     */
    public Usuario verificarPuedeGestionar(String correoElectronico, Integer idProyecto) {
        Usuario usuario = buscarUsuarioOFallar(correoElectronico);

        if (RolConstantes.COORDINADOR.equals(usuario.getRol().getCodigoRol())) {
            return usuario;
        }

        boolean esLiderDeEsteProyecto = asignacionProyectoRepository
                .existsByUsuario_IdUsuarioAndProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(
                        usuario.getIdUsuario(), idProyecto, RolProyecto.LIDER);

        if (!esLiderDeEsteProyecto) {
            throw new ForbiddenException(
                    "No eres el líder asignado a este proyecto, y no eres Coordinador.");
        }

        return usuario;
    }
}
