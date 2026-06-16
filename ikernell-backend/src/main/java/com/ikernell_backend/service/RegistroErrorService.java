package com.ikernell_backend.service;

import com.ikernell_backend.entity.RegistroError;
import com.ikernell_backend.repository.RegistroErrorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistroErrorService {

    private final RegistroErrorRepository registroErrorRepository;

    public RegistroErrorService(RegistroErrorRepository registroErrorRepository) {
        this.registroErrorRepository = registroErrorRepository;
    }

    public List<RegistroError> listarRegistroErrors(){
        return registroErrorRepository.findAll();
    }

    public RegistroError obtenerPorId(Integer id) {
        return registroErrorRepository.findById(id).orElse(null);
    }
}
