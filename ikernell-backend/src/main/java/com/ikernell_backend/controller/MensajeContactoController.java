package com.ikernell_backend.controller;


import com.ikernell_backend.entity.MensajeContacto;
import com.ikernell_backend.service.MensajeContactoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

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
}
