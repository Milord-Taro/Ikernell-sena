package com.ikernell.backend.mapper;

import com.ikernell.backend.dto.TrazabilidadResponse;
import com.ikernell.backend.entity.Trazabilidad;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {UsuarioMapper.class})
public interface TrazabilidadMapper {

    TrazabilidadResponse toResponse(Trazabilidad trazabilidad);
}
