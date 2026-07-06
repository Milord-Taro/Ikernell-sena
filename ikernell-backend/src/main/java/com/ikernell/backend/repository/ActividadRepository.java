package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActividadRepository
        extends JpaRepository<Actividad, Integer> {

    List<Actividad> findByEtapaIdEtapa(
            Integer idEtapa);

    Actividad findTopByOrderByIdActividadDesc();

    long countByEtapaIdEtapa(
            Integer idEtapa);
}
