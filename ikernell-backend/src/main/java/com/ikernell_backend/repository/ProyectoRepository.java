package com.ikernell_backend.repository;

import com.ikernell_backend.entity.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProyectoRepository
        extends JpaRepository<Proyecto, Integer> {
}
