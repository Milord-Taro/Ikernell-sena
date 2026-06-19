package com.ikernell_backend.service;

import com.ikernell_backend.entity.Actividad;
import com.ikernell_backend.entity.Etapa;
import com.ikernell_backend.repository.ActividadRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActividadService {

    private final ActividadRepository actividadRepository;

    public ActividadService(ActividadRepository actividadRepository) {
        this.actividadRepository = actividadRepository;
    }

    public List<Actividad> listarActividades() {
        return actividadRepository.findAll();
    }

    public Actividad obtenerPorId(Integer id) {
        return actividadRepository.findById(id).orElse(null);
    }

    public Actividad guardarActividad(Actividad actividad) {
        return actividadRepository.save(actividad);
    }

    public void eliminarActividad(Integer id) {
        actividadRepository.deleteById(id);
    }

    public Actividad ejecutarActividad(Integer id) {

        Actividad actividad = actividadRepository.findById(id)
                .orElse(null);

        if (actividad == null) {
            return null;
        }

        actividad.setEstadoActividad("Ejecutada");
        actividad.setFechaEjecucionActividad(java.time.LocalDate.now());

        return actividadRepository.save(actividad);
    }

    public List<Actividad> obtenerPorEtapa(
            Integer idEtapa) {

        return actividadRepository
                .findByEtapaIdEtapa(idEtapa);
    }

}
