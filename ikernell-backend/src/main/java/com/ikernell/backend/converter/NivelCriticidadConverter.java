package com.ikernell.backend.converter;

import com.ikernell.backend.enums.NivelCriticidad;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class NivelCriticidadConverter implements AttributeConverter<NivelCriticidad, String> {

    @Override
    public String convertToDatabaseColumn(NivelCriticidad nivel) {
        return nivel == null ? null : nivel.getValor();
    }

    @Override
    public NivelCriticidad convertToEntityAttribute(String dbData) {
        return dbData == null ? null : NivelCriticidad.desdeValor(dbData);
    }
}
