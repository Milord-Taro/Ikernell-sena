package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.enums.EstadoProyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProyectoRepository extends JpaRepository<Proyecto, Integer> {

    Optional<Proyecto> findByCodigoProyecto(String codigoProyecto);

    List<Proyecto> findByEstado(EstadoProyecto estado);
}
