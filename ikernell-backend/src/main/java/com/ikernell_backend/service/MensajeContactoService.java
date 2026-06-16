package com.ikernell_backend.service;

import com.ikernell_backend.entity.MensajeContacto;
import com.ikernell_backend.repository.MensajeContactoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MensajeContactoService {

    private final MensajeContactoRepository mensajeContactoRepository;

    public MensajeContactoService(MensajeContactoRepository mensajeContactoRepository) {
        this.mensajeContactoRepository = mensajeContactoRepository;
    }

    public List<MensajeContacto> listarMensajes(){
        return mensajeContactoRepository.findAll();
    }

    public MensajeContacto obtenerPorId(Integer id) {
        return mensajeContactoRepository.findById(id).orElse(null);
    }
}
