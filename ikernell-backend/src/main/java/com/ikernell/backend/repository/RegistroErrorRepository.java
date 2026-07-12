package com.ikernell.backend.repository;

import com.ikernell.backend.entity.RegistroError;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegistroErrorRepository extends JpaRepository<RegistroError, Integer> {

    Optional<RegistroError> findByCodigoRegistroError(String codigoRegistroError);

    // Orden explícito por PK: ver comentario equivalente en ActividadRepository.
    List<RegistroError> findByActividad_IdActividadOrderByIdRegistroErrorAsc(Integer idActividad);

    // Alimenta la vista global "Errores" (cards con filtro de Proyecto/Estado):
    // mismo motivo, sin esto la card salta de posición al cambiar su estado.
    List<RegistroError> findAllByOrderByIdRegistroErrorAsc();
}
