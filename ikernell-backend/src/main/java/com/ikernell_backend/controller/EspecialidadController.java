package com.ikernell_backend.controller;

import com.ikernell_backend.entity.Especialidad;
import com.ikernell_backend.service.EspecialidadService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
public class EspecialidadController {

    private final EspecialidadService especialidadService;

    public EspecialidadController(EspecialidadService especialidadService) {
        this.especialidadService = especialidadService;
    }

    @GetMapping("/api/especialidades")
    public List<Especialidad> listarProfesiones() {
        return especialidadService.listarEspecialidades();
    }

    @GetMapping("/api/especialidades/{id}")
    public Especialidad obtenerPorId(@PathVariable Integer id) {
        return especialidadService.obtenerPorId(id);
    }

    @PostMapping("/api/especialidades")
    public Especialidad crearEspecialidad(@RequestBody Especialidad especialidad) {
        return especialidadService.crearEspecialidad(especialidad);
    }

    @PutMapping("/api/especialidades/{id}")
    public Especialidad actualizarEspecialidad(
            @PathVariable Integer id,
            @RequestBody Especialidad especialidadActualizada) {

        Especialidad especialidad = especialidadService.obtenerPorId(id);

        if (especialidad == null) {
            return null;
        }

        especialidad.setCodEspecialidad(especialidadActualizada.getCodEspecialidad());
        especialidad.setNombreEspecialidad(especialidadActualizada.getNombreEspecialidad());

        return especialidadService.actualizarEspecialidad(especialidad);
    }

    @DeleteMapping("/api/especialidad/{id}")
    public void eliminarEspecialidad(@PathVariable Integer id) {

        especialidadService.eliminarEspecialidad(id);
    }
}