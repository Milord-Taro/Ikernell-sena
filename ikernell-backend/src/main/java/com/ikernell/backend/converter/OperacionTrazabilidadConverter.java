package com.ikernell.backend.converter;

import com.ikernell.backend.enums.OperacionTrazabilidad;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class OperacionTrazabilidadConverter implements AttributeConverter<OperacionTrazabilidad, String> {

    @Override
    public String convertToDatabaseColumn(OperacionTrazabilidad operacion) {
        return operacion == null ? null : operacion.getValor();
    }

    @Override
    public OperacionTrazabilidad convertToEntityAttribute(String dbData) {
        return dbData == null ? null : OperacionTrazabilidad.desdeValor(dbData);
    }
}
