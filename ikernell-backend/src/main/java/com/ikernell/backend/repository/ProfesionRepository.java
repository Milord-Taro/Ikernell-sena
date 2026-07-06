package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Profesion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesionRepository
        extends JpaRepository<Profesion, Integer> {
}