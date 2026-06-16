package com.ikernell_backend.service;

import com.ikernell_backend.entity.Actividad;
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
}
