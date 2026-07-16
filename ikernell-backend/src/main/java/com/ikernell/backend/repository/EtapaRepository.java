package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Etapa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EtapaRepository extends JpaRepository<Etapa, Integer> {

    Optional<Etapa> findByCodigoEtapa(String codigoEtapa);

    // Ver comentario equivalente en UsuarioRepository.buscarCodigoMaximo()
    // -- acá acotado al proyecto padre, ya que la secuencia se reinicia por padre.
    @Query("SELECT MAX(e.codigoEtapa) FROM Etapa e WHERE e.proyecto.idProyecto = :idProyecto")
    String buscarCodigoMaximo(@Param("idProyecto") Integer idProyecto);

    // Orden explícito por PK, por consistencia/defensa en profundidad --
    // el frontend (EtapasList.tsx) ya reordena en cliente por "orden", pero
    // no conviene depender de que cada consumidor futuro lo recuerde.
    List<Etapa> findByProyecto_IdProyectoOrderByIdEtapaAsc(Integer idProyecto);

    Optional<Etapa> findByProyecto_IdProyectoAndOrden(Integer idProyecto, Integer orden);
}
