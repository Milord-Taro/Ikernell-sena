package com.ikernell.backend.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Calcula el siguiente número de secuencia dentro de un conjunto de códigos
 * ya existentes (todos compartiendo el mismo prefijo/padre), usado por
 * CodigoGeneradorService para construir códigos jerárquicos del tipo
 * "PRY-001-ETP-01". Se basa en el sufijo numérico final de cada código en
 * vez de un COUNT(*), para no reutilizar un número tras un borrado.
 */
public final class SecuenciaCodigoUtil {

    private static final Pattern SUFIJO_NUMERICO = Pattern.compile("(\\d+)$");

    private SecuenciaCodigoUtil() {
        // Clase de utilidad: no se instancia.
    }

    /**
     * Calcula la siguiente secuencia a partir de un único código: el MAX ya
     * calculado en SQL, en vez de cargar y recorrer todos los códigos
     * existentes en Java. Válido porque todos los códigos de un mismo
     * padre comparten prefijo y ancho fijo con ceros a la izquierda -- bajo
     * esas condiciones, el MAX() lexicográfico de SQL coincide con el MAX
     * numérico real, así que ordenar en la base de datos y traer solo un
     * valor es equivalente a comparar todos los códigos uno por uno en
     * Java, pero sin materializar N entidades para descartar N-1.
     */
    public static int siguienteSecuenciaDesdeMaximo(String codigoMaximo) {
        if (codigoMaximo == null) {
            return 1;
        }
        Matcher m = SUFIJO_NUMERICO.matcher(codigoMaximo);
        return m.find() ? Integer.parseInt(m.group(1)) + 1 : 1;
    }

    public static String conCeros(int numero, int digitos) {
        String texto = String.valueOf(numero);
        return texto.length() >= digitos ? texto : "0".repeat(digitos - texto.length()) + texto;
    }
}
