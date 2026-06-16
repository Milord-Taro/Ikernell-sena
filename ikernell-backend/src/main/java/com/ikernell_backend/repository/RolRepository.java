package com.ikernell_backend.repository;

import com.ikernell_backend.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository
    extends JpaRepository<Rol, Integer> {
}
