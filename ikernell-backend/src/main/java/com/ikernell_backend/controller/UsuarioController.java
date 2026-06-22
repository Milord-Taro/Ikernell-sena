package com.ikernell_backend.controller;


import com.ikernell_backend.entity.Usuario;
import com.ikernell_backend.service.UsuarioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.List;

@RestController
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/api/usuarios")
    public  List<Usuario> listarUsuarios(){
        return usuarioService.listarUsuarios();
    }

    @GetMapping("/api/usuarios/{id}")
    public Usuario obtenerPorId(@PathVariable Integer id){
        return usuarioService.obtenerPorId(id);
    }

    @PostMapping("/api/usuarios")
    public Usuario crearUsuario(@RequestBody Usuario usuario) {

        return usuarioService.crearUsuario(
                usuario);
    }

    @PutMapping("/api/usuarios/{id}")
    public Usuario actualizarUsuario(
            @PathVariable Integer id,
            @RequestBody Usuario usuarioActualizado) {

        Usuario usuario =
                usuarioService.obtenerPorId(id);

        if (usuario == null) {
            return null;
        }

        usuario.setCodUsuario(usuarioActualizado.getCodUsuario());
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setApellido(usuarioActualizado.getApellido());
        usuario.setFechaNacimiento(usuarioActualizado.getFechaNacimiento());
        usuario.setTipoIdentificacion(usuarioActualizado.getTipoIdentificacion());
        usuario.setNumeroIdentificacion(usuarioActualizado.getNumeroIdentificacion());
        usuario.setCorreoElectronico(usuarioActualizado.getCorreoElectronico());
        usuario.setDireccion(usuarioActualizado.getDireccion());
        // usuario.setContrasena(usuarioActualizado.getContrasena());
        usuario.setEstado(usuarioActualizado.getEstado());
        usuario.setFotoPerfil(usuarioActualizado.getFotoPerfil());
        usuario.setRol(usuarioActualizado.getRol());
        usuario.setProfesion(usuarioActualizado.getProfesion());
        usuario.setEspecialidad(usuarioActualizado.getEspecialidad());

        return usuarioService.actualizarUsuario(
                usuario);
    }

    @PutMapping("/api/usuarios/{id}/inhabilitar")
    public Usuario inhabilitarUsuario(
            @PathVariable Integer id) {

        return usuarioService
                .inhabilitarUsuario(id);
    }
}
