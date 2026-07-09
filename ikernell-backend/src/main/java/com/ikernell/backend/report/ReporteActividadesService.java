package com.ikernell.backend.report;

import com.ikernell.backend.entity.Actividad;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.repository.ActividadRepository;
import com.ikernell.backend.repository.ProyectoRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * Genera el "reporte de actividades por proyecto" (función descrita en el
 * caso de estudio original para el Líder de Proyecto) en 4 formatos.
 * Estructura pensada para que agregar un segundo reporte (ej. interrupciones
 * por proyecto) sea solo copiar este patrón: un record de fila propio del
 * reporte + 4 métodos privados de generación por formato.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReporteActividadesService {

    private final ActividadRepository actividadRepository;
    private final ProyectoRepository proyectoRepository;

    public byte[] generar(Integer idProyecto, FormatoReporte formato) {
        proyectoRepository.findById(idProyecto)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un proyecto con id " + idProyecto + "."));

        List<ReporteActividadFila> filas = actividadRepository.findByEtapa_Proyecto_IdProyecto(idProyecto)
                .stream()
                .map(this::aFila)
                .toList();

        return switch (formato) {
            case TXT -> generarTxt(filas);
            case CSV -> generarCsv(filas);
            case PDF -> generarPdf(filas);
            case EXCEL -> generarExcel(filas);
        };
    }

    public String nombreArchivo(Integer idProyecto, FormatoReporte formato) {
        String extension = switch (formato) {
            case TXT -> "txt";
            case CSV -> "csv";
            case PDF -> "pdf";
            case EXCEL -> "xlsx";
        };
        return "reporte-actividades-proyecto-" + idProyecto + "." + extension;
    }

    public String contentType(FormatoReporte formato) {
        return switch (formato) {
            case TXT -> "text/plain";
            case CSV -> "text/csv";
            case PDF -> "application/pdf";
            case EXCEL -> "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        };
    }

    private ReporteActividadFila aFila(Actividad actividad) {
        String desarrollador = actividad.getUsuario() != null
                ? actividad.getUsuario().getNombres() + " " + actividad.getUsuario().getApellidos()
                : "Sin asignar";

        return new ReporteActividadFila(
                actividad.getCodigoActividad(),
                actividad.getEtapa().getNombreEtapa(),
                desarrollador,
                actividad.getPrioridad(),
                actividad.getEstado(),
                actividad.getFechaInicio(),
                actividad.getFechaFin());
    }

    // ================= TXT =================

    private byte[] generarTxt(List<ReporteActividadFila> filas) {
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("%-12s%-20s%-25s%-11s%-24s%-12s%-12s%n",
                "Codigo", "Etapa", "Desarrollador", "Prioridad", "Estado", "Inicio", "Fin"));
        sb.append("-".repeat(116)).append(System.lineSeparator());

        for (ReporteActividadFila fila : filas) {
            sb.append(String.format("%-12s%-20s%-25s%-11s%-24s%-12s%-12s%n",
                    fila.codigoActividad(), fila.etapa(), fila.desarrollador(),
                    fila.prioridad().getValor(), fila.estado().getValor(),
                    fila.fechaInicio(), fila.fechaFin()));
        }

        return sb.toString().getBytes(StandardCharsets.UTF_8);
    }

    // ================= CSV =================

    private byte[] generarCsv(List<ReporteActividadFila> filas) {
        StringBuilder sb = new StringBuilder();
        sb.append("codigoActividad,etapa,desarrollador,prioridad,estado,fechaInicio,fechaFin")
                .append(System.lineSeparator());

        for (ReporteActividadFila fila : filas) {
            sb.append(csvEscape(fila.codigoActividad())).append(',')
                    .append(csvEscape(fila.etapa())).append(',')
                    .append(csvEscape(fila.desarrollador())).append(',')
                    .append(csvEscape(fila.prioridad().getValor())).append(',')
                    .append(csvEscape(fila.estado().getValor())).append(',')
                    .append(fila.fechaInicio()).append(',')
                    .append(fila.fechaFin())
                    .append(System.lineSeparator());
        }

        return sb.toString().getBytes(StandardCharsets.UTF_8);
    }

    private String csvEscape(String valor) {
        if (valor == null) {
            return "";
        }
        if (valor.contains(",") || valor.contains("\"") || valor.contains("\n")) {
            return "\"" + valor.replace("\"", "\"\"") + "\"";
        }
        return valor;
    }

    // ================= EXCEL =================

    private byte[] generarExcel(List<ReporteActividadFila> filas) {
        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream salida = new ByteArrayOutputStream()) {

            Sheet hoja = workbook.createSheet("Actividades");

            Row encabezado = hoja.createRow(0);
            String[] columnas = {"Código", "Etapa", "Desarrollador", "Prioridad", "Estado", "Fecha inicio", "Fecha fin"};
            for (int i = 0; i < columnas.length; i++) {
                encabezado.createCell(i).setCellValue(columnas[i]);
            }

            int numeroFila = 1;
            for (ReporteActividadFila fila : filas) {
                Row filaExcel = hoja.createRow(numeroFila++);
                filaExcel.createCell(0).setCellValue(fila.codigoActividad());
                filaExcel.createCell(1).setCellValue(fila.etapa());
                filaExcel.createCell(2).setCellValue(fila.desarrollador());
                filaExcel.createCell(3).setCellValue(fila.prioridad().getValor());
                filaExcel.createCell(4).setCellValue(fila.estado().getValor());
                filaExcel.createCell(5).setCellValue(fila.fechaInicio().toString());
                filaExcel.createCell(6).setCellValue(fila.fechaFin().toString());
            }

            for (int i = 0; i < columnas.length; i++) {
                hoja.autoSizeColumn(i);
            }

            workbook.write(salida);
            return salida.toByteArray();
        } catch (IOException ex) {
            throw new UncheckedIOException("Error generando el archivo Excel del reporte.", ex);
        }
    }

    // ================= PDF =================

    private byte[] generarPdf(List<ReporteActividadFila> filas) {
        try (PDDocument documento = new PDDocument();
             ByteArrayOutputStream salida = new ByteArrayOutputStream()) {

            PDPage pagina = new PDPage(PDRectangle.A4);
            documento.addPage(pagina);

            try (PDPageContentStream contenido = new PDPageContentStream(documento, pagina)) {
                float y = pagina.getMediaBox().getHeight() - 50;
                float margenIzquierdo = 40;

                contenido.beginText();
                contenido.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD), 14);
                contenido.newLineAtOffset(margenIzquierdo, y);
                contenido.showText("Reporte de actividades por proyecto");
                contenido.endText();

                y -= 30;
                contenido.beginText();
                contenido.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD), 9);
                contenido.newLineAtOffset(margenIzquierdo, y);
                contenido.showText(String.format("%-10s %-15s %-18s %-9s %-18s %-11s %-11s",
                        "Codigo", "Etapa", "Desarrollador", "Prioridad", "Estado", "Inicio", "Fin"));
                contenido.endText();

                contenido.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA), 9);
                for (ReporteActividadFila fila : filas) {
                    y -= 16;
                    contenido.beginText();
                    contenido.newLineAtOffset(margenIzquierdo, y);
                    contenido.showText(String.format("%-10s %-15s %-18s %-9s %-18s %-11s %-11s",
                            recortar(fila.codigoActividad(), 10),
                            recortar(fila.etapa(), 15),
                            recortar(fila.desarrollador(), 18),
                            recortar(fila.prioridad().getValor(), 9),
                            recortar(fila.estado().getValor(), 18),
                            fila.fechaInicio(),
                            fila.fechaFin()));
                    contenido.endText();
                }
            }

            documento.save(salida);
            return salida.toByteArray();
        } catch (IOException ex) {
            throw new UncheckedIOException("Error generando el archivo PDF del reporte.", ex);
        }
    }

    private String recortar(String valor, int maximo) {
        if (valor == null) {
            return "";
        }
        return valor.length() > maximo ? valor.substring(0, maximo) : valor;
    }
}
