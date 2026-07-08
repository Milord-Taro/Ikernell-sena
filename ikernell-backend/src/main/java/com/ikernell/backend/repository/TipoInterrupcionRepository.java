package com.ikernell.backend.repository;

import com.ikernell.backend.entity.TipoInterrupcion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TipoInterrupcionRepository extends JpaRepository<TipoInterrupcion, Integer> {

    Optional<TipoInterrupcion> findByCodigoTipoInterrupcion(String codigoTipoInterrupcion);

    Optional<TipoInterrupcion> findByNombreTipoInterrupcionIgnoreCase(String nombreTipoInterrupcion);

    List<TipoInterrupcion> findByActivoTrue();
}
