    package com.ikernell_backend.controller;


    import com.ikernell_backend.entity.Interrupcion;
    import com.ikernell_backend.service.InterrupcionService;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RestController;
    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.PutMapping;
    import org.springframework.web.bind.annotation.DeleteMapping;
    import org.springframework.web.bind.annotation.RequestBody;

    import java.util.List;

    @RestController
    public class InterrupcionController {

        private final InterrupcionService interrupcionService;

        public InterrupcionController(InterrupcionService interrupcionService) {
            this.interrupcionService = interrupcionService;
        }

        @GetMapping("/api/interrupciones")
        public  List<Interrupcion> listarInterrupciones(){
            return interrupcionService.listarInterrupciones();
        }

        @GetMapping("/api/interrupciones/{id}")
        public Interrupcion obtenerPorId(@PathVariable Integer id){
            return interrupcionService.obtenerPorId(id);
        }

        @GetMapping("/api/etapas/{id}/interrupciones")
        public List<Interrupcion> obtenerInterrupcionesEtapa(
                @PathVariable Integer id) {

            return interrupcionService
                    .obtenerPorEtapa(id);
        }

        @PostMapping ("/api/interrupciones")
        public Interrupcion crearInterrupcion(
                @RequestBody Interrupcion interrupcion) {

            return interrupcionService.crearInterrupcion(interrupcion);
        }

        @PutMapping("/api/interrupciones/{id}")
        public Interrupcion actualizarInterrupcion(
                @PathVariable Integer id,
                @RequestBody Interrupcion interrupcionActualizado) {

            Interrupcion interrupcion = interrupcionService.obtenerPorId(id);

            if (interrupcion == null) {
                return null;
            }

            interrupcion.setCodInterrupcion(interrupcionActualizado.getCodInterrupcion());
            interrupcion.setDescripcionInterrupcion(interrupcionActualizado.getDescripcionInterrupcion());
            interrupcion.setFechaInterrupcion(interrupcionActualizado.getFechaInterrupcion());
            interrupcion.setDuracionInterrupcion(interrupcionActualizado.getDuracionInterrupcion());
            interrupcion.setTipoInterrupcion(interrupcionActualizado.getTipoInterrupcion());
            interrupcion.setEtapa(interrupcionActualizado.getEtapa());
            interrupcion.setDesarrollador(interrupcionActualizado.getDesarrollador());

            return interrupcionService.actualizarInterrupcion(interrupcion);
        }

        @DeleteMapping("/api/interrupciones/{id}")
        public void eliminarInterrupcion(@PathVariable Integer id) {
            interrupcionService.eliminarInterrupcion(id);
        }

    }