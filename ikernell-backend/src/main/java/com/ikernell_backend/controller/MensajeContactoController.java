package com.ikernell_backend.controller;


import com.ikernell_backend.entity.MensajeContacto;
import com.ikernell_backend.service.MensajeContactoService;
import com.ikernell_backend.dto.RespuestaMensajeDTO;
import com.ikernell_backend.dto.MensajeContactoMapper;
import com.ikernell_backend.dto.MensajeContactoResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MensajeContactoController {

    private final MensajeContactoService mensajeContactoService;

    public MensajeContactoController(MensajeContactoService mensajeContactoService) {
        this.mensajeContactoService = mensajeContactoService;
    }

    @GetMapping("/api/mensajes")
    public  List<MensajeContactoResponse> listarMensajes(){
        return mensajeContactoService.listarMensajes()
                .stream()
                .map(MensajeContactoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/api/mensajes/{id}")
    public MensajeContactoResponse obtenerPorId(@PathVariable Integer id){
        return MensajeContactoMapper.toResponse(
                mensajeContactoService.obtenerPorId(id));
    }

    @PostMapping("/api/mensajes")
    public MensajeContactoResponse crearMensajeContacto(
            @RequestBody MensajeContacto mensajeContacto){

        return MensajeContactoMapper.toResponse(
                mensajeContactoService.crearMensaje(
                        mensajeContacto));
    }

    @PutMapping("/api/mensajes/{id}")
    public MensajeContactoResponse actualizarMensajeContacto(
            @PathVariable Integer id,
            @RequestBody MensajeContacto mensajeContactoActualizado) {

        MensajeContacto mensajeContacto = mensajeContactoService.obtenerPorId(id);

        mensajeContacto.setCodMensaje(mensajeContactoActualizado.getCodMensaje());
        mensajeContacto.setNombreRemitente(mensajeContactoActualizado.getNombreRemitente());
        mensajeContacto.setCorreoRemitente(mensajeContactoActualizado.getCorreoRemitente());
        mensajeContacto.setMensaje(mensajeContactoActualizado.getMensaje());
        mensajeContacto.setRespuesta(mensajeContactoActualizado.getRespuesta());
        mensajeContacto.setFechaRespuesta(mensajeContactoActualizado.getFechaRespuesta());
        mensajeContacto.setResponsable(mensajeContactoActualizado.getResponsable());

        return MensajeContactoMapper.toResponse(
                mensajeContactoService.actualizarMensaje(
                        mensajeContacto));
    }

    @DeleteMapping("/api/mensajes/{id}")
    public void eliminarMensajeContacto(@PathVariable Integer id) {
        mensajeContactoService.eliminarMensaje(id);
    }

    @PutMapping("/api/mensajes/{id}/leer")
    public MensajeContactoResponse leerMensaje(
            @PathVariable Integer id) {

        return MensajeContactoMapper.toResponse(
                mensajeContactoService.marcarComoLeido(id));
    }

    @PutMapping("/api/mensajes/{id}/atender")
    public MensajeContactoResponse atenderMensaje(
            @PathVariable Integer id,
            @RequestBody RespuestaMensajeDTO body) {

        return MensajeContactoMapper.toResponse(
                mensajeContactoService.responderMensaje(
                        id,
                        body.getRespuesta()));
    }
}
