package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.AsignacionProyectoRequest;
import com.ikernell.backend.dto.AsignacionProyectoResponse;
import com.ikernell.backend.entity.AsignacionProyecto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        uses = {UsuarioMapper.class, ProyectoMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AsignacionProyectoMapper {

    @Mapping(target = "idAsignacionProyecto", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "proyecto", ignore = true)
    @Mapping(target = "fechaAsignacion", ignore = true)
    @Mapping(target = "fechaDesvinculacion", ignore = true)
    AsignacionProyecto toEntity(AsignacionProyectoRequest request);

    AsignacionProyectoResponse toResponse(AsignacionProyecto asignacionProyecto);
}
