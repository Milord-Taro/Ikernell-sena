package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.TipoErrorRequest;
import com.ikernell.backend.dto.TipoErrorResponse;
import com.ikernell.backend.entity.TipoError;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TipoErrorMapper {

    TipoError toEntity(TipoErrorRequest request);

    TipoErrorResponse toResponse(TipoError tipoError);

    void actualizarEntidadDesdeRequest(TipoErrorRequest request, @MappingTarget TipoError tipoError);
}
