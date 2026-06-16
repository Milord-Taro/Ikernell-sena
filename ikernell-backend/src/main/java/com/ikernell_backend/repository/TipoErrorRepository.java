package com.ikernell_backend.repository;

import com.ikernell_backend.entity.TipoError;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoErrorRepository
        extends JpaRepository<TipoError, Integer> {
}
