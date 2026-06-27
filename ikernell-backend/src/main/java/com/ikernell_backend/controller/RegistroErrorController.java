package com.ikernell_backend.controller;

import com.ikernell_backend.entity.RegistroError;
import com.ikernell_backend.service.RegistroErrorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
public class RegistroErrorController {

    private final RegistroErrorService registroErrorService;

    public RegistroErrorController(RegistroErrorService registroErrorService) {
        this.registroErrorService = registroErrorService;
    }

    @GetMapping("/api/registroerrores")
    public  List<RegistroError> listarUsuarios(){
        return registroErrorService.listarRegistroErrors();
    }

    @GetMapping("/api/registroerrores/{id}")
    public RegistroError obtenerPorId(@PathVariable Integer id){
        return registroErrorService.obtenerPorId(id);
    }

    @GetMapping("/api/etapas/{id}/errores")
    public List<RegistroError> obtenerErroresEtapa(
            @PathVariable Integer id) {

        return registroErrorService
                .obtenerPorEtapa(id);
    }

    @PostMapping("/api/registroerrores")
    public RegistroError crearRegistroError(
            @RequestBody RegistroError registroError) {

        return registroErrorService.crearRegistroError(registroError);
    }

    @PutMapping("/api/registroerrores/{id}")
    public RegistroError actualizarRegistroError(
            @PathVariable Integer id,
            @RequestBody RegistroError registroErrorActualizado) {

        RegistroError registroError = registroErrorService.obtenerPorId(id);

        registroError.setCodError(registroErrorActualizado.getCodError());
        registroError.setDescripcionError(registroErrorActualizado.getDescripcionError());
        registroError.setEstadoError(registroErrorActualizado.getEstadoError());
        registroError.setComentarioError(registroErrorActualizado.getComentarioError());
        registroError.setTipoError(registroErrorActualizado.getTipoError());
        registroError.setEtapa(registroErrorActualizado.getEtapa());
        registroError.setDesarrollador(registroErrorActualizado.getDesarrollador());

        return registroErrorService.actualizarRegistroError(registroError);
    }

    @PutMapping("/api/registroerrores/{id}/estado")
    public RegistroError actualizarEstado(
            @PathVariable Integer id,
            @RequestBody String estado) {

        return registroErrorService
                .actualizarEstado(id, estado);
    }

    @DeleteMapping("/api/registroerrores/{id}")
    public void eliminarRegistroError(@PathVariable Integer id) {
        registroErrorService.eliminarRegistroError(id);
    }

}
