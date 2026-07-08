package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.NotificacionRequest;
import com.ikernell.backend.dto.NotificacionResponse;
import com.ikernell.backend.entity.Notificacion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface NotificacionMapper {

    @Mapping(target = "idNotificacion", ignore = true)
    @Mapping(target = "codigoNotificacion", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "leida", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "fechaLectura", ignore = true)
    Notificacion toEntity(NotificacionRequest request);

    NotificacionResponse toResponse(Notificacion notificacion);
}
