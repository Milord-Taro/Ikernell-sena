package com.ikernell_backend.service;

import com.ikernell_backend.entity.Especialidad;
import com.ikernell_backend.repository.EspecialidadRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspecialidadService {

    private final EspecialidadRepository especialidadRepository;

    public EspecialidadService(EspecialidadRepository especialidadRepository) {
        this.especialidadRepository = especialidadRepository;
    }

    public List<Especialidad> listarEspecialidades() {
        return especialidadRepository.findAll();
    }
    public Especialidad obtenerPorId(Integer id) {
        return especialidadRepository.findById(id).orElse(null);
    }

    public Especialidad crearEspecialidad(Especialidad especialidad) {
        return especialidadRepository.save(especialidad);
    }

    public Especialidad actualizarEspecialidad(Especialidad especialidad) {
        return especialidadRepository.save(especialidad);
    }

    public void eliminarEspecialidad(Integer id) {especialidadRepository.deleteById(id);
    }
}