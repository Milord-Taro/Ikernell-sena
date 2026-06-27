package com.ikernell_backend.service;

import com.ikernell_backend.entity.RegistroError;
import com.ikernell_backend.exception.ResourceNotFoundException;
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
        return registroErrorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Registro de error no encontrado"));
    }

    public RegistroError crearRegistroError(RegistroError registroError) {
            registroError.setFechaRegistroError(
                    java.time.LocalDate.now());
            registroError.setEstadoError("Abierto");
        return registroErrorRepository.save(registroError);
    }

    public RegistroError actualizarRegistroError(
            RegistroError registroError) {

        return registroErrorRepository.save(registroError);
    }

    public void eliminarRegistroError(Integer id) {
        registroErrorRepository.deleteById(id);
    }

    public List<RegistroError> obtenerPorEtapa(
            Integer idEtapa) {

        return registroErrorRepository
                .findByEtapaIdEtapa(idEtapa);
    }

    public RegistroError actualizarEstado(
            Integer id,
            String nuevoEstado) {

        RegistroError error =
                registroErrorRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Registro de error no encontrado"));
        System.out.println(">>>" + nuevoEstado + "<<<");
        System.out.println("Longitud: " + nuevoEstado.length());

        System.out.println("Estado recibido: " + nuevoEstado);

        nuevoEstado = nuevoEstado.replace("\"", "");
        error.setEstadoError(nuevoEstado);

        return registroErrorRepository.save(error);
    }
}
