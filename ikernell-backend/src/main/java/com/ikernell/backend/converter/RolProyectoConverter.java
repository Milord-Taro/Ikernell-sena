package com.ikernell.backend.converter;

import com.ikernell.backend.enums.RolProyecto;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class RolProyectoConverter implements AttributeConverter<RolProyecto, String> {

    @Override
    public String convertToDatabaseColumn(RolProyecto rol) {
        return rol == null ? null : rol.getValor();
    }

    @Override
    public RolProyecto convertToEntityAttribute(String dbData) {
        return dbData == null ? null : RolProyecto.desdeValor(dbData);
    }
}
