package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.UsuarioRequest;
import com.ikernell.backend.dto.UsuarioResponse;
import com.ikernell.backend.entity.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

/**
 * "uses" permite que MapStruct reutilice RolMapper, ProfesionMapper y
 * EspecialidadMapper automáticamente cuando encuentra que usuario.getRol(),
 * usuario.getProfesion() y usuario.getEspecialidad() (entidades) deben
 * convertirse a RolResponse/ProfesionResponse/EspecialidadResponse dentro
 * de UsuarioResponse.
 *
 * Los campos idRol/idProfesion/idEspecialidad (Integer) y contrasena del
 * Request NO se mapean automáticamente: eso lo resuelve UsuarioService,
 * que busca las entidades relacionadas y hashea la contraseña.
 */
@Mapper(
        componentModel = "spring",
        uses = {RolMapper.class, ProfesionMapper.class, EspecialidadMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UsuarioMapper {

    @Mapping(target = "idUsuario", ignore = true)
    @Mapping(target = "hashContrasena", ignore = true)
    @Mapping(target = "rol", ignore = true)
    @Mapping(target = "profesion", ignore = true)
    @Mapping(target = "especialidad", ignore = true)
    @Mapping(target = "activo", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    Usuario toEntity(UsuarioRequest request);

    UsuarioResponse toResponse(Usuario usuario);

    @Mapping(target = "idUsuario", ignore = true)
    @Mapping(target = "hashContrasena", ignore = true)
    @Mapping(target = "rol", ignore = true)
    @Mapping(target = "profesion", ignore = true)
    @Mapping(target = "especialidad", ignore = true)
    @Mapping(target = "activo", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    void actualizarEntidadDesdeRequest(UsuarioRequest request, @MappingTarget Usuario usuario);
}
