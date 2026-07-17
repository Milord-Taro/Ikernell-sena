package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Actividad;
import com.ikernell.backend.enums.EstadoActividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ActividadRepository extends JpaRepository<Actividad, Integer> {

    Optional<Actividad> findByCodigoActividad(String codigoActividad);

    // Ver comentario equivalente en EtapaRepository.buscarCodigoMaximo().
    @Query("SELECT MAX(a.codigoActividad) FROM Actividad a WHERE a.etapa.idEtapa = :idEtapa")
    String buscarCodigoMaximo(@Param("idEtapa") Integer idEtapa);

    // Orden explícito por PK (no por columnas mutables como estado): sin esto,
    // Postgres no garantiza el orden de retorno y un UPDATE de estado (columna
    // indexada) puede reubicar la fila y hacer que la card "salte" de posición
    // en el frontend tras cada cambio de estado.
    List<Actividad> findByEtapa_IdEtapaOrderByIdActividadAsc(Integer idEtapa);

    // Orden explícito por PK: ver comentario de arriba -- esta alimenta las
    // cards de "Mis actividades", con el mismo riesgo de reordenarse.
    List<Actividad> findByUsuario_IdUsuarioOrderByIdActividadAsc(Integer idUsuario);

    // Actividad no guarda id_proyecto directamente (se obtiene vía
    // Actividad -> Etapa -> Proyecto, ver comentario en la tabla actividad
    // del script SQL). Usado por el reporte de actividades por proyecto.
    List<Actividad> findByEtapa_Proyecto_IdProyecto(Integer idProyecto);

    // Orden explícito por PK: usado por el reporte general (todas las
    // actividades de la organización, no de un solo proyecto).
    List<Actividad> findAllByOrderByIdActividadAsc();

    // ================= Métricas (B4 + B5) =================

    long countByEstadoIn(List<EstadoActividad> estados);

    long countByUsuario_IdUsuarioAndEstadoIn(Integer idUsuario, List<EstadoActividad> estados);

    long countByEtapa_Proyecto_IdProyectoInAndEstadoIn(List<Integer> idsProyecto, List<EstadoActividad> estados);

    @Query("SELECT a.estado, COUNT(a) FROM Actividad a GROUP BY a.estado")
    List<Object[]> contarPorEstado();

    @Query("SELECT a.estado, COUNT(a) FROM Actividad a WHERE a.etapa.proyecto.idProyecto IN :idsProyecto GROUP BY a.estado")
    List<Object[]> contarPorEstadoEnProyectos(@Param("idsProyecto") List<Integer> idsProyecto);

    @Query("SELECT a.estado, COUNT(a) FROM Actividad a WHERE a.usuario.idUsuario = :idUsuario GROUP BY a.estado")
    List<Object[]> contarPorEstadoDeUsuario(@Param("idUsuario") Integer idUsuario);

    @Query(value = "SELECT DATE(fecha_finalizacion), COUNT(*) FROM actividad "
            + "WHERE estado = 'Finalizada' AND fecha_finalizacion >= :desde "
            + "GROUP BY DATE(fecha_finalizacion) ORDER BY 1", nativeQuery = true)
    List<Object[]> contarFinalizadasPorDia(@Param("desde") LocalDateTime desde);

    @Query(value = "SELECT DATE(a.fecha_finalizacion), COUNT(*) FROM actividad a "
            + "JOIN etapa e ON a.id_etapa = e.id_etapa "
            + "WHERE a.estado = 'Finalizada' AND a.fecha_finalizacion >= :desde AND e.id_proyecto IN :idsProyecto "
            + "GROUP BY DATE(a.fecha_finalizacion) ORDER BY 1", nativeQuery = true)
    List<Object[]> contarFinalizadasPorDiaEnProyectos(@Param("desde") LocalDateTime desde, @Param("idsProyecto") List<Integer> idsProyecto);

    @Query(value = "SELECT DATE(fecha_finalizacion), COUNT(*) FROM actividad "
            + "WHERE estado = 'Finalizada' AND fecha_finalizacion >= :desde AND id_usuario = :idUsuario "
            + "GROUP BY DATE(fecha_finalizacion) ORDER BY 1", nativeQuery = true)
    List<Object[]> contarFinalizadasPorDiaDeUsuario(@Param("desde") LocalDateTime desde, @Param("idUsuario") Integer idUsuario);

    @Query("SELECT COUNT(DISTINCT a.etapa.proyecto.idProyecto) FROM Actividad a WHERE a.usuario.idUsuario = :idUsuario")
    long countProyectosDistintosDeUsuario(@Param("idUsuario") Integer idUsuario);
}