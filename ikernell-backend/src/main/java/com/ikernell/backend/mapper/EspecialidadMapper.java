package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.EspecialidadRequest;
import com.ikernell.backend.dto.EspecialidadResponse;
import com.ikernell.backend.entity.Especialidad;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface EspecialidadMapper {

    Especialidad toEntity(EspecialidadRequest request);

    EspecialidadResponse toResponse(Especialidad especialidad);

    void actualizarEntidadDesdeRequest(EspecialidadRequest request, @MappingTarget Especialidad especialidad);
}
