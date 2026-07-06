package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.RolRequest;
import com.ikernell.backend.dto.RolResponse;
import com.ikernell.backend.entity.Rol;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RolMapper {

    Rol toEntity(RolRequest request);

    RolResponse toResponse(Rol rol);

    void actualizarEntidadDesdeRequest(RolRequest request, @MappingTarget Rol rol);
}
