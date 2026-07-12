package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.RegistroErrorRequest;
import com.ikernell.backend.dto.RegistroErrorResponse;
import com.ikernell.backend.entity.RegistroError;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        uses = {ActividadMapper.class, TipoErrorMapper.class, UsuarioMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RegistroErrorMapper {

    @Mapping(target = "idRegistroError", ignore = true)
    @Mapping(target = "actividad", ignore = true)
    @Mapping(target = "tipoError", ignore = true)
    @Mapping(target = "usuarioCreador", ignore = true)
    @Mapping(target = "fechaRegistro", ignore = true)
    RegistroError toEntity(RegistroErrorRequest request);

    RegistroErrorResponse toResponse(RegistroError registroError);
}
