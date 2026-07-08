package com.ikernell.backend.converter;

import com.ikernell.backend.enums.TipoNotificacion;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class TipoNotificacionConverter implements AttributeConverter<TipoNotificacion, String> {

    @Override
    public String convertToDatabaseColumn(TipoNotificacion tipo) {
        return tipo == null ? null : tipo.getValor();
    }

    @Override
    public TipoNotificacion convertToEntityAttribute(String dbData) {
        return dbData == null ? null : TipoNotificacion.desdeValor(dbData);
    }
}
