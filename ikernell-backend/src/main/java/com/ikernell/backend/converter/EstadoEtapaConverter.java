package com.ikernell.backend.converter;

import com.ikernell.backend.enums.EstadoEtapa;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class EstadoEtapaConverter implements AttributeConverter<EstadoEtapa, String> {

    @Override
    public String convertToDatabaseColumn(EstadoEtapa estado) {
        return estado == null ? null : estado.getValor();
    }

    @Override
    public EstadoEtapa convertToEntityAttribute(String dbData) {
        return dbData == null ? null : EstadoEtapa.desdeValor(dbData);
    }
}
