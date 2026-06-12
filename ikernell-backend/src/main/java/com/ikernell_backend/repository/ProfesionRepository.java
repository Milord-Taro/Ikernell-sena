package com.ikernell_backend.repository;

import com.ikernell_backend.entity.Profesion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesionRepository
        extends JpaRepository<Profesion, Integer> {
}