package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.ProyectoRequest;
import com.ikernell.backend.dto.ProyectoResponse;
import com.ikernell.backend.entity.Proyecto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProyectoMapper {

    @Mapping(target = "idProyecto", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    Proyecto toEntity(ProyectoRequest request);

    ProyectoResponse toResponse(Proyecto proyecto);

    @Mapping(target = "idProyecto", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    void actualizarEntidadDesdeRequest(ProyectoRequest request, @MappingTarget Proyecto proyecto);
}
