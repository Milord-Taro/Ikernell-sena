package com.ikernell.backend.util;

import java.util.List;
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

    public static int siguienteSecuencia(List<String> codigosExistentes) {
        int maximo = 0;
        for (String codigo : codigosExistentes) {
            Matcher m = SUFIJO_NUMERICO.matcher(codigo);
            if (m.find()) {
                maximo = Math.max(maximo, Integer.parseInt(m.group(1)));
            }
        }
        return maximo + 1;
    }

    public static String conCeros(int numero, int digitos) {
        String texto = String.valueOf(numero);
        return texto.length() >= digitos ? texto : "0".repeat(digitos - texto.length()) + texto;
    }
}
