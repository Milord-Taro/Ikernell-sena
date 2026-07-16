package com.ikernell.backend.repository;

import com.ikernell.backend.entity.TipoInterrupcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TipoInterrupcionRepository extends JpaRepository<TipoInterrupcion, Integer> {

    Optional<TipoInterrupcion> findByCodigoTipoInterrupcion(String codigoTipoInterrupcion);

    // Ver comentario equivalente en UsuarioRepository.buscarCodigoMaximo().
    @Query("SELECT MAX(t.codigoTipoInterrupcion) FROM TipoInterrupcion t")
    String buscarCodigoMaximo();

    Optional<TipoInterrupcion> findByNombreTipoInterrupcionIgnoreCase(String nombreTipoInterrupcion);

    // Orden explícito por PK: sin esto, un UPDATE de "activo" puede
    // reubicar la fila y reordenar la tabla del catálogo en el frontend.
    List<TipoInterrupcion> findByActivoTrueOrderByIdTipoInterrupcionAsc();

    List<TipoInterrupcion> findAllByOrderByIdTipoInterrupcionAsc();
}
