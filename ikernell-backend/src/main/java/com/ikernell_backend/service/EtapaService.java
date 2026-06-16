package com.ikernell_backend.service;

import com.ikernell_backend.entity.Etapa;
import com.ikernell_backend.repository.EtapaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EtapaService {

    private final EtapaRepository etapaRepository;

    public EtapaService(EtapaRepository etapaRepository) {
        this.etapaRepository = etapaRepository;
    }

    public List<Etapa> listarEtapas(){
        return etapaRepository.findAll();
    }

    public Etapa obtenerPorId(Integer id) {
        return etapaRepository.findById(id).orElse(null);
    }

    public Etapa guardarEtapa(Etapa etapa) {
        return etapaRepository.save(etapa);
    }

    public void eliminarEtapa(Integer id) {
        etapaRepository.deleteById(id);
    }
}
