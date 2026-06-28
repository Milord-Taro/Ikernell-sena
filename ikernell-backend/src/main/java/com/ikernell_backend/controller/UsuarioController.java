package com.ikernell_backend.controller;


import com.ikernell_backend.entity.Usuario;
import com.ikernell_backend.service.UsuarioService;
import com.ikernell_backend.dto.LoginResponse;
import com.ikernell_backend.dto.UsuarioRequest;
import com.ikernell_backend.dto.UsuarioMapper;
import com.ikernell_backend.dto.UsuarioResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.ikernell_backend.dto.LoginRequest;
import com.ikernell_backend.dto.CambiarContrasenaRequest;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/api/usuarios")
    public  List<UsuarioResponse> listarUsuarios(){
        return usuarioService.listarUsuarios()
                .stream()
                .map(UsuarioMapper::toResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/api/usuarios/{id}")
    public UsuarioResponse obtenerPorId(@PathVariable Integer id){
        return UsuarioMapper.toResponse(
                usuarioService.obtenerPorId(id));
    }

    @PostMapping("/api/usuarios")
    public UsuarioResponse crearUsuario(
            @RequestBody UsuarioRequest request) {

        return UsuarioMapper.toResponse(
                usuarioService.crearUsuario(
                        UsuarioMapper.toEntity(request)));
    }

    @PutMapping("/api/usuarios/{id}")
    public UsuarioResponse actualizarUsuario(
            @PathVariable Integer id,
            @RequestBody UsuarioRequest request) {

        Usuario usuario =
                usuarioService.obtenerPorId(id);

        UsuarioMapper.actualizarEntity(usuario, request);

        return UsuarioMapper.toResponse(
                usuarioService.actualizarUsuario(
                        usuario));
    }

    @PutMapping("/api/usuarios/{id}/inhabilitar")
    public UsuarioResponse inhabilitarUsuario(
            @PathVariable Integer id) {

        return UsuarioMapper.toResponse(
                usuarioService
                        .inhabilitarUsuario(id));
    }

    @PutMapping("/api/usuarios/{id}/habilitar")
    public UsuarioResponse habilitarUsuario(
            @PathVariable Integer id) {

        return UsuarioMapper.toResponse(
                usuarioService
                        .habilitarUsuario(id));
    }

    @PostMapping("/api/auth/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        return UsuarioMapper.toLoginResponse(
                usuarioService.login(
                        request.getCorreo(),
                        request.getContrasena()));
    }
    @PutMapping("/api/usuarios/{id}/contrasena")
    public void cambiarContrasena(

            @PathVariable Integer id,

            @RequestBody CambiarContrasenaRequest request) {

        usuarioService.cambiarContrasena(

                id,

                request.getContrasenaActual(),

                request.getContrasenaNueva());
    }

}
