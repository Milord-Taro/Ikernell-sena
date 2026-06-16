package com.ikernell_backend.controller;


import com.ikernell_backend.entity.TipoError;
import com.ikernell_backend.service.TipoErrorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
public class TipoErrorController {

    private final TipoErrorService tipoErrorService;

    public TipoErrorController(TipoErrorService tipoErrorService) {
        this.tipoErrorService = tipoErrorService;
    }

    @GetMapping("/api/tipoerrores")
    public  List<TipoError> listarTipoErrores(){
        return tipoErrorService.listarTipoErrores();
    }

    @GetMapping("/api/tipoerrores/{id}")
    public TipoError obtenerPorId(@PathVariable Integer id){
        return tipoErrorService.obtenerPorId(id);
    }
}
