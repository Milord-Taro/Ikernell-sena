package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActividadRepository extends JpaRepository<Actividad, Integer> {

    Optional<Actividad> findByCodigoActividad(String codigoActividad);

    List<Actividad> findByEtapa_IdEtapa(Integer idEtapa);

    List<Actividad> findByUsuario_IdUsuario(Integer idUsuario);
}
