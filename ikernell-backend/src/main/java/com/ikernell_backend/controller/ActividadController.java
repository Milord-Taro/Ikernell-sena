package com.ikernell_backend.controller;


import com.ikernell_backend.entity.Actividad;
import com.ikernell_backend.service.ActividadService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
public class ActividadController {

    private final ActividadService actividadService;

    public ActividadController(ActividadService actividadService) {
        this.actividadService = actividadService;
    }

    @GetMapping("/api/actividades")
    public  List<Actividad> listarActividades(){
        return actividadService.listarActividades();
    }

    @GetMapping("/api/actividades/{id}")
    public Actividad obtenerPorId(@PathVariable Integer id){
        return actividadService.obtenerPorId(id);
    }

    @GetMapping("/api/etapas/{id}/actividades")
    public List<Actividad> obtenerActividadesEtapa(
            @PathVariable Integer id) {

        return actividadService
                .obtenerPorEtapa(id);
    }

    @PostMapping("/api/actividades")
    public Actividad crearActividad(@RequestBody Actividad actividad) {
        return actividadService.guardarActividad(actividad);
    }

    @PutMapping("/api/actividades/{id}")
    public Actividad actualizarActividad(
            @PathVariable Integer id,
            @RequestBody Actividad actividadActualizada) {

        Actividad actividad = actividadService.obtenerPorId(id);

        if (actividad == null) {
            return null;
        }

        actividad.setCodActividad(actividadActualizada.getCodActividad());
        actividad.setNombreActividad(actividadActualizada.getNombreActividad());
        actividad.setDescripcionActividad(actividadActualizada.getDescripcionActividad());
        actividad.setFechaInicioActividad(actividadActualizada.getFechaInicioActividad());
        actividad.setFechaFinActividad(actividadActualizada.getFechaFinActividad());
        actividad.setEstadoActividad(actividadActualizada.getEstadoActividad());
        actividad.setFechaEjecucionActividad(actividadActualizada.getFechaEjecucionActividad());
        actividad.setEtapa(actividadActualizada.getEtapa());
        actividad.setDesarrollador(actividadActualizada.getDesarrollador());

        return actividadService.guardarActividad(actividad);
    }

    @DeleteMapping("/api/actividades/{id}")
    public void eliminarActividad(@PathVariable Integer id) {
        actividadService.eliminarActividad(id);
    }

    @PutMapping("/api/actividades/{id}/ejecutar")
    public Actividad ejecutarActividad(@PathVariable Integer id) {
        return actividadService.ejecutarActividad(id);
    }

}
