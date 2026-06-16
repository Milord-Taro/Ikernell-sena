package com.ikernell_backend.controller;


import com.ikernell_backend.entity.Etapa;
import com.ikernell_backend.service.EtapaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
public class EtapaController {

    private final EtapaService etapaService;

    public EtapaController(EtapaService etapaService) {
        this.etapaService = etapaService;
    }

    @GetMapping("/api/etapas")
    public  List<Etapa> listarEtapas(){
        return etapaService.listarEtapas();
    }

    @GetMapping("/api/etapas/{id}")
    public Etapa obtenerPorId(@PathVariable Integer id){
        return etapaService.obtenerPorId(id);
    }

    @PostMapping("/api/etapas")
    public Etapa crearEtapa(@RequestBody Etapa etapa) {
        return etapaService.guardarEtapa(etapa);
    }

    @PutMapping("/api/etapas/{id}")
    public Etapa actualizarEtapa(
            @PathVariable Integer id,
            @RequestBody Etapa etapaActualizada) {

        Etapa etapa = etapaService.obtenerPorId(id);

        if (etapa == null) {
            return null;
        }

        etapa.setCodEtapa(etapaActualizada.getCodEtapa());
        etapa.setNombreEtapa(etapaActualizada.getNombreEtapa());
        etapa.setDescripcionEtapa(etapaActualizada.getDescripcionEtapa());
        etapa.setFechaEtapa(etapaActualizada.getFechaEtapa());
        etapa.setProyecto(etapaActualizada.getProyecto());

        return etapaService.guardarEtapa(etapa);
    }

    @DeleteMapping("/api/etapas/{id}")
    public void eliminarEtapa(@PathVariable Integer id) {
        etapaService.eliminarEtapa(id);
    }

}
