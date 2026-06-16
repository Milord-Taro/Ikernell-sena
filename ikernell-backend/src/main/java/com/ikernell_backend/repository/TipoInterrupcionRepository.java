package com.ikernell_backend.repository;

import com.ikernell_backend.entity.TipoInterrupcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoInterrupcionRepository
        extends JpaRepository<TipoInterrupcion, Integer> {
}
