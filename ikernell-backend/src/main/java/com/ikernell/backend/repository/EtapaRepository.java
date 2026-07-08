package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Etapa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EtapaRepository extends JpaRepository<Etapa, Integer> {

    Optional<Etapa> findByCodigoEtapa(String codigoEtapa);

    List<Etapa> findByProyecto_IdProyecto(Integer idProyecto);

    Optional<Etapa> findByProyecto_IdProyectoAndOrden(Integer idProyecto, Integer orden);
}
