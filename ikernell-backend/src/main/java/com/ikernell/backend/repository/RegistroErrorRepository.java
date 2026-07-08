package com.ikernell.backend.repository;

import com.ikernell.backend.entity.RegistroError;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegistroErrorRepository extends JpaRepository<RegistroError, Integer> {

    Optional<RegistroError> findByCodigoRegistroError(String codigoRegistroError);

    List<RegistroError> findByActividad_IdActividad(Integer idActividad);
}
