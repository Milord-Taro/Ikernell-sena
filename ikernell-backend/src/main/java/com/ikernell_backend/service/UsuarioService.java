package com.ikernell_backend.service;

import com.ikernell_backend.entity.Usuario;
import com.ikernell_backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

        if (usuario.getFechaNacimiento() == null) {
            throw new RuntimeException(
                    "La fecha de nacimiento es obligatoria");
        }

        if (usuario.getFechaNacimiento()
                .isAfter(java.time.LocalDate.now())) {

            throw new RuntimeException(
                    "La fecha de nacimiento no puede ser futura");
        }

        if (usuarioRepository.existsByCorreoElectronico(
                usuario.getCorreoElectronico())) {

            throw new RuntimeException(
                    "El correo ya existe");
        }

        if (usuario.getNombre() == null ||
                usuario.getNombre().trim().isEmpty()) {

            throw new RuntimeException(
                    "El nombre es obligatorio");
        }

        if (usuario.getApellido() == null ||
                usuario.getApellido().trim().isEmpty()) {

            throw new RuntimeException(
                    "El apellido es obligatorio");
        }

        if (usuario.getCorreoElectronico() == null ||
                usuario.getCorreoElectronico().trim().isEmpty()) {

            throw new RuntimeException(
                    "El correo es obligatorio");
        }

        Usuario ultimoUsuario =
                usuarioRepository.findTopByOrderByIdUsuarioDesc();

        int siguienteNumero = 1;

        if (ultimoUsuario != null) {
            siguienteNumero =
                    ultimoUsuario.getIdUsuario() + 1;
        }

        usuario.setCodUsuario(
                String.format("USR-%03d", siguienteNumero)
        );

        usuario.setEstado(true);

        usuario.setContrasena(
                encoder.encode(usuario.getContrasena())
        );

        return usuarioRepository.save(usuario);
    }

    public Usuario actualizarUsuario(Usuario usuario) {

        if (usuario.getFechaNacimiento() == null) {
            throw new RuntimeException(
                    "La fecha de nacimiento es obligatoria");
        }

        if (usuario.getFechaNacimiento()
                .isAfter(java.time.LocalDate.now())) {

            throw new RuntimeException(
                    "La fecha de nacimiento no puede ser futura");
        }

        if (usuario.getApellido() == null ||
                usuario.getApellido().trim().isEmpty()) {

            throw new RuntimeException(
                    "El apellido es obligatorio");
        }

        if (usuario.getCorreoElectronico() == null ||
                usuario.getCorreoElectronico().trim().isEmpty()) {

            throw new RuntimeException(
                    "El correo es obligatorio");
        }

        return usuarioRepository.save(usuario);
    }

    public Usuario inhabilitarUsuario(Integer id) {

        Usuario usuario =
                usuarioRepository.findById(id)
                        .orElse(null);

        if (usuario == null) {
            return null;
        }

        if(usuario.getRol().getNombreRol()
                .equalsIgnoreCase("Coordinador")) {

            throw new RuntimeException(
                    "No se puede inhabilitar un coordinador");
        }
        usuario.setEstado(false);

        return usuarioRepository.save(usuario);
    }

    public Usuario habilitarUsuario(Integer id) {

        Usuario usuario =
                usuarioRepository.findById(id)
                        .orElse(null);

        if (usuario == null) {
            return null;
        }

        usuario.setEstado(true);

        return usuarioRepository.save(usuario);
    }

    public void cambiarContrasena(
            Integer id,
            String contrasenaActual,
            String contrasenaNueva) {

        Usuario usuario =
                usuarioRepository.findById(id)
                        .orElse(null);

        if (usuario == null) {
            throw new RuntimeException(
                    "Usuario no encontrado");
        }

        if (!encoder.matches(
                contrasenaActual,
                usuario.getContrasena())) {

            throw new RuntimeException(
                    "La contraseña actual es incorrecta");
        }

        usuario.setContrasena(
                encoder.encode(contrasenaNueva));

        usuarioRepository.save(usuario);
    }

    public Usuario login(
            String correo,
            String contrasena) {

        Usuario usuario =
                usuarioRepository.findByCorreoElectronico(correo);

        if (usuario == null) {
            return null;
        }

        if (encoder.matches(
                contrasena,
                usuario.getContrasena())) {

            return usuario;
        }

        return null;
    }

    private final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();
}


