package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.ActividadRequest;
import com.ikernell.backend.dto.ActividadResponse;
import com.ikernell.backend.entity.Actividad;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        uses = {EtapaMapper.class, UsuarioMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ActividadMapper {

    @Mapping(target = "idActividad", ignore = true)
    @Mapping(target = "etapa", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    Actividad toEntity(ActividadRequest request);

    ActividadResponse toResponse(Actividad actividad);

    @Mapping(target = "idActividad", ignore = true)
    @Mapping(target = "etapa", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    void actualizarEntidadDesdeRequest(ActividadRequest request, @MappingTarget Actividad actividad);
}
