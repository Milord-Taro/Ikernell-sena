package com.ikernell.backend.service;

import com.ikernell.backend.dto.MensajeContactoRequest;
import com.ikernell.backend.dto.MensajeContactoResponse;
import com.ikernell.backend.dto.RespuestaMensajeRequest;
import com.ikernell.backend.entity.MensajeContacto;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.EstadoMensaje;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.MensajeContactoMapper;
import com.ikernell.backend.repository.MensajeContactoRepository;
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
public class MensajeContactoService {

    private final MensajeContactoRepository mensajeContactoRepository;
    private final UsuarioRepository usuarioRepository;
    private final MensajeContactoMapper mensajeContactoMapper;

    @Transactional
    public MensajeContactoResponse enviar(MensajeContactoRequest request) {
        MensajeContacto mensaje = mensajeContactoMapper.toEntity(request);
        mensaje.setCorreoElectronico(request.getCorreoElectronico().toLowerCase());
        mensaje.setCodigoMensaje(generarCodigo());
        mensaje.setEstado(EstadoMensaje.PENDIENTE);

        MensajeContacto guardado = mensajeContactoRepository.save(mensaje);

        return mensajeContactoMapper.toResponse(guardado);
    }

    public List<MensajeContactoResponse> listarTodos() {
        return mensajeContactoRepository.findAll().stream().map(mensajeContactoMapper::toResponse).toList();
    }

    public List<MensajeContactoResponse> listarPorEstado(String estadoTexto) {
        EstadoMensaje estado = parsearEstado(estadoTexto);
        return mensajeContactoRepository.findByEstado(estado)
                .stream()
                .map(mensajeContactoMapper::toResponse)
                .toList();
    }

    public MensajeContactoResponse obtenerPorId(Integer idMensajeContacto) {
        return mensajeContactoMapper.toResponse(buscarOFallar(idMensajeContacto));
    }

    @Transactional
    public MensajeContactoResponse marcarComoLeido(Integer idMensajeContacto) {
        MensajeContacto mensaje = buscarOFallar(idMensajeContacto);

        if (mensaje.getEstado() == EstadoMensaje.PENDIENTE) {
            mensaje.setEstado(EstadoMensaje.LEIDO);
            mensajeContactoRepository.save(mensaje);
        }

        return mensajeContactoMapper.toResponse(mensaje);
    }

    @Transactional
    public MensajeContactoResponse responder(
            Integer idMensajeContacto, RespuestaMensajeRequest request, String correoResponsable) {

        MensajeContacto mensaje = buscarOFallar(idMensajeContacto);

        Usuario responsable = usuarioRepository.findByCorreoElectronico(correoResponsable)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoResponsable + "'."));

        mensaje.setRespuesta(request.getRespuesta());
        mensaje.setResponsable(responsable);
        mensaje.setEstado(EstadoMensaje.ATENDIDO);
        mensaje.setFechaAtencion(LocalDateTime.now());

        MensajeContacto guardado = mensajeContactoRepository.save(mensaje);

        return mensajeContactoMapper.toResponse(guardado);
    }

    private EstadoMensaje parsearEstado(String estadoTexto) {
        try {
            return EstadoMensaje.desdeValor(estadoTexto);
        } catch (IllegalArgumentException ex) {
            throw new BusinessException(ex.getMessage());
        }
    }

    private MensajeContacto buscarOFallar(Integer idMensajeContacto) {
        return mensajeContactoRepository.findById(idMensajeContacto)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un mensaje de contacto con id " + idMensajeContacto + "."));
    }

    private String generarCodigo() {
        return "MSG-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
