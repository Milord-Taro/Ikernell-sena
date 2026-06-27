package com.ikernell_backend.service;

import com.ikernell_backend.entity.TipoError;
import com.ikernell_backend.exception.ResourceNotFoundException;
import com.ikernell_backend.repository.TipoErrorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoErrorService {

    private final TipoErrorRepository tipoErrorRepository;

    public TipoErrorService(TipoErrorRepository tipoErrorRepository) {
        this.tipoErrorRepository = tipoErrorRepository;
    }

    public List<TipoError> listarTipoErrores() {
        return tipoErrorRepository.findAll();
    }

    public TipoError obtenerPorId(Integer id) {
        return tipoErrorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Tipo de error no encontrado"));
    }

    public TipoError crearTipoError(TipoError tipoError) {

        return tipoErrorRepository.save(tipoError);
    }

    public TipoError actualizarTipoError(TipoError tipoError) {

        return tipoErrorRepository.save(tipoError);
    }

    public void eliminarTipoError(Integer id) {

        tipoErrorRepository.deleteById(id);
    }
}
