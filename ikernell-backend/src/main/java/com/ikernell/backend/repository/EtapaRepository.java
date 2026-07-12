package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Etapa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EtapaRepository extends JpaRepository<Etapa, Integer> {

    Optional<Etapa> findByCodigoEtapa(String codigoEtapa);

    // Orden explícito por PK, por consistencia/defensa en profundidad --
    // el frontend (EtapasList.tsx) ya reordena en cliente por "orden", pero
    // no conviene depender de que cada consumidor futuro lo recuerde.
    List<Etapa> findByProyecto_IdProyectoOrderByIdEtapaAsc(Integer idProyecto);

    Optional<Etapa> findByProyecto_IdProyectoAndOrden(Integer idProyecto, Integer orden);
}
