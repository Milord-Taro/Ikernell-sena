package com.ikernell.backend.report;

import com.ikernell.backend.entity.Actividad;
import com.ikernell.backend.entity.Interrupcion;
import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.entity.RegistroError;
import com.ikernell.backend.enums.RolProyecto;
import com.ikernell.backend.repository.ActividadRepository;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.InterrupcionRepository;
import com.ikernell.backend.repository.ProyectoRepository;
import com.ikernell.backend.repository.RegistroErrorRepository;
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
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Reporte "macro": a diferencia de ReporteActividadesService /
 * ReporteInterrupcionesService (un proyecto puntual, para el Líder), este
 * consolida TODA la organización -- proyectos con su progreso y líder
 * vigente, actividades con desarrollador asignado, errores e
 * interrupciones -- en un solo archivo, pensado para compartir con un
 * tercero (ej. la empresa aliada) sin tener que exportar proyecto por
 * proyecto. Reservado a Coordinador (ver ReporteGeneralController).
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReporteGeneralService {

    private final ProyectoRepository proyectoRepository;
    private final ActividadRepository actividadRepository;
    private final RegistroErrorRepository registroErrorRepository;
    private final InterrupcionRepository interrupcionRepository;
    private final AsignacionProyectoRepository asignacionProyectoRepository;

    public byte[] generar(FormatoReporte formato) {
        List<ReporteGeneralProyectoFila> proyectos = construirProyectos();
        List<ReporteGeneralActividadFila> actividades = construirActividades();
        List<ReporteGeneralErrorFila> errores = construirErrores();
        List<ReporteGeneralInterrupcionFila> interrupciones = construirInterrupciones();

        return switch (formato) {
            case TXT -> generarTxt(proyectos, actividades, errores, interrupciones);
            case CSV -> generarCsv(proyectos, actividades, errores, interrupciones);
            case PDF -> generarPdf(proyectos, actividades, errores, interrupciones);
            case EXCEL -> generarExcel(proyectos, actividades, errores, interrupciones);
        };
    }

    public String nombreArchivo(FormatoReporte formato) {
        String extension = switch (formato) {
            case TXT -> "txt";
            case CSV -> "csv";
            case PDF -> "pdf";
            case EXCEL -> "xlsx";
        };
        return "reporte-general-" + LocalDate.now() + "." + extension;
    }

    public String contentType(FormatoReporte formato) {
        return switch (formato) {
            case TXT -> "text/plain";
            case CSV -> "text/csv";
            case PDF -> "application/pdf";
            case EXCEL -> "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        };
    }

    // ================= Construcción de filas =================

    private List<ReporteGeneralProyectoFila> construirProyectos() {
        Map<Integer, String> lideresPorProyecto = asignacionProyectoRepository
                .findByRolProyectoAndFechaDesvinculacionIsNull(RolProyecto.LIDER).stream()
                .collect(Collectors.toMap(
                        a -> a.getProyecto().getIdProyecto(),
                        a -> a.getUsuario().getNombres() + " " + a.getUsuario().getApellidos()));

        return proyectoRepository.findAllByOrderByIdProyectoAsc().stream()
                .map(p -> aFilaProyecto(p, lideresPorProyecto))
                .toList();
    }

    private ReporteGeneralProyectoFila aFilaProyecto(Proyecto p, Map<Integer, String> lideresPorProyecto) {
        return new ReporteGeneralProyectoFila(
                p.getCodigoProyecto(),
                p.getNombreProyecto(),
                p.getEstado(),
                lideresPorProyecto.getOrDefault(p.getIdProyecto(), "Sin asignar"),
                p.getFechaInicio(),
                p.getFechaFin());
    }

    private List<ReporteGeneralActividadFila> construirActividades() {
        return actividadRepository.findAllByOrderByIdActividadAsc().stream()
                .map(this::aFilaActividad)
                .toList();
    }

    private ReporteGeneralActividadFila aFilaActividad(Actividad a) {
        String desarrollador = a.getUsuario() != null
                ? a.getUsuario().getNombres() + " " + a.getUsuario().getApellidos()
                : "Sin asignar";

        return new ReporteGeneralActividadFila(
                a.getCodigoActividad(),
                a.getEtapa().getProyecto().getNombreProyecto(),
                a.getEtapa().getNombreEtapa(),
                desarrollador,
                a.getPrioridad(),
                a.getEstado(),
                a.getFechaInicio(),
                a.getFechaFin());
    }

    private List<ReporteGeneralErrorFila> construirErrores() {
        return registroErrorRepository.findAllByOrderByIdRegistroErrorAsc().stream()
                .map(this::aFilaError)
                .toList();
    }

    private ReporteGeneralErrorFila aFilaError(RegistroError r) {
        return new ReporteGeneralErrorFila(
                r.getCodigoRegistroError(),
                r.getActividad().getEtapa().getProyecto().getNombreProyecto(),
                r.getActividad().getNombreActividad(),
                r.getTipoError().getNombreTipoError(),
                r.getSeveridad(),
                r.getEstado(),
                r.getFechaRegistro());
    }

    private List<ReporteGeneralInterrupcionFila> construirInterrupciones() {
        return interrupcionRepository.findAllByOrderByIdInterrupcionAsc().stream()
                .map(this::aFilaInterrupcion)
                .toList();
    }

    private ReporteGeneralInterrupcionFila aFilaInterrupcion(Interrupcion i) {
        return new ReporteGeneralInterrupcionFila(
                i.getCodigoInterrupcion(),
                i.getActividad().getEtapa().getProyecto().getNombreProyecto(),
                i.getActividad().getNombreActividad(),
                i.getTipoInterrupcion().getNombreTipoInterrupcion(),
                i.getDuracionMinutos(),
                i.getFechaRegistro());
    }

    // ================= TXT =================

    private byte[] generarTxt(
            List<ReporteGeneralProyectoFila> proyectos,
            List<ReporteGeneralActividadFila> actividades,
            List<ReporteGeneralErrorFila> errores,
            List<ReporteGeneralInterrupcionFila> interrupciones) {

        StringBuilder sb = new StringBuilder();
        sb.append("REPORTE GENERAL -- ").append(LocalDate.now()).append(System.lineSeparator()).append(System.lineSeparator());

        sb.append("== Proyectos ==").append(System.lineSeparator());
        sb.append(String.format("%-10s%-30s%-16s%-25s%-12s%-12s%n",
                "Codigo", "Nombre", "Estado", "Lider", "Inicio", "Fin"));
        for (ReporteGeneralProyectoFila f : proyectos) {
            sb.append(String.format("%-10s%-30s%-16s%-25s%-12s%-12s%n",
                    f.codigoProyecto(), f.nombreProyecto(), f.estado().getValor(),
                    f.liderActual(), f.fechaInicio(), f.fechaFin()));
        }

        sb.append(System.lineSeparator()).append("== Actividades ==").append(System.lineSeparator());
        sb.append(String.format("%-22s%-20s%-20s%-22s%-11s%-24s%n",
                "Codigo", "Proyecto", "Etapa", "Desarrollador", "Prioridad", "Estado"));
        for (ReporteGeneralActividadFila f : actividades) {
            sb.append(String.format("%-22s%-20s%-20s%-22s%-11s%-24s%n",
                    f.codigoActividad(), f.proyecto(), f.etapa(), f.desarrollador(),
                    f.prioridad().getValor(), f.estado().getValor()));
        }

        sb.append(System.lineSeparator()).append("== Errores ==").append(System.lineSeparator());
        sb.append(String.format("%-28s%-20s%-22s%-18s%-11s%-14s%n",
                "Codigo", "Proyecto", "Actividad", "Tipo", "Severidad", "Estado"));
        for (ReporteGeneralErrorFila f : errores) {
            sb.append(String.format("%-28s%-20s%-22s%-18s%-11s%-14s%n",
                    f.codigoRegistroError(), f.proyecto(), f.actividad(), f.tipoError(),
                    f.severidad().getValor(), f.estado().getValor()));
        }

        sb.append(System.lineSeparator()).append("== Interrupciones ==").append(System.lineSeparator());
        sb.append(String.format("%-28s%-20s%-22s%-18s%-6s%n",
                "Codigo", "Proyecto", "Actividad", "Tipo", "Min."));
        for (ReporteGeneralInterrupcionFila f : interrupciones) {
            sb.append(String.format("%-28s%-20s%-22s%-18s%-6d%n",
                    f.codigoInterrupcion(), f.proyecto(), f.actividad(), f.tipoInterrupcion(),
                    f.duracionMinutos()));
        }

        return sb.toString().getBytes(StandardCharsets.UTF_8);
    }

    // ================= CSV =================

    private byte[] generarCsv(
            List<ReporteGeneralProyectoFila> proyectos,
            List<ReporteGeneralActividadFila> actividades,
            List<ReporteGeneralErrorFila> errores,
            List<ReporteGeneralInterrupcionFila> interrupciones) {

        StringBuilder sb = new StringBuilder();

        sb.append("# Proyectos").append(System.lineSeparator());
        sb.append("codigoProyecto,nombreProyecto,estado,liderActual,fechaInicio,fechaFin").append(System.lineSeparator());
        for (ReporteGeneralProyectoFila f : proyectos) {
            sb.append(csvEscape(f.codigoProyecto())).append(',')
                    .append(csvEscape(f.nombreProyecto())).append(',')
                    .append(csvEscape(f.estado().getValor())).append(',')
                    .append(csvEscape(f.liderActual())).append(',')
                    .append(f.fechaInicio()).append(',')
                    .append(f.fechaFin()).append(System.lineSeparator());
        }

        sb.append(System.lineSeparator()).append("# Actividades").append(System.lineSeparator());
        sb.append("codigoActividad,proyecto,etapa,desarrollador,prioridad,estado,fechaInicio,fechaFin").append(System.lineSeparator());
        for (ReporteGeneralActividadFila f : actividades) {
            sb.append(csvEscape(f.codigoActividad())).append(',')
                    .append(csvEscape(f.proyecto())).append(',')
                    .append(csvEscape(f.etapa())).append(',')
                    .append(csvEscape(f.desarrollador())).append(',')
                    .append(csvEscape(f.prioridad().getValor())).append(',')
                    .append(csvEscape(f.estado().getValor())).append(',')
                    .append(f.fechaInicio()).append(',')
                    .append(f.fechaFin()).append(System.lineSeparator());
        }

        sb.append(System.lineSeparator()).append("# Errores").append(System.lineSeparator());
        sb.append("codigoRegistroError,proyecto,actividad,tipoError,severidad,estado,fechaRegistro").append(System.lineSeparator());
        for (ReporteGeneralErrorFila f : errores) {
            sb.append(csvEscape(f.codigoRegistroError())).append(',')
                    .append(csvEscape(f.proyecto())).append(',')
                    .append(csvEscape(f.actividad())).append(',')
                    .append(csvEscape(f.tipoError())).append(',')
                    .append(csvEscape(f.severidad().getValor())).append(',')
                    .append(csvEscape(f.estado().getValor())).append(',')
                    .append(f.fechaRegistro()).append(System.lineSeparator());
        }

        sb.append(System.lineSeparator()).append("# Interrupciones").append(System.lineSeparator());
        sb.append("codigoInterrupcion,proyecto,actividad,tipoInterrupcion,duracionMinutos,fechaRegistro").append(System.lineSeparator());
        for (ReporteGeneralInterrupcionFila f : interrupciones) {
            sb.append(csvEscape(f.codigoInterrupcion())).append(',')
                    .append(csvEscape(f.proyecto())).append(',')
                    .append(csvEscape(f.actividad())).append(',')
                    .append(csvEscape(f.tipoInterrupcion())).append(',')
                    .append(f.duracionMinutos()).append(',')
                    .append(f.fechaRegistro()).append(System.lineSeparator());
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

    private byte[] generarExcel(
            List<ReporteGeneralProyectoFila> proyectos,
            List<ReporteGeneralActividadFila> actividades,
            List<ReporteGeneralErrorFila> errores,
            List<ReporteGeneralInterrupcionFila> interrupciones) {

        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream salida = new ByteArrayOutputStream()) {

            hojaProyectos(workbook, proyectos);
            hojaActividades(workbook, actividades);
            hojaErrores(workbook, errores);
            hojaInterrupciones(workbook, interrupciones);

            workbook.write(salida);
            return salida.toByteArray();
        } catch (IOException ex) {
            throw new UncheckedIOException("Error generando el archivo Excel del reporte general.", ex);
        }
    }

    private void hojaProyectos(Workbook workbook, List<ReporteGeneralProyectoFila> proyectos) {
        Sheet hoja = workbook.createSheet("Proyectos");
        String[] columnas = {"Código", "Nombre", "Estado", "Líder actual", "Fecha inicio", "Fecha fin"};
        escribirEncabezado(hoja, columnas);

        int numeroFila = 1;
        for (ReporteGeneralProyectoFila f : proyectos) {
            Row fila = hoja.createRow(numeroFila++);
            fila.createCell(0).setCellValue(f.codigoProyecto());
            fila.createCell(1).setCellValue(f.nombreProyecto());
            fila.createCell(2).setCellValue(f.estado().getValor());
            fila.createCell(3).setCellValue(f.liderActual());
            fila.createCell(4).setCellValue(f.fechaInicio().toString());
            fila.createCell(5).setCellValue(f.fechaFin().toString());
        }
        autoajustar(hoja, columnas.length);
    }

    private void hojaActividades(Workbook workbook, List<ReporteGeneralActividadFila> actividades) {
        Sheet hoja = workbook.createSheet("Actividades");
        String[] columnas = {"Código", "Proyecto", "Etapa", "Desarrollador", "Prioridad", "Estado", "Fecha inicio", "Fecha fin"};
        escribirEncabezado(hoja, columnas);

        int numeroFila = 1;
        for (ReporteGeneralActividadFila f : actividades) {
            Row fila = hoja.createRow(numeroFila++);
            fila.createCell(0).setCellValue(f.codigoActividad());
            fila.createCell(1).setCellValue(f.proyecto());
            fila.createCell(2).setCellValue(f.etapa());
            fila.createCell(3).setCellValue(f.desarrollador());
            fila.createCell(4).setCellValue(f.prioridad().getValor());
            fila.createCell(5).setCellValue(f.estado().getValor());
            fila.createCell(6).setCellValue(f.fechaInicio().toString());
            fila.createCell(7).setCellValue(f.fechaFin().toString());
        }
        autoajustar(hoja, columnas.length);
    }

    private void hojaErrores(Workbook workbook, List<ReporteGeneralErrorFila> errores) {
        Sheet hoja = workbook.createSheet("Errores");
        String[] columnas = {"Código", "Proyecto", "Actividad", "Tipo", "Severidad", "Estado", "Registrado"};
        escribirEncabezado(hoja, columnas);

        int numeroFila = 1;
        for (ReporteGeneralErrorFila f : errores) {
            Row fila = hoja.createRow(numeroFila++);
            fila.createCell(0).setCellValue(f.codigoRegistroError());
            fila.createCell(1).setCellValue(f.proyecto());
            fila.createCell(2).setCellValue(f.actividad());
            fila.createCell(3).setCellValue(f.tipoError());
            fila.createCell(4).setCellValue(f.severidad().getValor());
            fila.createCell(5).setCellValue(f.estado().getValor());
            fila.createCell(6).setCellValue(f.fechaRegistro().toString());
        }
        autoajustar(hoja, columnas.length);
    }

    private void hojaInterrupciones(Workbook workbook, List<ReporteGeneralInterrupcionFila> interrupciones) {
        Sheet hoja = workbook.createSheet("Interrupciones");
        String[] columnas = {"Código", "Proyecto", "Actividad", "Tipo", "Duración (min)", "Registrado"};
        escribirEncabezado(hoja, columnas);

        int numeroFila = 1;
        for (ReporteGeneralInterrupcionFila f : interrupciones) {
            Row fila = hoja.createRow(numeroFila++);
            fila.createCell(0).setCellValue(f.codigoInterrupcion());
            fila.createCell(1).setCellValue(f.proyecto());
            fila.createCell(2).setCellValue(f.actividad());
            fila.createCell(3).setCellValue(f.tipoInterrupcion());
            fila.createCell(4).setCellValue(f.duracionMinutos());
            fila.createCell(5).setCellValue(f.fechaRegistro().toString());
        }
        autoajustar(hoja, columnas.length);
    }

    private void escribirEncabezado(Sheet hoja, String[] columnas) {
        Row encabezado = hoja.createRow(0);
        for (int i = 0; i < columnas.length; i++) {
            encabezado.createCell(i).setCellValue(columnas[i]);
        }
    }

    private void autoajustar(Sheet hoja, int numeroColumnas) {
        for (int i = 0; i < numeroColumnas; i++) {
            hoja.autoSizeColumn(i);
        }
    }

    // ================= PDF =================

    private byte[] generarPdf(
            List<ReporteGeneralProyectoFila> proyectos,
            List<ReporteGeneralActividadFila> actividades,
            List<ReporteGeneralErrorFila> errores,
            List<ReporteGeneralInterrupcionFila> interrupciones) {

        try {
            PdfTablaWriter escritor = new PdfTablaWriter();
            escritor.titulo("Reporte general -- " + LocalDate.now());

            escritor.subtitulo("Proyectos");
            escribirTablaOVacio(escritor, proyectos, "No hay proyectos registrados.",
                    new String[]{"Código", "Nombre", "Estado", "Líder", "Inicio", "Fin"},
                    new float[]{1.1f, 2.2f, 1.3f, 1.8f, 0.9f, 0.9f},
                    f -> new String[]{
                            f.codigoProyecto(), f.nombreProyecto(), f.estado().getValor(),
                            f.liderActual(), f.fechaInicio().toString(), f.fechaFin().toString(),
                    });

            escritor.subtitulo("Actividades");
            escribirTablaOVacio(escritor, actividades, "No hay actividades registradas.",
                    new String[]{"Código", "Proyecto", "Etapa", "Desarrollador", "Prioridad", "Estado"},
                    new float[]{1.6f, 1.4f, 1.4f, 1.6f, 0.9f, 1.3f},
                    f -> new String[]{
                            f.codigoActividad(), f.proyecto(), f.etapa(), f.desarrollador(),
                            f.prioridad().getValor(), f.estado().getValor(),
                    });

            escritor.subtitulo("Errores");
            escribirTablaOVacio(escritor, errores, "No hay errores registrados.",
                    new String[]{"Código", "Proyecto", "Actividad", "Tipo", "Severidad", "Estado"},
                    new float[]{1.8f, 1.4f, 1.6f, 1.3f, 0.9f, 1.1f},
                    f -> new String[]{
                            f.codigoRegistroError(), f.proyecto(), f.actividad(), f.tipoError(),
                            f.severidad().getValor(), f.estado().getValor(),
                    });

            escritor.subtitulo("Interrupciones");
            escribirTablaOVacio(escritor, interrupciones, "No hay interrupciones registradas.",
                    new String[]{"Código", "Proyecto", "Actividad", "Tipo", "Min."},
                    new float[]{1.8f, 1.5f, 1.7f, 1.5f, 0.6f},
                    f -> new String[]{
                            f.codigoInterrupcion(), f.proyecto(), f.actividad(), f.tipoInterrupcion(),
                            String.valueOf(f.duracionMinutos()),
                    });

            return escritor.exportar();
        } catch (IOException ex) {
            throw new UncheckedIOException("Error generando el archivo PDF del reporte general.", ex);
        }
    }

    private <T> void escribirTablaOVacio(
            PdfTablaWriter escritor, List<T> filas, String mensajeVacio,
            String[] encabezados, float[] anchos, Function<T, String[]> aFila) throws IOException {
        if (filas.isEmpty()) {
            escritor.sinDatos(mensajeVacio);
            return;
        }
        escritor.tabla(encabezados, anchos, filas.stream().map(aFila).toList());
    }
}
