package com.ikernell.backend.security;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

/**
 * Agrupa la configuración de JWT (antes dispersa en @Value sueltos dentro de
 * JwtService). Con @Validated, la app FALLA AL ARRANCAR si falta el secreto o
 * la expiración es inválida -- en prod ambos vienen por variable de entorno sin
 * default, así que este chequeo evita arrancar con una config incompleta.
 *
 * Binding relajado: `jwt.expiration-ms` -> expirationMs.
 */
@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    /** Secreto HMAC para firmar/verificar los tokens. */
    @NotBlank
    private String secret;

    /** Vigencia del token en milisegundos. */
    @Positive
    private long expirationMs;
}
