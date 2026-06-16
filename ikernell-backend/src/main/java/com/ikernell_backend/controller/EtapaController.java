package com.ikernell_backend.controller;


import com.ikernell_backend.entity.Etapa;
import com.ikernell_backend.service.EtapaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

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
}
