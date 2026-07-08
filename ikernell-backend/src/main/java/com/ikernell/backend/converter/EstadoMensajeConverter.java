package com.ikernell.backend.converter;

import com.ikernell.backend.enums.EstadoMensaje;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class EstadoMensajeConverter implements AttributeConverter<EstadoMensaje, String> {

    @Override
    public String convertToDatabaseColumn(EstadoMensaje estado) {
        return estado == null ? null : estado.getValor();
    }

    @Override
    public EstadoMensaje convertToEntityAttribute(String dbData) {
        return dbData == null ? null : EstadoMensaje.desdeValor(dbData);
    }
}
