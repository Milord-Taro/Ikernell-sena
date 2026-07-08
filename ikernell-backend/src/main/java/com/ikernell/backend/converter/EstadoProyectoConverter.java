package com.ikernell.backend.converter;

import com.ikernell.backend.enums.EstadoProyecto;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class EstadoProyectoConverter implements AttributeConverter<EstadoProyecto, String> {

    @Override
    public String convertToDatabaseColumn(EstadoProyecto estado) {
        return estado == null ? null : estado.getValor();
    }

    @Override
    public EstadoProyecto convertToEntityAttribute(String dbData) {
        return dbData == null ? null : EstadoProyecto.desdeValor(dbData);
    }
}