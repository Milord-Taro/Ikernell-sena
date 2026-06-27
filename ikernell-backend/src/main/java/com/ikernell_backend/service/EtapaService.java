package com.ikernell_backend.service;

import com.ikernell_backend.entity.Etapa;
import com.ikernell_backend.exception.ResourceNotFoundException;
import com.ikernell_backend.repository.EtapaRepository;
import org.springframework.stereotype.Service;
import com.ikernell_backend.repository.ActividadRepository;

import java.util.List;

@Service
public class EtapaService {

    private final EtapaRepository etapaRepository;

    private final ActividadRepository actividadRepository;

    public EtapaService(
            EtapaRepository etapaRepository,
            ActividadRepository actividadRepository) {

        this.etapaRepository = etapaRepository;
        this.actividadRepository = actividadRepository;
    }

    public List<Etapa> listarEtapas(){
        return etapaRepository.findAll();
    }

    public Etapa obtenerPorId(Integer id) {
        return etapaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Etapa no encontrada"));
    }

    public Etapa guardarEtapa(Etapa etapa) {
        return etapaRepository.save(etapa);
    }

    public void eliminarEtapa(Integer id) {

        long cantidadActividades =
                actividadRepository.countByEtapaIdEtapa(id);

        if (cantidadActividades > 0) {
            throw new RuntimeException(
                    "No se puede eliminar una etapa con actividades asociadas"
            );
        }

        etapaRepository.deleteById(id);
    }

    public List<Etapa> obtenerPorProyecto(
            Integer idProyecto) {

        return etapaRepository
                .findByProyectoIdProyecto(
                        idProyecto);
    }
}
