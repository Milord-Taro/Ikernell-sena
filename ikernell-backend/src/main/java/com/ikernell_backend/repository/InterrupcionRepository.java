package com.ikernell_backend.repository;

import com.ikernell_backend.entity.Interrupcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterrupcionRepository
        extends JpaRepository<Interrupcion, Integer> {

    List<Interrupcion>
    findByEtapaIdEtapa(Integer idEtapa);
}
