package com.ikernell_backend.controller;

import com.ikernell_backend.entity.Rol;
import com.ikernell_backend.service.RolService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService; }

    @GetMapping("/api/roles")
    public List<Rol> listarRol() {return rolService.listarRoles(); }

    @GetMapping("/api/roles/{id}")
    public Rol obtenerPorId(@PathVariable Integer id) {
        return rolService.obtenerPorId(id);
    }

    @PostMapping("/api/roles")
    public Rol crearRol(@RequestBody Rol rol) {
        return rolService.crearRol(rol);
    }

    @PutMapping("/api/roles/{id}")
    public Rol actualizarRol(
            @PathVariable Integer id,
            @RequestBody Rol rolActualizado) {

        Rol rol = rolService.obtenerPorId(id);

        rol.setCodRol(rolActualizado.getCodRol());
        rol.setNombreRol(rolActualizado.getNombreRol());
        rol.setDescripcionRol(rolActualizado.getDescripcionRol());

        return rolService.actualizarRol(rol);
    }

    @DeleteMapping("/api/roles/{id}")
    public void eliminarRol(@PathVariable Integer id) {

        rolService.eliminarRol(id);
    }
}
