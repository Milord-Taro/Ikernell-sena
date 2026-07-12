package com.ikernell.backend.audit;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

/**
 * ObjectMapper compartido para serializar los snapshots que los distintos
 * *Service pasan como "detalle" a TrazabilidadService.registrar(...).
 *
 * No es un bean de Spring a propósito: en este proyecto (Spring Boot 4.1)
 * el ObjectMapper que Spring gestiona es Jackson 3
 * (tools.jackson.databind.ObjectMapper, vía spring-boot-starter-jackson),
 * mientras que este código usa la API de Jackson 2
 * (com.fasterxml.jackson.databind), que solo está en el classpath como
 * dependencia transitiva de jjwt-jackson. Inyectar un ObjectMapper aquí
 * fallaría en runtime porque no existe un bean de ese tipo -- de ahí que
 * se construya una única instancia compartida a mano.
 */
public final class DetalleObjectMapper {

    public static final ObjectMapper INSTANCE = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    private DetalleObjectMapper() {
    }
}
