package com.ikernell_backend.controller;

import com.ikernell_backend.entity.AsignacionProyecto;
import com.ikernell_backend.service.AsignacionProyectoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    @PostMapping("/api/asignacionproyectos")
    public AsignacionProyecto crearAsignacionProyecto(
            @RequestBody AsignacionProyecto asignacionProyecto) {

        return asignacionProyectoService
                .crearAsignacionProyecto(
                        asignacionProyecto);
    }

    @PutMapping("/api/asignacionproyectos/{id}")
    public AsignacionProyecto actualizarAsignacionProyecto(
            @PathVariable Integer id,
            @RequestBody AsignacionProyecto asignacionProyectoActualizado) {

        AsignacionProyecto asignacionProyecto =
                asignacionProyectoService.obtenerPorId(id);

        asignacionProyecto.setEstadoAsignacion(asignacionProyectoActualizado.getEstadoAsignacion());
        asignacionProyecto.setProyecto(asignacionProyectoActualizado.getProyecto());
        asignacionProyecto.setUsuario(asignacionProyectoActualizado.getUsuario());

        return asignacionProyectoService.actualizarAsignacionProyecto(asignacionProyecto);
    }

    @DeleteMapping("/api/asignacionproyectos/{id}")
    public void eliminarAsignacionProyecto(
            @PathVariable Integer id) {

        asignacionProyectoService
                .eliminarAsignacionProyecto(id);
    }
}
