package com.ikernell.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtService {

    @Value("${jwt.secret}")
    private String secreto;

    @Value("${jwt.expiration-ms}")
    private long expiracionMs;

    private SecretKey obtenerClave() {
        return Keys.hmacShaKeyFor(secreto.getBytes());
    }

    public String generarToken(String correoElectronico, String codigoRol) {
        Date ahora = new Date();
        Date expiracion = new Date(ahora.getTime() + expiracionMs);

        return Jwts.builder()
                .subject(correoElectronico)
                .claim("rol", codigoRol)
                .issuedAt(ahora)
                .expiration(expiracion)
                .signWith(obtenerClave())
                .compact();
    }

    public String extraerCorreo(String token) {
        return extraerClaim(token, Claims::getSubject);
    }

    public boolean esTokenValido(String token, String correoElectronico) {
        String correoDelToken = extraerCorreo(token);
        return correoDelToken.equals(correoElectronico) && !esTokenExpirado(token);
    }

    public long getExpiracionMs() {
        return expiracionMs;
    }

    private boolean esTokenExpirado(String token) {
        return extraerClaim(token, Claims::getExpiration).before(new Date());
    }

    private <T> T extraerClaim(String token, Function<Claims, T> resolver) {
        Claims claims = Jwts.parser()
                .verifyWith(obtenerClave())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return resolver.apply(claims);
    }
}
