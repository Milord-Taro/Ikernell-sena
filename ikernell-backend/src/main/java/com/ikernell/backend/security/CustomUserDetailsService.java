    package com.ikernell.backend.security;

    import com.ikernell.backend.entity.Usuario;
    import com.ikernell.backend.repository.UsuarioRepository;
    import lombok.RequiredArgsConstructor;
    import org.springframework.security.core.userdetails.User;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.core.userdetails.UsernameNotFoundException;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;

    @Service
    @RequiredArgsConstructor
    public class CustomUserDetailsService implements UserDetailsService {

        private final UsuarioRepository usuarioRepository;

        /**
         * @Transactional aquí es importante: usuario.getRol() es una relación LAZY,
         * y sin una transacción abierta durante el mapeo, Hibernate lanzaría
         * LazyInitializationException al intentar leerla.
         */
        @Override
        @Transactional(readOnly = true)
        public UserDetails loadUserByUsername(String correoElectronico) throws UsernameNotFoundException {
            Usuario usuario = usuarioRepository.findByCorreoElectronico(correoElectronico)
                    .orElseThrow(() -> new UsernameNotFoundException(
                            "No existe un usuario con el correo '" + correoElectronico + "'."));

            return User.builder()
                    .username(usuario.getCorreoElectronico())
                    .password(usuario.getHashContrasena())
                    .disabled(!usuario.getActivo())
                    .authorities("ROLE_" + usuario.getRol().getCodigoRol())
                    .build();
        }
    }
