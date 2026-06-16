package com.ikernell_backend.controller;

import com.ikernell_backend.entity.AsignacionProyecto;
import com.ikernell_backend.service.AsignacionProyectoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
public class AsignacionProyectoController {

    private final AsignacionProyectoService asignacionProyectoService;

    public AsignacionProyectoController(AsignacionProyectoService asignacionProyectoService) {
        this.asignacionProyectoService = asignacionProyectoService;
    }

    @GetMapping ("/api/asignacionproyectos")
    public List<AsignacionProyecto> listarAsignacionProyecto() {
        return asignacionProyectoService.listarAsignacionProyecto();
    }

    @GetMapping("/api/asignacionproyectos/{id}")
    public AsignacionProyecto getAsignacionProyecto(@PathVariable Integer id) {
        return asignacionProyectoService.obtenerPorId(id);
    }
}
