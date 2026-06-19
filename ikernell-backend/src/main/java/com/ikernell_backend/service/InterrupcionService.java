package com.ikernell_backend.service;

import com.ikernell_backend.entity.Interrupcion;
import com.ikernell_backend.repository.InterrupcionRepository;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class InterrupcionService {

    private final InterrupcionRepository interrupcionRepository;

    public InterrupcionService(InterrupcionRepository interrupcionRepository) {
        this.interrupcionRepository = interrupcionRepository;
    }

    public List<Interrupcion> listarInterrupciones(){
        return interrupcionRepository.findAll();
    }

    public Interrupcion obtenerPorId(Integer id) {
        return interrupcionRepository.findById(id).orElse(null);
    }

    public Interrupcion crearInterrupcion(Interrupcion interrupcion) {
        return interrupcionRepository.save(interrupcion);
    }

    public Interrupcion actualizarInterrupcion(Interrupcion interrupcion) {
        return interrupcionRepository.save(interrupcion);
    }

    public void eliminarInterrupcion(Integer id) { interrupcionRepository.deleteById(id); }

    public List<Interrupcion> obtenerPorEtapa(
            Integer idEtapa) {

        return interrupcionRepository
                .findByEtapaIdEtapa(idEtapa);
    }
}
