package com.ikernell.backend.report;

import com.ikernell.backend.entity.Interrupcion;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.repository.InterrupcionRepository;
import com.ikernell.backend.repository.ProyectoRepository;
import lombok.RequiredArgsConstructor;
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
 * Segundo reporte pedido por el caso de estudio original ("generar
 * reportes: de interrupciones del proyecto y de reportes de actividades
 * por proyecto"). Mismo patrón exacto que ReporteActividadesService --
 * un record de fila propio + 4 métodos privados de generación.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReporteInterrupcionesService {

    private final InterrupcionRepository interrupcionRepository;
    private final ProyectoRepository proyectoRepository;

    public byte[] generar(Integer idProyecto, FormatoReporte formato) {
        proyectoRepository.findById(idProyecto)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un proyecto con id " + idProyecto + "."));

        List<ReporteInterrupcionFila> filas = interrupcionRepository
                .findByActividad_Etapa_Proyecto_IdProyecto(idProyecto)
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
        return "reporte-interrupciones-proyecto-" + idProyecto + "." + extension;
    }

    public String contentType(FormatoReporte formato) {
        return switch (formato) {
            case TXT -> "text/plain";
            case CSV -> "text/csv";
            case PDF -> "application/pdf";
            case EXCEL -> "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        };
    }

    private ReporteInterrupcionFila aFila(Interrupcion interrupcion) {
        return new ReporteInterrupcionFila(
                interrupcion.getCodigoInterrupcion(),
                interrupcion.getActividad().getEtapa().getNombreEtapa(),
                interrupcion.getActividad().getNombreActividad(),
                interrupcion.getTipoInterrupcion().getNombreTipoInterrupcion(),
                interrupcion.getMotivo(),
                interrupcion.getDuracionMinutos(),
                interrupcion.getFechaRegistro());
    }

    // ================= TXT =================

    private byte[] generarTxt(List<ReporteInterrupcionFila> filas) {
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("%-12s%-18s%-22s%-20s%-30s%-9s%-19s%n",
                "Codigo", "Etapa", "Actividad", "Tipo", "Motivo", "Min.", "Registrado"));
        sb.append("-".repeat(130)).append(System.lineSeparator());

        for (ReporteInterrupcionFila fila : filas) {
            sb.append(String.format("%-12s%-18s%-22s%-20s%-30s%-9d%-19s%n",
                    fila.codigoInterrupcion(), fila.etapa(), fila.actividad(),
                    fila.tipoInterrupcion(), fila.motivo(), fila.duracionMinutos(),
                    fila.fechaRegistro()));
        }

        return sb.toString().getBytes(StandardCharsets.UTF_8);
    }

    // ================= CSV =================

    private byte[] generarCsv(List<ReporteInterrupcionFila> filas) {
        StringBuilder sb = new StringBuilder();
        sb.append("codigoInterrupcion,etapa,actividad,tipoInterrupcion,motivo,duracionMinutos,fechaRegistro")
                .append(System.lineSeparator());

        for (ReporteInterrupcionFila fila : filas) {
            sb.append(csvEscape(fila.codigoInterrupcion())).append(',')
                    .append(csvEscape(fila.etapa())).append(',')
                    .append(csvEscape(fila.actividad())).append(',')
                    .append(csvEscape(fila.tipoInterrupcion())).append(',')
                    .append(csvEscape(fila.motivo())).append(',')
                    .append(fila.duracionMinutos()).append(',')
                    .append(fila.fechaRegistro())
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

    private byte[] generarExcel(List<ReporteInterrupcionFila> filas) {
        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream salida = new ByteArrayOutputStream()) {

            Sheet hoja = workbook.createSheet("Interrupciones");

            Row encabezado = hoja.createRow(0);
            String[] columnas = {"Código", "Etapa", "Actividad", "Tipo", "Motivo", "Duración (min)", "Registrado"};
            for (int i = 0; i < columnas.length; i++) {
                encabezado.createCell(i).setCellValue(columnas[i]);
            }

            int numeroFila = 1;
            for (ReporteInterrupcionFila fila : filas) {
                Row filaExcel = hoja.createRow(numeroFila++);
                filaExcel.createCell(0).setCellValue(fila.codigoInterrupcion());
                filaExcel.createCell(1).setCellValue(fila.etapa());
                filaExcel.createCell(2).setCellValue(fila.actividad());
                filaExcel.createCell(3).setCellValue(fila.tipoInterrupcion());
                filaExcel.createCell(4).setCellValue(fila.motivo());
                filaExcel.createCell(5).setCellValue(fila.duracionMinutos());
                filaExcel.createCell(6).setCellValue(fila.fechaRegistro().toString());
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

    private byte[] generarPdf(List<ReporteInterrupcionFila> filas) {
        try {
            PdfTablaWriter escritor = new PdfTablaWriter();
            escritor.titulo("Reporte de interrupciones por proyecto");

            if (filas.isEmpty()) {
                escritor.sinDatos("No hay interrupciones registradas.");
            } else {
                escritor.tabla(
                        new String[]{"Código", "Etapa", "Actividad", "Tipo", "Motivo", "Min.", "Registrado"},
                        new float[]{1.2f, 1.3f, 1.5f, 1.3f, 1.8f, 0.6f, 1.3f},
                        filas.stream()
                                .map(fila -> new String[]{
                                        fila.codigoInterrupcion(),
                                        fila.etapa(),
                                        fila.actividad(),
                                        fila.tipoInterrupcion(),
                                        fila.motivo(),
                                        String.valueOf(fila.duracionMinutos()),
                                        fila.fechaRegistro().toString(),
                                })
                                .toList());
            }

            return escritor.exportar();
        } catch (IOException ex) {
            throw new UncheckedIOException("Error generando el archivo PDF del reporte.", ex);
        }
    }
}
