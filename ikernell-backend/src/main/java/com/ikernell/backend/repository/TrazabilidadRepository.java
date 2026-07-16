package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Trazabilidad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TrazabilidadRepository extends JpaRepository<Trazabilidad, Integer> {

    // CORREGIDO (B4): antes traía la tabla ENTERA en cada lectura (ver
    // TrazabilidadQueryService) -- es la única tabla que crece sin límite
    // (cada acción auditable agrega una fila, para siempre). Paginado en
    // la base de datos en vez de en memoria.
    Page<Trazabilidad> findByEntidadOrderByFechaEventoDesc(String entidad, Pageable pageable);

    Page<Trazabilidad> findAllByOrderByFechaEventoDesc(Pageable pageable);

    List<Trazabilidad> findByUsuario_IdUsuarioOrderByFechaEventoDesc(Integer idUsuario);

    // CORREGIDO (C7): usada por TrazabilidadService.registrar() para
    // calcular detalle_anterior AL CREAR el evento -- el evento JSON más
    // reciente sobre el mismo recurso (misma entidad + código), antes de
    // insertar el nuevo. "StartingWith" filtra a detalle que empieza por
    // '{' (JSON), replicando la regla que antes vivía en
    // TrazabilidadQueryService: los eventos de texto plano (ej. "Inicio
    // de sesión exitoso.") no cuentan como "anterior" de nadie.
    Optional<Trazabilidad> findFirstByEntidadAndCodigoRegistroAndDetalleStartingWithOrderByFechaEventoDescIdTrazabilidadDesc(
            String entidad, String codigoRegistro, String prefijoJson);
}
