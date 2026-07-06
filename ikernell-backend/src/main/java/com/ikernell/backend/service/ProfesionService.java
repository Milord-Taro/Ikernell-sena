package com.ikernell.backend.service;

import com.ikernell.backend.entity.Profesion;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.repository.ProfesionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfesionService {

    private final ProfesionRepository profesionRepository;

    public ProfesionService(ProfesionRepository profesionRepository) {
        this.profesionRepository = profesionRepository;
    }

    public List<Profesion> listarProfesiones() {
        return profesionRepository.findAll();
    }

    public Profesion obtenerPorId(Integer id) {
        return profesionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Profesión no encontrada"));
    }

    public Profesion crearProfesion(Profesion profesion) {
        return profesionRepository.save(profesion);
    }

    public Profesion actualizarProfesion(Profesion profesion) {
        return profesionRepository.save(profesion);
    }

    public void eliminarProfesion(Integer id) {profesionRepository.deleteById(id);
    }
}
