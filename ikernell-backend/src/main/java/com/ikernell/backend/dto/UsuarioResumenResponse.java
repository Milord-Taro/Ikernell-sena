package com.ikernell.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * CORREGIDO: versión reducida de UsuarioResponse para todo contexto donde
 * se embebe un usuario DENTRO de otro recurso (líder de un proyecto,
 * responsable de una actividad, quien creó un error/interrupción, miembro
 * de un equipo, quien ejecutó un evento de auditoría...). Antes esos
 * contextos incluían el UsuarioResponse completo -- con
 * numeroIdentificacion y fechaNacimiento -- y la mayoría de esos endpoints
 * de lectura están abiertos a cualquier autenticado (no solo
 * Coordinador/Líder), así que un Desarrollador podía recolectar la cédula
 * y fecha de nacimiento de cualquier compañero simplemente listando
 * proyectos, actividades o errores. Ningún componente del frontend lee
 * esos dos campos fuera de las pantallas de gestión de usuarios
 * (Coordinador/Líder, que sí usan UsuarioResponse completo vía
 * /api/usuarios). Ver política de visibilidad en AGENTS.md.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioResumenResponse {

    private Integer idUsuario;
    private String codigoUsuario;
    private String nombres;
    private String apellidos;
    private String correoElectronico;
    private RolResponse rol;
}
