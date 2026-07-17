package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.UsuarioRequest;
import com.ikernell.backend.dto.UsuarioResponse;
import com.ikernell.backend.dto.UsuarioResumenResponse;
import com.ikernell.backend.dto.UsuarioUpdateRequest;
import com.ikernell.backend.entity.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

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

    // CORREGIDO: versión reducida para todo contexto donde el usuario va
    // embebido dentro de otro recurso -- ver UsuarioResumenResponse.
    UsuarioResumenResponse toResumen(Usuario usuario);

    @Mapping(target = "idUsuario", ignore = true)
    @Mapping(target = "correoElectronico", ignore = true)
    @Mapping(target = "hashContrasena", ignore = true)
    @Mapping(target = "rol", ignore = true)
    @Mapping(target = "profesion", ignore = true)
    @Mapping(target = "especialidad", ignore = true)
    @Mapping(target = "activo", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    void actualizarEntidadDesdeRequest(UsuarioUpdateRequest request, @MappingTarget Usuario usuario);
}