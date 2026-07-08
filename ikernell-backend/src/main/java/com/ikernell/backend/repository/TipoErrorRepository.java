package com.ikernell.backend.repository;

import com.ikernell.backend.entity.TipoError;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TipoErrorRepository extends JpaRepository<TipoError, Integer> {

    Optional<TipoError> findByCodigoTipoError(String codigoTipoError);

    Optional<TipoError> findByNombreTipoErrorIgnoreCase(String nombreTipoError);

    List<TipoError> findByActivoTrue();
}
