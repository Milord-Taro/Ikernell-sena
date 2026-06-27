package com.ikernell_backend.service;

import com.ikernell_backend.entity.Usuario;
import com.ikernell_backend.entity.Rol;
import com.ikernell_backend.exception.ResourceNotFoundException;
import com.ikernell_backend.repository.RolRepository;
import com.ikernell_backend.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
    }

    public List<Usuario> listarUsuarios(){
        return usuarioRepository.findAll();
    }

    public Usuario obtenerPorId(Integer id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuario no encontrado"));
    }

    public Usuario crearUsuario(Usuario usuario) {
        validarRolAsignable(usuario);

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
        validarRolAsignable(usuario);

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
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Usuario no encontrado"));

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
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Usuario no encontrado"));

        usuario.setEstado(true);

        return usuarioRepository.save(usuario);
    }

    public void cambiarContrasena(
            Integer id,
            String contrasenaActual,
            String contrasenaNueva) {

        Usuario usuario =
                usuarioRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Usuario no encontrado"));

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
                usuarioRepository
                        .findOptionalByCorreoElectronico(correo)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.UNAUTHORIZED,
                                        "Correo o contraseña incorrectos"));

        if (encoder.matches(
                contrasena,
                usuario.getContrasena())) {

            return usuario;
        }

        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Correo o contraseña incorrectos");
    }

    private final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    private void validarRolAsignable(Usuario usuario) {

        if (usuario.getRol() == null ||
                usuario.getRol().getIdRol() == null) {

            throw new RuntimeException(
                    "El rol es obligatorio");
        }

        Rol rol =
                rolRepository.findById(
                        usuario.getRol().getIdRol())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "El rol no existe"));

        if (rol.getNombreRol() != null &&
                rol.getNombreRol()
                        .equalsIgnoreCase("Coordinador")) {

            throw new RuntimeException(
                    "No se puede asignar el rol Coordinador");
        }

        usuario.setRol(rol);
    }
}
