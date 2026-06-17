package com.ikernell_backend.service;

import com.ikernell_backend.entity.Proyecto;
import com.ikernell_backend.repository.ProyectoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProyectoService {

    private ProyectoRepository proyectoRepository;

    public ProyectoService(ProyectoRepository proyectoRepository) {
        this.proyectoRepository = proyectoRepository;
    }

    public List<Proyecto> listarProyectos() {
        return proyectoRepository.findAll();
    }

    public Proyecto obtenerPorId(Integer id) {
        return proyectoRepository.findById(id).orElse(null);
    }

    public Proyecto crearProyecto(
            Proyecto proyecto) {

        return proyectoRepository.save(proyecto);
    }

    public Proyecto actualizarProyecto(
            Proyecto proyecto) {

        return proyectoRepository.save(proyecto);
    }

    public void eliminarProyecto(Integer id) {
        proyectoRepository.deleteById(id);
    }
}
