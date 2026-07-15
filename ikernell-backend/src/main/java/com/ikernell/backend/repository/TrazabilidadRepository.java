package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Trazabilidad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrazabilidadRepository extends JpaRepository<Trazabilidad, Integer> {

    List<Trazabilidad> findByEntidadOrderByFechaEventoDesc(String entidad);

    List<Trazabilidad> findByUsuario_IdUsuarioOrderByFechaEventoDesc(Integer idUsuario);

    List<Trazabilidad> findAllByOrderByFechaEventoDesc();

    // NUEVO: orden ascendente, usado por TrazabilidadQueryService para
    // reconstruir el "detalle anterior" de cada recurso en un solo pase
    // cronológico (sin una consulta extra por fila).
    List<Trazabilidad> findByEntidadOrderByFechaEventoAsc(String entidad);

    List<Trazabilidad> findAllByOrderByFechaEventoAsc();
}
