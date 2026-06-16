package com.ikernell_backend.controller;


import com.ikernell_backend.entity.TipoInterrupcion;
import com.ikernell_backend.service.TipoInterrupcionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
public class TipoInterrupcionController {

    private final TipoInterrupcionService tipoInterrupcionService;

    public TipoInterrupcionController(TipoInterrupcionService tipoInterrupcionService) {
        this.tipoInterrupcionService = tipoInterrupcionService;
    }

    @GetMapping("/api/tipointerrupciones")
    public  List<TipoInterrupcion> listarTiposInterrupciones(){
        return tipoInterrupcionService.listarTiposInterrupciones();
    }

    @GetMapping("/api/tipointerrupciones/{id}")
    public TipoInterrupcion obtenerPorId(@PathVariable Integer id){
        return tipoInterrupcionService.obtenerPorId(id);
    }
}
