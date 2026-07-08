package com.ikernell.backend.converter;

import com.ikernell.backend.enums.EstadoActividad;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class EstadoActividadConverter implements AttributeConverter<EstadoActividad, String> {

    @Override
    public String convertToDatabaseColumn(EstadoActividad estado) {
        return estado == null ? null : estado.getValor();
    }

    @Override
    public EstadoActividad convertToEntityAttribute(String dbData) {
        return dbData == null ? null : EstadoActividad.desdeValor(dbData);
    }
}
