package com.ikernell_backend.repository;

import com.ikernell_backend.entity.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActividadRepository
        extends JpaRepository<Actividad, Integer> {
}
