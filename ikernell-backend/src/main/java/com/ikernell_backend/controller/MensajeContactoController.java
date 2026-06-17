package com.ikernell_backend.controller;


import com.ikernell_backend.entity.MensajeContacto;
import com.ikernell_backend.service.MensajeContactoService;
import com.ikernell_backend.dto.RespuestaMensajeDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
public class MensajeContactoController {

    private final MensajeContactoService mensajeContactoService;

    public MensajeContactoController(MensajeContactoService mensajeContactoService) {
        this.mensajeContactoService = mensajeContactoService;
    }

    @GetMapping("/api/mensajes")
    public  List<MensajeContacto> listarMensajes(){
        return mensajeContactoService.listarMensajes();
    }

    @GetMapping("/api/mensajes/{id}")
    public MensajeContacto obtenerPorId(@PathVariable Integer id){
        return mensajeContactoService.obtenerPorId(id);
    }

    @PostMapping("/api/mensajes")
    public MensajeContacto crearMensajeContacto(
            @RequestBody MensajeContacto mensajeContacto){

        return mensajeContactoService.crearMensaje(mensajeContacto);
    }

    @PutMapping("/api/mensajes/{id}")
    public MensajeContacto actualizarMensajeContacto(
            @PathVariable Integer id,
            @RequestBody MensajeContacto mensajeContactoActualizado) {

        MensajeContacto mensajeContacto = mensajeContactoService.obtenerPorId(id);

        if (mensajeContacto == null) {
            return null;
        }

        mensajeContacto.setCodMensaje(mensajeContactoActualizado.getCodMensaje());
        mensajeContacto.setNombreRemitente(mensajeContactoActualizado.getNombreRemitente());
        mensajeContacto.setCorreoRemitente(mensajeContactoActualizado.getCorreoRemitente());
        mensajeContacto.setMensaje(mensajeContactoActualizado.getMensaje());
        mensajeContacto.setRespuesta(mensajeContactoActualizado.getRespuesta());
        mensajeContacto.setFechaRespuesta(mensajeContactoActualizado.getFechaRespuesta());
        mensajeContacto.setResponsable(mensajeContactoActualizado.getResponsable());

        return mensajeContactoService.actualizarMensaje(mensajeContacto);
    }

    @DeleteMapping("/api/mensajes/{id}")
    public void eliminarMensajeContacto(@PathVariable Integer id) {
        mensajeContactoService.eliminarMensaje(id);
    }

    @PutMapping("/api/mensajes/{id}/leer")
    public MensajeContacto leerMensaje(
            @PathVariable Integer id) {

        return mensajeContactoService.marcarComoLeido(id);
    }

    @PutMapping("/api/mensajes/{id}/atender")
    public MensajeContacto atenderMensaje(
            @PathVariable Integer id,
            @RequestBody RespuestaMensajeDTO body) {

        return mensajeContactoService.responderMensaje(
                id,
                body.getRespuesta());
    }
}
