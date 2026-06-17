package com.ikernell_backend.controller;


import com.ikernell_backend.entity.TipoError;
import com.ikernell_backend.service.TipoErrorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;


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

    @PostMapping("/api/tipoerrores")
    public TipoError crearTipoError(
            @RequestBody TipoError tipoError) {

        return tipoErrorService.crearTipoError(tipoError);
    }

    @PutMapping("/api/tipoerrores/{id}")
    public TipoError actualizarTipoError(
            @PathVariable Integer id,
            @RequestBody TipoError tipoErrorActualizado) {

        TipoError tipoError = tipoErrorService.obtenerPorId(id);

        if (tipoError == null) {
            return null;
        }

        tipoError.setCodTipoError(tipoErrorActualizado.getCodTipoError());
        tipoError.setNombreTipo(tipoErrorActualizado.getNombreTipo());

        return tipoErrorService.actualizarTipoError(tipoError);
    }

    @DeleteMapping("/api/tipoerrores/{id}")
    public void eliminarTipoError(
            @PathVariable Integer id) {

        tipoErrorService.eliminarTipoError(id);
    }
}
