package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Interrupcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InterrupcionRepository extends JpaRepository<Interrupcion, Integer> {

    Optional<Interrupcion> findByCodigoInterrupcion(String codigoInterrupcion);

    // Ver comentario equivalente en EtapaRepository.buscarCodigoMaximo().
    @Query("SELECT MAX(i.codigoInterrupcion) FROM Interrupcion i WHERE i.actividad.idActividad = :idActividad")
    String buscarCodigoMaximo(@Param("idActividad") Integer idActividad);

    List<Interrupcion> findByActividad_IdActividad(Integer idActividad);

    // NUEVO: para ReporteInterrupcionesService -- mismo patrón de
    // navegación de asociaciones que ActividadRepository.findByEtapa_Proyecto_IdProyecto,
    // solo que un nivel más profundo (Interrupcion -> Actividad -> Etapa -> Proyecto).
    List<Interrupcion> findByActividad_Etapa_Proyecto_IdProyecto(Integer idProyecto);

    // Orden explícito por PK: usado por el reporte general (todas las
    // interrupciones de la organización, no de un solo proyecto).
    List<Interrupcion> findAllByOrderByIdInterrupcionAsc();

    // ================= Métricas (B4 + B5) =================
    // "Minutos perdidos" -- SUM en SQL en vez de traer todas las filas y
    // sumar en Java/JS. COALESCE porque SUM() de cero filas da NULL, no 0.

    @Query("SELECT COALESCE(SUM(i.duracionMinutos), 0) FROM Interrupcion i")
    long sumarMinutos();

    @Query("SELECT COALESCE(SUM(i.duracionMinutos), 0) FROM Interrupcion i WHERE i.actividad.etapa.proyecto.idProyecto IN :idsProyecto")
    long sumarMinutosEnProyectos(@Param("idsProyecto") List<Integer> idsProyecto);

    @Query("SELECT COALESCE(SUM(i.duracionMinutos), 0) FROM Interrupcion i WHERE i.actividad.usuario.idUsuario = :idUsuario")
    long sumarMinutosDeUsuario(@Param("idUsuario") Integer idUsuario);

    // Feed de actividad reciente -- acotado (Top 8) en la propia consulta.
    List<Interrupcion> findTop8ByOrderByFechaRegistroDesc();

    List<Interrupcion> findTop8ByActividad_Etapa_Proyecto_IdProyectoInOrderByFechaRegistroDesc(List<Integer> idsProyecto);

    List<Interrupcion> findTop8ByActividad_Usuario_IdUsuarioOrderByFechaRegistroDesc(Integer idUsuario);
}
