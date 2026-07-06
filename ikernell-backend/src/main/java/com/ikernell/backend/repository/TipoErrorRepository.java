package com.ikernell.backend.repository;

import com.ikernell.backend.entity.TipoError;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoErrorRepository
        extends JpaRepository<TipoError, Integer> {
}
