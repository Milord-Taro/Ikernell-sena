    package com.ikernell_backend.controller;

    import com.ikernell_backend.entity.Proyecto;
    import com.ikernell_backend.service.ProyectoService;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.RestController;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.PutMapping;
    import org.springframework.web.bind.annotation.DeleteMapping;
    import org.springframework.web.bind.annotation.RequestBody;

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

        @PostMapping("/api/proyectos")
        public Proyecto crearProyecto(
                @RequestBody Proyecto proyecto) {

            return proyectoService.crearProyecto(proyecto);
        }

        @PutMapping("/api/proyectos/{id}")
        public Proyecto actualizarProyecto(
                @PathVariable Integer id,
                @RequestBody Proyecto proyectoActualizado) {

            Proyecto proyecto =
                    proyectoService.obtenerPorId(id);

            if (proyecto == null) {
                return null;
            }

            proyecto.setCodProyecto(proyectoActualizado.getCodProyecto());
            proyecto.setNombreProyecto(proyectoActualizado.getNombreProyecto());
            proyecto.setDescripcionProyecto(proyectoActualizado.getDescripcionProyecto());
            proyecto.setFechaInicioProyecto(proyectoActualizado.getFechaInicioProyecto());
            proyecto.setFechaFinProyecto(proyectoActualizado.getFechaFinProyecto());
            proyecto.setEstadoProyecto(proyectoActualizado.getEstadoProyecto());
            proyecto.setLider(proyectoActualizado.getLider());

            return proyectoService.actualizarProyecto(
                    proyecto);
        }

        @DeleteMapping("/api/proyectos/{id}")
        public void eliminarProyecto(
                @PathVariable Integer id) {

            proyectoService.eliminarProyecto(id);
        }
    }
