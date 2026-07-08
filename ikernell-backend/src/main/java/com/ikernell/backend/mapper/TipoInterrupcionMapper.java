package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.TipoInterrupcionRequest;
import com.ikernell.backend.dto.TipoInterrupcionResponse;
import com.ikernell.backend.entity.TipoInterrupcion;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TipoInterrupcionMapper {

    TipoInterrupcion toEntity(TipoInterrupcionRequest request);

    TipoInterrupcionResponse toResponse(TipoInterrupcion tipoInterrupcion);

    void actualizarEntidadDesdeRequest(TipoInterrupcionRequest request, @MappingTarget TipoInterrupcion tipoInterrupcion);
}
