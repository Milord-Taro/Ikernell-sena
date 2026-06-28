package com.ikernell_backend.service;

import com.ikernell_backend.entity.MensajeContacto;
import com.ikernell_backend.exception.ResourceNotFoundException;
import com.ikernell_backend.repository.MensajeContactoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
public class MensajeContactoService {

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

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

        validarMensaje(mensaje);

        MensajeContacto ultimoMensaje =
                mensajeContactoRepository.findTopByOrderByIdMensajeDesc();

        int siguienteNumero = 1;

        if (ultimoMensaje != null) {
            siguienteNumero =
                    ultimoMensaje.getIdMensaje() + 1;
        }

        mensaje.setCodMensaje(
                String.format("MSG-%03d", siguienteNumero)
        );

        mensaje.setFechaEnvio(
                java.time.LocalDateTime.now());

        mensaje.setEstadoMensaje("Pendiente");

        return mensajeContactoRepository.save(mensaje);
    }

    public MensajeContacto actualizarMensaje(
            MensajeContacto mensaje) {

        validarMensaje(mensaje);

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

        if ("Pendiente".equalsIgnoreCase(
                mensaje.getEstadoMensaje())) {

            mensaje.setEstadoMensaje("Leido");
        }

        return mensajeContactoRepository.save(mensaje);
    }

    public MensajeContacto responderMensaje(
            Integer id,
            String respuesta) {

        MensajeContacto mensaje =
                mensajeContactoRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Mensaje no encontrado"));

        if (respuesta == null ||
                respuesta.trim().isEmpty()) {

            throw new RuntimeException(
                    "La respuesta es obligatoria");
        }

        mensaje.setRespuesta(respuesta);

        mensaje.setEstadoMensaje("Atendido");

        mensaje.setFechaRespuesta(
                java.time.LocalDateTime.now());

        return mensajeContactoRepository.save(mensaje);
    }

    private void validarMensaje(MensajeContacto mensaje) {

        if (mensaje.getNombreRemitente() == null ||
                mensaje.getNombreRemitente().trim().isEmpty()) {

            throw new RuntimeException(
                    "El nombre del remitente es obligatorio");
        }

        if (mensaje.getNombreRemitente().trim().length() < 3 ||
                mensaje.getNombreRemitente().trim().length() > 150) {

            throw new RuntimeException(
                    "El nombre del remitente debe tener entre 3 y 150 caracteres");
        }

        if (mensaje.getCorreoRemitente() == null ||
                mensaje.getCorreoRemitente().trim().isEmpty()) {

            throw new RuntimeException(
                    "El correo del remitente es obligatorio");
        }

        if (mensaje.getCorreoRemitente().trim().length() > 150) {

            throw new RuntimeException(
                    "El correo del remitente no puede superar 150 caracteres");
        }

        if (!EMAIL_PATTERN.matcher(
                mensaje.getCorreoRemitente().trim()).matches()) {

            throw new RuntimeException(
                    "El correo del remitente no tiene un formato valido");
        }

        if (mensaje.getMensaje() == null ||
                mensaje.getMensaje().trim().isEmpty()) {

            throw new RuntimeException(
                    "El mensaje es obligatorio");
        }

        if (mensaje.getMensaje().trim().length() < 10) {

            throw new RuntimeException(
                    "El mensaje debe tener minimo 10 caracteres");
        }
    }
}
