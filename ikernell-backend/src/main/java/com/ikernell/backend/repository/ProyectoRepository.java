package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.enums.EstadoProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProyectoRepository extends JpaRepository<Proyecto, Integer> {

    Optional<Proyecto> findByCodigoProyecto(String codigoProyecto);

    // Ver comentario equivalente en UsuarioRepository.buscarCodigoMaximo().
    @Query("SELECT MAX(p.codigoProyecto) FROM Proyecto p")
    String buscarCodigoMaximo();

    // Orden explícito por PK: sin esto, un UPDATE de estado puede reubicar
    // la fila y reordenar la tabla de Proyectos en el frontend.
    List<Proyecto> findByEstadoOrderByIdProyectoAsc(EstadoProyecto estado);

    List<Proyecto> findAllByOrderByIdProyectoAsc();

    // ================= Métricas (B4 + B5) =================
    // Usadas por MetricasService para armar las cards/gráficos con
    // SQL agregado en vez de traer listas completas al backend/frontend.

    long countByEstado(EstadoProyecto estado);

    @Query("SELECT p.estado, COUNT(p) FROM Proyecto p GROUP BY p.estado")
    List<Object[]> contarPorEstado();

    long countByIdProyectoInAndEstado(List<Integer> idsProyecto, EstadoProyecto estado);
}
