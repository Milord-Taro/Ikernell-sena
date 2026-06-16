package com.ikernell_backend.repository;

import com.ikernell_backend.entity.Etapa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtapaRepository
        extends JpaRepository<Etapa, Integer> {
}
