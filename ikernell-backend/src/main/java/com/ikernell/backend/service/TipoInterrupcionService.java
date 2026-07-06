package com.ikernell.backend.service;

import com.ikernell.backend.entity.TipoInterrupcion;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.repository.TipoInterrupcionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoInterrupcionService {

    private final TipoInterrupcionRepository tipoInterrupcionRepository;

    public TipoInterrupcionService(TipoInterrupcionRepository tipoInterrupcionRepository) {
        this.tipoInterrupcionRepository = tipoInterrupcionRepository;
    }

    public List<TipoInterrupcion> listarTiposInterrupciones(){
        return tipoInterrupcionRepository.findAll();
    }

    public TipoInterrupcion obtenerPorId(Integer id) {
        return tipoInterrupcionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Tipo de interrupción no encontrado"));
    }

    public TipoInterrupcion crearTipoInterrupcion(TipoInterrupcion tipoInterrupcion) {
        return tipoInterrupcionRepository.save(tipoInterrupcion);
    }

    public TipoInterrupcion actualizarTipoInterrupcion(TipoInterrupcion tipoInterrupcion) {
        return tipoInterrupcionRepository.save(tipoInterrupcion);
    }

    public void eliminarTipoInterrupcion(Integer id) {
        tipoInterrupcionRepository.deleteById(id);
    }
}
