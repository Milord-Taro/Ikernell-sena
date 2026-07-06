package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EspecialidadRepository
        extends JpaRepository<Especialidad, Integer> {
}