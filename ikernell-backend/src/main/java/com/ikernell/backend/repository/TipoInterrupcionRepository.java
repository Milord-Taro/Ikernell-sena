package com.ikernell.backend.repository;

import com.ikernell.backend.entity.TipoInterrupcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoInterrupcionRepository
        extends JpaRepository<TipoInterrupcion, Integer> {
}
