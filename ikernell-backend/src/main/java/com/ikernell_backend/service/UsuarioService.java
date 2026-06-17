package com.ikernell_backend.service;

import com.ikernell_backend.entity.Usuario;
import com.ikernell_backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarUsuarios(){
        return usuarioRepository.findAll();
    }

    public Usuario obtenerPorId(Integer id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario crearUsuario(Usuario usuario) {

        usuario.setEstado(true);

        return usuarioRepository.save(usuario);
    }

    public Usuario actualizarUsuario(Usuario usuario) {

        return usuarioRepository.save(usuario);
    }

    public Usuario inhabilitarUsuario(Integer id) {

        Usuario usuario =
                usuarioRepository.findById(id)
                        .orElse(null);

        if (usuario == null) {
            return null;
        }

        usuario.setEstado(false);

        return usuarioRepository.save(usuario);
    }
}
