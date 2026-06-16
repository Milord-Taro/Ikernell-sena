package com.ikernell_backend.controller;

import com.ikernell_backend.entity.Especialidad;
import com.ikernell_backend.service.EspecialidadService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
public class EspecialidadController {

    private final EspecialidadService especialidadService;

    public EspecialidadController(EspecialidadService especialidadService) {
        this.especialidadService = especialidadService;
    }

    @GetMapping("/api/especialidad")
    public List<Especialidad> listarProfesiones() {
        return especialidadService.listarEspecialidades();
    }

    @GetMapping("/api/especialidad/{id}")
    public Especialidad obtenerPorId(@PathVariable Integer id) {
        return especialidadService.obtenerPorId(id);
    }
}