package com.ikernell_backend.service;

import com.ikernell_backend.entity.Rol;
import com.ikernell_backend.repository.RolRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolService {

    private final RolRepository rolRepository;

    public RolService(RolRepository rolRepository){
        this.rolRepository = rolRepository;
    }

    public List<Rol> listarRoles() {
        return rolRepository.findAll();
    }

    public Rol obtenerPorId(Integer id) {
        return rolRepository.findById(id).orElse(null);
    }

    public Rol crearRol(Rol rol) {
        return rolRepository.save(rol);
    }

    public Rol actualizarRol(Rol rol) {
        return rolRepository.save(rol);
    }

    public void eliminarRol(Integer id) {rolRepository.deleteById(id);
    }
}
