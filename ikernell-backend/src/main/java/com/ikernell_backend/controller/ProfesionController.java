package com.ikernell_backend.controller;

import com.ikernell_backend.entity.Profesion;
import com.ikernell_backend.service.ProfesionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

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


    @PostMapping("/api/profesiones")
    public Profesion crearProfesion(@RequestBody Profesion profesion) {
        return profesionService.crearProfesion(profesion);
    }

    @PutMapping("/api/profesiones/{id}")
    public Profesion actualizarProfesion(
            @PathVariable Integer id,
            @RequestBody Profesion profesionActualizado) {

        Profesion profesion = profesionService.obtenerPorId(id);

        if (profesion == null) {
            return null;
        }

        profesion.setCodProfesion(profesionActualizado.getCodProfesion());
        profesion.setNombreProfesion(profesionActualizado.getNombreProfesion());

        return profesionService.actualizarProfesion(profesion);
    }

    @DeleteMapping("/api/profesiones/{id}")
    public void eliminarProfesion(@PathVariable Integer id) {

        profesionService.eliminarProfesion(id);
    }
}