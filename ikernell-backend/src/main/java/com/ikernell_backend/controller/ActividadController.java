package com.ikernell_backend.controller;


import com.ikernell_backend.entity.Actividad;
import com.ikernell_backend.service.ActividadService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
public class ActividadController {

    private final ActividadService actividadService;

    public ActividadController(ActividadService actividadService) {
        this.actividadService = actividadService;
    }

    @GetMapping("/api/actividades")
    public  List<Actividad> listarActividades(){
        return actividadService.listarActividades();
    }

    @GetMapping("/api/actividades/{id}")
    public Actividad obtenerPorId(@PathVariable Integer id){
        return actividadService.obtenerPorId(id);
    }
}
