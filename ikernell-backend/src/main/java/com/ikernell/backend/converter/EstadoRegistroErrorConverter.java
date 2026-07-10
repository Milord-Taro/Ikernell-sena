package com.ikernell.backend.converter;

import com.ikernell.backend.enums.EstadoRegistroError;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class EstadoRegistroErrorConverter implements AttributeConverter<EstadoRegistroError, String> {

    @Override
    public String convertToDatabaseColumn(EstadoRegistroError estado) {
        return estado == null ? null : estado.getValor();
    }

    @Override
    public EstadoRegistroError convertToEntityAttribute(String dbData) {
        return dbData == null ? null : EstadoRegistroError.desdeValor(dbData);
    }
}
