package com.ikernell_backend.controller;


import com.ikernell_backend.entity.Interrupcion;
import com.ikernell_backend.service.InterrupcionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
public class InterrupcionController {

    private final InterrupcionService interrupcionService;

    public InterrupcionController(InterrupcionService interrupcionService) {
        this.interrupcionService = interrupcionService;
    }

    @GetMapping("/api/interrupciones")
    public  List<Interrupcion> listarInterrupciones(){
        return interrupcionService.listarInterrupciones();
    }

    @GetMapping("/api/interrupciones/{id}")
    public Interrupcion obtenerPorId(@PathVariable Integer id){
        return interrupcionService.obtenerPorId(id);
    }
}
