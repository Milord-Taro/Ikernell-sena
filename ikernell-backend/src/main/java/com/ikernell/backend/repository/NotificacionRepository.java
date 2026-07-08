package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificacionRepository extends JpaRepository<Notificacion, Integer> {

    List<Notificacion> findByUsuario_IdUsuarioOrderByFechaCreacionDesc(Integer idUsuario);

    List<Notificacion> findByUsuario_IdUsuarioAndLeidaFalseOrderByFechaCreacionDesc(Integer idUsuario);
}
