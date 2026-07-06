package com.ikernell.backend.repository;

import com.ikernell.backend.entity.RegistroError;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistroErrorRepository
        extends JpaRepository<RegistroError, Integer> {
    List<RegistroError>
    findByEtapaIdEtapa(Integer idEtapa);

}

