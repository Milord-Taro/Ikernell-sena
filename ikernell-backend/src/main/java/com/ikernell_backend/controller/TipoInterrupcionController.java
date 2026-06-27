package com.ikernell_backend.controller;

import com.ikernell_backend.entity.TipoInterrupcion;
import com.ikernell_backend.service.TipoInterrupcionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
public class TipoInterrupcionController {

    private final TipoInterrupcionService tipoInterrupcionService;

    public TipoInterrupcionController(TipoInterrupcionService tipoInterrupcionService) {
        this.tipoInterrupcionService = tipoInterrupcionService;
    }

    @GetMapping("/api/tipointerrupciones")
    public  List<TipoInterrupcion> listarTiposInterrupciones(){
        return tipoInterrupcionService.listarTiposInterrupciones();
    }

    @GetMapping("/api/tipointerrupciones/{id}")
    public TipoInterrupcion obtenerPorId(@PathVariable Integer id){
        return tipoInterrupcionService.obtenerPorId(id);
    }

    @PostMapping("/api/tipointerrupciones")
    public TipoInterrupcion crearTipoInterrupcion(
            @RequestBody TipoInterrupcion tipoInterrupcion) {

        return tipoInterrupcionService.crearTipoInterrupcion(tipoInterrupcion);
    }

    @PutMapping("/api/tipointerrupciones/{id}")
    public TipoInterrupcion actualizarTipoInterrupcion(
            @PathVariable Integer id,
            @RequestBody TipoInterrupcion tipoInterrupcionActualizado) {

        TipoInterrupcion tipoInterrupcion = tipoInterrupcionService.obtenerPorId(id);

        tipoInterrupcion.setCodTipoInterrupcion(tipoInterrupcionActualizado.getCodTipoInterrupcion());
        tipoInterrupcion.setNombreTipoInterrupcion(tipoInterrupcionActualizado.getNombreTipoInterrupcion());

        return tipoInterrupcionService.actualizarTipoInterrupcion(tipoInterrupcion);
    }

    @DeleteMapping("/api/tipointerrupciones/{id}")
    public void eliminarTipoInterrupcion(
            @PathVariable Integer id) {

        tipoInterrupcionService.eliminarTipoInterrupcion(id);
    }
}
