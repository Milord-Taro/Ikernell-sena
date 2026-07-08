package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.EtapaRequest;
import com.ikernell.backend.dto.EtapaResponse;
import com.ikernell.backend.entity.Etapa;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        uses = {ProyectoMapper.class},
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface EtapaMapper {

    @Mapping(target = "idEtapa", ignore = true)
    @Mapping(target = "proyecto", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    Etapa toEntity(EtapaRequest request);

    EtapaResponse toResponse(Etapa etapa);

    @Mapping(target = "idEtapa", ignore = true)
    @Mapping(target = "proyecto", ignore = true)
    @Mapping(target = "estado", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    void actualizarEntidadDesdeRequest(EtapaRequest request, @MappingTarget Etapa etapa);
}
