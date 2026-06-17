package com.ikernell_backend.service;

import com.ikernell_backend.entity.TipoInterrupcion;
import com.ikernell_backend.repository.TipoInterrupcionRepository;
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
        return tipoInterrupcionRepository.findById(id).orElse(null);
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
