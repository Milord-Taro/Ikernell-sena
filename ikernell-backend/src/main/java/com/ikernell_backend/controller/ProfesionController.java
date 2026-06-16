package com.ikernell_backend.controller;

import com.ikernell_backend.entity.Profesion;
import com.ikernell_backend.service.ProfesionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
public class ProfesionController {

    private final ProfesionService profesionService;

    public ProfesionController(ProfesionService profesionService) {
        this.profesionService = profesionService;
    }

    @GetMapping("/api/profesiones")
    public List<Profesion> listarProfesiones() {
        return profesionService.listarProfesiones();
    }

    @GetMapping("/api/profesiones/{id}")
    public Profesion obtenerPorId(@PathVariable Integer id) {
        return profesionService.obtenerPorId(id);
    }
}