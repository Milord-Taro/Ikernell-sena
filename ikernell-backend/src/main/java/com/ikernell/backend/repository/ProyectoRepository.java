package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.enums.EstadoProyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProyectoRepository extends JpaRepository<Proyecto, Integer> {

    Optional<Proyecto> findByCodigoProyecto(String codigoProyecto);

    // Orden explícito por PK: sin esto, un UPDATE de estado puede reubicar
    // la fila y reordenar la tabla de Proyectos en el frontend.
    List<Proyecto> findByEstadoOrderByIdProyectoAsc(EstadoProyecto estado);

    List<Proyecto> findAllByOrderByIdProyectoAsc();
}
