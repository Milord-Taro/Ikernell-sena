package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.MensajeContactoRequest;
import com.ikernell.backend.dto.MensajeContactoResponse;
import com.ikernell.backend.entity.MensajeContacto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        uses = {UsuarioMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface MensajeContactoMapper {

    @Mapping(target = "idMensajeContacto", ignore = true)
    @Mapping(target = "codigoMensaje", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "respuesta", ignore = true)
    @Mapping(target = "responsable", ignore = true)
    @Mapping(target = "fechaEnvio", ignore = true)
    @Mapping(target = "fechaAtencion", ignore = true)
    MensajeContacto toEntity(MensajeContactoRequest request);

    MensajeContactoResponse toResponse(MensajeContacto mensajeContacto);
}
