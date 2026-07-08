package com.ikernell.backend.service;

import com.ikernell.backend.dto.NotificacionRequest;
import com.ikernell.backend.dto.NotificacionResponse;
import com.ikernell.backend.entity.Notificacion;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.exception.ForbiddenException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.NotificacionMapper;
import com.ikernell.backend.repository.NotificacionRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NotificacionService {

    private final NotificacionRepository notificacionRepository;
    private final UsuarioRepository usuarioRepository;
    private final NotificacionMapper notificacionMapper;

    @Transactional
    public NotificacionResponse crear(NotificacionRequest request) {
        Usuario usuario = usuarioRepository.findById(request.getIdUsuario())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con id " + request.getIdUsuario() + "."));

        Notificacion notificacion = notificacionMapper.toEntity(request);
        notificacion.setUsuario(usuario);
        notificacion.setCodigoNotificacion(generarCodigo());
        notificacion.setLeida(false);

        Notificacion guardada = notificacionRepository.save(notificacion);

        return notificacionMapper.toResponse(guardada);
    }

    public List<NotificacionResponse> listarMisNotificaciones(String correoElectronico, boolean soloNoLeidas) {
        Usuario usuario = buscarUsuarioOFallar(correoElectronico);

        List<Notificacion> notificaciones = soloNoLeidas
                ? notificacionRepository.findByUsuario_IdUsuarioAndLeidaFalseOrderByFechaCreacionDesc(usuario.getIdUsuario())
                : notificacionRepository.findByUsuario_IdUsuarioOrderByFechaCreacionDesc(usuario.getIdUsuario());

        return notificaciones.stream().map(notificacionMapper::toResponse).toList();
    }

    @Transactional
    public NotificacionResponse marcarComoLeida(Integer idNotificacion, String correoElectronico) {
        Notificacion notificacion = notificacionRepository.findById(idNotificacion)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una notificación con id " + idNotificacion + "."));

        if (!notificacion.getUsuario().getCorreoElectronico().equalsIgnoreCase(correoElectronico)) {
            throw new ForbiddenException("Esta notificación no te pertenece.");
        }

        if (!notificacion.getLeida()) {
            notificacion.setLeida(true);
            notificacion.setFechaLectura(LocalDateTime.now());
            notificacionRepository.save(notificacion);
        }

        return notificacionMapper.toResponse(notificacion);
    }

    private Usuario buscarUsuarioOFallar(String correoElectronico) {
        return usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoElectronico + "'."));
    }

    private String generarCodigo() {
        return "NOT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
