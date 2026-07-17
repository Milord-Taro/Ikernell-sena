package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EspecialidadRepository extends JpaRepository<Especialidad, Integer> {

    Optional<Especialidad> findByCodigoEspecialidad(String codigoEspecialidad);

    // Ver comentario equivalente en UsuarioRepository.buscarCodigoMaximo().
    @Query("SELECT MAX(e.codigoEspecialidad) FROM Especialidad e")
    String buscarCodigoMaximo();

    Optional<Especialidad> findByNombreEspecialidadIgnoreCase(String nombreEspecialidad);

    // Orden explícito por PK: sin esto, un UPDATE de "activo" puede
    // reubicar la fila y reordenar la tabla del catálogo en el frontend.
    List<Especialidad> findByActivoTrueOrderByIdEspecialidadAsc();

    List<Especialidad> findAllByOrderByIdEspecialidadAsc();
}
