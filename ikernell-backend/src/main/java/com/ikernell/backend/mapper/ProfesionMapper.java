package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.ProfesionRequest;
import com.ikernell.backend.dto.ProfesionResponse;
import com.ikernell.backend.entity.Profesion;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProfesionMapper {

    Profesion toEntity(ProfesionRequest request);

    ProfesionResponse toResponse(Profesion profesion);

    void actualizarEntidadDesdeRequest(ProfesionRequest request, @MappingTarget Profesion profesion);
}
