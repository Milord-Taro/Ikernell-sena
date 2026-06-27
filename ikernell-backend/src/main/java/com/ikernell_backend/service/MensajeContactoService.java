package com.ikernell_backend.service;

import com.ikernell_backend.entity.MensajeContacto;
import com.ikernell_backend.exception.ResourceNotFoundException;
import com.ikernell_backend.repository.MensajeContactoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MensajeContactoService {

    private final MensajeContactoRepository mensajeContactoRepository;

    public MensajeContactoService(MensajeContactoRepository mensajeContactoRepository) {
        this.mensajeContactoRepository = mensajeContactoRepository;
    }

    public List<MensajeContacto> listarMensajes(){
        return mensajeContactoRepository.findAll();
    }

    public MensajeContacto obtenerPorId(Integer id) {
        return mensajeContactoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Mensaje no encontrado"));
    }

    public MensajeContacto crearMensaje(
            MensajeContacto mensaje) {

        mensaje.setFechaEnvio(
                java.time.LocalDateTime.now());

        mensaje.setEstadoMensaje("Pendiente");

        return mensajeContactoRepository.save(mensaje);
    }

    public MensajeContacto actualizarMensaje(
            MensajeContacto mensaje) {

        return mensajeContactoRepository.save(mensaje);
    }

    public void eliminarMensaje(Integer id) {
        mensajeContactoRepository.deleteById(id);
    }

    public MensajeContacto marcarComoLeido(Integer id) {

        MensajeContacto mensaje =
                mensajeContactoRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Mensaje no encontrado"));

        mensaje.setEstadoMensaje("Leido");

        return mensajeContactoRepository.save(mensaje);
    }

    public MensajeContacto responderMensaje(
            Integer id,
            String respuesta) {

        MensajeContacto mensaje =
                mensajeContactoRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Mensaje no encontrado"));

        mensaje.setRespuesta(respuesta);

        mensaje.setEstadoMensaje("Atendido");

        mensaje.setFechaRespuesta(
                java.time.LocalDateTime.now());

        return mensajeContactoRepository.save(mensaje);
    }
}
