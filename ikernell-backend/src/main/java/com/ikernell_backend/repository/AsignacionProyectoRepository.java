package com.ikernell_backend.repository;

import com.ikernell_backend.entity.AsignacionProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsignacionProyectoRepository
        extends JpaRepository<AsignacionProyecto, Integer> {
}