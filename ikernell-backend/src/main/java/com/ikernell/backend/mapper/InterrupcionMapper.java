package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.InterrupcionRequest;
import com.ikernell.backend.dto.InterrupcionResponse;
import com.ikernell.backend.entity.Interrupcion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        uses = {ActividadMapper.class, TipoInterrupcionMapper.class, UsuarioMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface InterrupcionMapper {

    @Mapping(target = "idInterrupcion", ignore = true)
    @Mapping(target = "actividad", ignore = true)
    @Mapping(target = "tipoInterrupcion", ignore = true)
    @Mapping(target = "usuarioCreador", ignore = true)
    @Mapping(target = "fechaRegistro", ignore = true)
    Interrupcion toEntity(InterrupcionRequest request);

    InterrupcionResponse toResponse(Interrupcion interrupcion);
}
