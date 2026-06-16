package com.ikernell_backend.repository;

import com.ikernell_backend.entity.RegistroError;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroErrorRepository
        extends JpaRepository<RegistroError, Integer> {

}

