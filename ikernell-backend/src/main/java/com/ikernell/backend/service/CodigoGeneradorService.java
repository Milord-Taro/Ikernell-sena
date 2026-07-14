package com.ikernell.backend.service;

import com.ikernell.backend.entity.Actividad;
import com.ikernell.backend.entity.Etapa;
import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.repository.ActividadRepository;
import com.ikernell.backend.repository.EspecialidadRepository;
import com.ikernell.backend.repository.EtapaRepository;
import com.ikernell.backend.repository.InterrupcionRepository;
import com.ikernell.backend.repository.ProfesionRepository;
import com.ikernell.backend.repository.ProyectoRepository;
import com.ikernell.backend.repository.RegistroErrorRepository;
import com.ikernell.backend.repository.RolRepository;
import com.ikernell.backend.repository.TipoErrorRepository;
import com.ikernell.backend.repository.TipoInterrupcionRepository;
import com.ikernell.backend.util.SecuenciaCodigoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Único lugar donde se arman los códigos funcionales de Proyecto, Etapa,
 * Actividad, RegistroError, Interrupción y los catálogos -- antes el
 * usuario los tipeaba a mano en el formulario, lo que permitía p. ej. que
 * un Líder digitara el código de una etapa de un proyecto ajeno.
 *
 * Cada nivel hereda el código de su padre como prefijo (Etapa =
 * "{codigoProyecto}-ETP-01", Actividad = "{codigoEtapa}-ACT-01", etc.), así
 * que la secuencia numérica se reinicia por padre pero el código completo
 * sigue siendo único de forma natural en toda la base de datos, sin
 * necesitar un chequeo de unicidad global aparte.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CodigoGeneradorService {

    private final ProyectoRepository proyectoRepository;
    private final EtapaRepository etapaRepository;
    private final ActividadRepository actividadRepository;
    private final RegistroErrorRepository registroErrorRepository;
    private final InterrupcionRepository interrupcionRepository;
    private final RolRepository rolRepository;
    private final ProfesionRepository profesionRepository;
    private final EspecialidadRepository especialidadRepository;
    private final TipoErrorRepository tipoErrorRepository;
    private final TipoInterrupcionRepository tipoInterrupcionRepository;

    public String siguienteCodigoProyecto() {
        var codigos = proyectoRepository.findAllByOrderByIdProyectoAsc().stream()
                .map(Proyecto::getCodigoProyecto).toList();
        return "PRY-" + SecuenciaCodigoUtil.conCeros(SecuenciaCodigoUtil.siguienteSecuencia(codigos), 3);
    }

    public String siguienteCodigoEtapa(Proyecto proyecto) {
        var codigos = etapaRepository.findByProyecto_IdProyectoOrderByIdEtapaAsc(proyecto.getIdProyecto()).stream()
                .map(Etapa::getCodigoEtapa).toList();
        return proyecto.getCodigoProyecto() + "-ETP-"
                + SecuenciaCodigoUtil.conCeros(SecuenciaCodigoUtil.siguienteSecuencia(codigos), 2);
    }

    public String siguienteCodigoActividad(Etapa etapa) {
        var codigos = actividadRepository.findByEtapa_IdEtapaOrderByIdActividadAsc(etapa.getIdEtapa()).stream()
                .map(Actividad::getCodigoActividad).toList();
        return etapa.getCodigoEtapa() + "-ACT-"
                + SecuenciaCodigoUtil.conCeros(SecuenciaCodigoUtil.siguienteSecuencia(codigos), 2);
    }

    public String siguienteCodigoRegistroError(Actividad actividad) {
        var codigos = registroErrorRepository
                .findByActividad_IdActividadOrderByIdRegistroErrorAsc(actividad.getIdActividad()).stream()
                .map(r -> r.getCodigoRegistroError()).toList();
        return actividad.getCodigoActividad() + "-ERR-"
                + SecuenciaCodigoUtil.conCeros(SecuenciaCodigoUtil.siguienteSecuencia(codigos), 2);
    }

    public String siguienteCodigoInterrupcion(Actividad actividad) {
        var codigos = interrupcionRepository.findByActividad_IdActividad(actividad.getIdActividad()).stream()
                .map(i -> i.getCodigoInterrupcion()).toList();
        return actividad.getCodigoActividad() + "-INT-"
                + SecuenciaCodigoUtil.conCeros(SecuenciaCodigoUtil.siguienteSecuencia(codigos), 2);
    }

    public String siguienteCodigoRol() {
        var codigos = rolRepository.findAllByOrderByIdRolAsc().stream()
                .map(r -> r.getCodigoRol()).toList();
        return "ROL-" + SecuenciaCodigoUtil.conCeros(SecuenciaCodigoUtil.siguienteSecuencia(codigos), 3);
    }

    public String siguienteCodigoProfesion() {
        var codigos = profesionRepository.findAllByOrderByIdProfesionAsc().stream()
                .map(p -> p.getCodigoProfesion()).toList();
        return "PRF-" + SecuenciaCodigoUtil.conCeros(SecuenciaCodigoUtil.siguienteSecuencia(codigos), 3);
    }

    public String siguienteCodigoEspecialidad() {
        var codigos = especialidadRepository.findAllByOrderByIdEspecialidadAsc().stream()
                .map(e -> e.getCodigoEspecialidad()).toList();
        return "ESP-" + SecuenciaCodigoUtil.conCeros(SecuenciaCodigoUtil.siguienteSecuencia(codigos), 3);
    }

    public String siguienteCodigoTipoError() {
        var codigos = tipoErrorRepository.findAllByOrderByIdTipoErrorAsc().stream()
                .map(t -> t.getCodigoTipoError()).toList();
        return "TER-" + SecuenciaCodigoUtil.conCeros(SecuenciaCodigoUtil.siguienteSecuencia(codigos), 3);
    }

    public String siguienteCodigoTipoInterrupcion() {
        var codigos = tipoInterrupcionRepository.findAllByOrderByIdTipoInterrupcionAsc().stream()
                .map(t -> t.getCodigoTipoInterrupcion()).toList();
        return "TIN-" + SecuenciaCodigoUtil.conCeros(SecuenciaCodigoUtil.siguienteSecuencia(codigos), 3);
    }
}
