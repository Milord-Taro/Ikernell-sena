package com.ikernell.backend.report;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * Dibuja reportes PDF como tablas con bordes y encabezado resaltado, con
 * paginación automática -- antes cada reporte (ReporteActividadesService /
 * ReporteInterrupcionesService) imprimía texto plano de ancho fijo en una
 * única página A4 sin paginar, así que una lista larga simplemente se
 * cortaba fuera del margen inferior sin aviso.
 */
public final class PdfTablaWriter {

    private static final float MARGEN = 40;
    private static final float ALTO_FILA = 16;
    private static final float ALTO_PAGINA = PDRectangle.A4.getHeight();
    private static final float ANCHO_PAGINA = PDRectangle.A4.getWidth();
    private static final PDFont FUENTE = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
    private static final PDFont FUENTE_NEGRITA = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);

    private final PDDocument documento;
    private PDPageContentStream contenido;
    private float y;

    public PdfTablaWriter() throws IOException {
        documento = new PDDocument();
        abrirPagina();
    }

    private void abrirPagina() throws IOException {
        PDPage pagina = new PDPage(PDRectangle.A4);
        documento.addPage(pagina);
        contenido = new PDPageContentStream(documento, pagina);
        y = ALTO_PAGINA - MARGEN;
    }

    private void asegurarEspacio(float alto) throws IOException {
        if (y - alto < MARGEN) {
            contenido.close();
            abrirPagina();
        }
    }

    public void titulo(String texto) throws IOException {
        asegurarEspacio(26);
        escribirTexto(MARGEN, y, texto, FUENTE_NEGRITA, 15);
        y -= 26;
    }

    public void subtitulo(String texto) throws IOException {
        asegurarEspacio(20);
        escribirTexto(MARGEN, y, texto, FUENTE_NEGRITA, 11);
        y -= 20;
    }

    public void sinDatos(String mensaje) throws IOException {
        asegurarEspacio(ALTO_FILA + 8);
        escribirTexto(MARGEN, y, mensaje, FUENTE, 9);
        y -= ALTO_FILA + 12;
    }

    /** anchosRelativos: proporción de cada columna (no necesitan sumar 1). */
    public void tabla(String[] encabezados, float[] anchosRelativos, List<String[]> filas) throws IOException {
        float anchoTotal = ANCHO_PAGINA - 2 * MARGEN;
        float sumaRelativa = 0;
        for (float a : anchosRelativos) {
            sumaRelativa += a;
        }
        float[] anchosPx = new float[anchosRelativos.length];
        for (int i = 0; i < anchosRelativos.length; i++) {
            anchosPx[i] = anchosRelativos[i] / sumaRelativa * anchoTotal;
        }

        dibujarFila(encabezados, anchosPx, true);
        for (String[] fila : filas) {
            dibujarFila(fila, anchosPx, false);
        }
        y -= 14;
    }

    private void dibujarFila(String[] valores, float[] anchosPx, boolean esEncabezado) throws IOException {
        asegurarEspacio(ALTO_FILA);

        if (esEncabezado) {
            contenido.setNonStrokingColor(new Color(235, 235, 235));
            contenido.addRect(MARGEN, y - ALTO_FILA + 4, sumar(anchosPx), ALTO_FILA);
            contenido.fill();
            contenido.setNonStrokingColor(Color.BLACK);
        }

        float x = MARGEN;
        for (int i = 0; i < valores.length; i++) {
            escribirTexto(x + 3, y - ALTO_FILA + 8, recortar(valores[i], anchosPx[i]),
                    esEncabezado ? FUENTE_NEGRITA : FUENTE, 8);
            x += anchosPx[i];
        }

        contenido.setStrokingColor(new Color(210, 210, 210));
        contenido.moveTo(MARGEN, y - ALTO_FILA + 4);
        contenido.lineTo(MARGEN + sumar(anchosPx), y - ALTO_FILA + 4);
        contenido.stroke();

        y -= ALTO_FILA;
    }

    private float sumar(float[] valores) {
        float total = 0;
        for (float v : valores) {
            total += v;
        }
        return total;
    }

    private String recortar(String valor, float anchoDisponiblePx) {
        if (valor == null) {
            return "";
        }
        int maxCaracteres = Math.max(3, (int) (anchoDisponiblePx / 4.3));
        return valor.length() > maxCaracteres ? valor.substring(0, maxCaracteres - 1) + "…" : valor;
    }

    private void escribirTexto(float x, float yPos, String texto, PDFont fuente, float tamano) throws IOException {
        contenido.beginText();
        contenido.setFont(fuente, tamano);
        contenido.newLineAtOffset(x, yPos);
        contenido.showText(texto == null ? "" : texto);
        contenido.endText();
    }

    public byte[] exportar() throws IOException {
        contenido.close();
        ByteArrayOutputStream salida = new ByteArrayOutputStream();
        documento.save(salida);
        documento.close();
        return salida.toByteArray();
    }
}
