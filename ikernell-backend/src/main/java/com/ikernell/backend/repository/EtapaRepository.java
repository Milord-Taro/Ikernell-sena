package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Etapa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EtapaRepository
        extends JpaRepository<Etapa, Integer> {

    List<Etapa> findByProyectoIdProyecto(
            Integer idProyecto);
}
