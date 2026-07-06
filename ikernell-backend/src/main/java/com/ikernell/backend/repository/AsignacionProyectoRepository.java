package com.ikernell.backend.repository;

import com.ikernell.backend.entity.AsignacionProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsignacionProyectoRepository
        extends JpaRepository<AsignacionProyecto, Integer> {
}