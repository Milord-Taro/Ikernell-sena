package com.ikernell_backend.service;

import com.ikernell_backend.entity.AsignacionProyecto;
import com.ikernell_backend.repository.AsignacionProyectoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AsignacionProyectoService {

    private final AsignacionProyectoRepository asignacionProyectoRepository;

    public AsignacionProyectoService(AsignacionProyectoRepository asignacionProyectoRepository) {
        this.asignacionProyectoRepository = asignacionProyectoRepository;
    }

    public List<AsignacionProyecto> listarAsignacionProyecto() {
        return asignacionProyectoRepository.findAll();
    }

    public AsignacionProyecto obtenerPorId(Integer id) {
        return asignacionProyectoRepository.findById(id).orElse(null);
    }

    public AsignacionProyecto crearAsignacionProyecto(
            AsignacionProyecto asignacionProyecto) {

        asignacionProyecto.setFechaAsignacion(
                java.time.LocalDate.now());

        asignacionProyecto.setEstadoAsignacion(true);

        return asignacionProyectoRepository.save(
                asignacionProyecto);
    }

    public AsignacionProyecto actualizarAsignacionProyecto(
            AsignacionProyecto asignacionProyecto) {

        return asignacionProyectoRepository.save(
                asignacionProyecto);
    }

    public void eliminarAsignacionProyecto(
            Integer id) {

        asignacionProyectoRepository.deleteById(id);
    }
}
