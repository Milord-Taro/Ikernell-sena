package com.ikernell.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ikernell.backend.audit.DetalleObjectMapper;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.constants.RolConstantes;
import com.ikernell.backend.dto.MensajeContactoRequest;
import com.ikernell.backend.dto.MensajeContactoResponse;
import com.ikernell.backend.dto.NotificacionRequest;
import com.ikernell.backend.dto.RespuestaMensajeRequest;
import com.ikernell.backend.entity.MensajeContacto;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.EstadoMensaje;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.enums.TipoNotificacion;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.MensajeContactoMapper;
import com.ikernell.backend.repository.MensajeContactoRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ikernell.backend.util.GeneradorCodigos;

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
    private final NotificacionService notificacionService;
    private final TrazabilidadService trazabilidadService;


    @Transactional
    public MensajeContactoResponse enviar(MensajeContactoRequest request) {
        MensajeContacto mensaje = mensajeContactoMapper.toEntity(request);
        mensaje.setCorreoElectronico(request.getCorreoElectronico().toLowerCase());
        mensaje.setCodigoMensaje(generarCodigo());
        mensaje.setEstado(EstadoMensaje.PENDIENTE);

        MensajeContacto guardado = mensajeContactoRepository.save(mensaje);

        // NUEVO: notifica a TODOS los Coordinadores activos -- un mensaje
        // de contacto público no tiene un destinatario único, cualquier
        // Coordinador puede atenderlo.
        usuarioRepository.findByRol_CodigoRolAndActivoTrue(RolConstantes.COORDINADOR)
                .forEach(coordinador -> notificacionService.crear(new NotificacionRequest(
                        coordinador.getIdUsuario(),
                        "Nuevo mensaje de contacto",
                        guardado.getAsunto() + " -- de " + guardado.getNombreRemitente(),
                        TipoNotificacion.MENSAJE,
                        "/dashboard/mensajes")));

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
    public MensajeContactoResponse marcarComoLeido(Integer idMensajeContacto, String correoSolicitante) {
        MensajeContacto mensaje = buscarOFallar(idMensajeContacto);

        if (mensaje.getEstado() == EstadoMensaje.PENDIENTE) {
            mensaje.setEstado(EstadoMensaje.LEIDO);
            mensajeContactoRepository.save(mensaje);

            Usuario solicitante = usuarioRepository.findByCorreoElectronico(correoSolicitante)
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "No existe un usuario con el correo '" + correoSolicitante + "'."));
            trazabilidadService.registrar(
                    solicitante, "MensajeContacto", mensaje.getCodigoMensaje(),
                    OperacionTrazabilidad.CAMBIAR_ESTADO, construirDetalle(mensajeContactoMapper.toResponse(mensaje)));
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

        MensajeContactoResponse response = mensajeContactoMapper.toResponse(guardado);
        trazabilidadService.registrar(
                responsable, "MensajeContacto", guardado.getCodigoMensaje(),
                OperacionTrazabilidad.ACTUALIZAR, construirDetalle(response));

        return response;
    }

    private String construirDetalle(MensajeContactoResponse response) {
        try {
            return DetalleObjectMapper.INSTANCE.writeValueAsString(response);
        } catch (JsonProcessingException ex) {
            return "No fue posible serializar el detalle: " + ex.getMessage();
        }
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
        return GeneradorCodigos.generar("MSG");
    }
}
