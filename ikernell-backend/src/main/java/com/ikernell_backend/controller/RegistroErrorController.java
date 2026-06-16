package com.ikernell_backend.controller;


import com.ikernell_backend.entity.RegistroError;
import com.ikernell_backend.service.RegistroErrorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

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
}
