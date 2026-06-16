    package com.ikernell_backend.controller;

    import com.ikernell_backend.entity.Proyecto;
    import com.ikernell_backend.service.ProyectoService;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.RestController;

    import java.util.List;

    @RestController
    public class ProyectoController {

        private final ProyectoService proyectoService;

        public ProyectoController(ProyectoService proyectoService) {
            this.proyectoService = proyectoService;
        }

        @GetMapping("/api/proyectos")
        public List<Proyecto> listarProyectos(){
            return proyectoService.listarProyectos();
        }

        @GetMapping("/api/proyectos/{id}")
        public Proyecto getProyectoById(@PathVariable Integer id) {
            return proyectoService.obtenerPorId(id);
        }
    }
