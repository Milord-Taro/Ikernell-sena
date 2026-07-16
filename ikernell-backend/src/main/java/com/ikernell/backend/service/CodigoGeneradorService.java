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
import com.ikernell.backend.repository.UsuarioRepository;
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
 *
 * CORREGIDO (rendimiento): antes cada método cargaba TODAS las entidades
 * existentes (a veces la tabla completa) solo para leer su columna de
 * código y quedarse con el máximo -- O(n) filas materializadas como
 * entidades JPA completas en cada alta. Ahora cada repositorio expone un
 * MAX() ya resuelto en SQL (buscarCodigoMaximo), así que aquí solo se
 * recibe un único String y se parsea su sufijo numérico.
 *
 * La ventana de carrera (dos altas concurrentes leyendo el mismo MAX antes
 * de que la primera termine de guardar) sigue existiendo -- es inherente a
 * "calcular siguiente número" sin una secuencia de base de datos por
 * padre, que no es viable aquí porque la secuencia se reinicia por padre.
 * Se acepta la ventana y se traduce el choque (violación de la restricción
 * UNIQUE del código) a un 409 legible en el Service que llama a save(),
 * en vez de dejarlo caer como 500 -- ver el catch de DataIntegrityViolationException
 * en, por ejemplo, ProyectoService.crear().
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
    private final UsuarioRepository usuarioRepository;

    public String siguienteCodigoUsuario() {
        int secuencia = SecuenciaCodigoUtil.siguienteSecuenciaDesdeMaximo(usuarioRepository.buscarCodigoMaximo());
        return "USR-" + SecuenciaCodigoUtil.conCeros(secuencia, 3);
    }

    public String siguienteCodigoProyecto() {
        int secuencia = SecuenciaCodigoUtil.siguienteSecuenciaDesdeMaximo(proyectoRepository.buscarCodigoMaximo());
        return "PRY-" + SecuenciaCodigoUtil.conCeros(secuencia, 3);
    }

    public String siguienteCodigoEtapa(Proyecto proyecto) {
        int secuencia = SecuenciaCodigoUtil.siguienteSecuenciaDesdeMaximo(
                etapaRepository.buscarCodigoMaximo(proyecto.getIdProyecto()));
        return proyecto.getCodigoProyecto() + "-ETP-" + SecuenciaCodigoUtil.conCeros(secuencia, 2);
    }

    public String siguienteCodigoActividad(Etapa etapa) {
        int secuencia = SecuenciaCodigoUtil.siguienteSecuenciaDesdeMaximo(
                actividadRepository.buscarCodigoMaximo(etapa.getIdEtapa()));
        return etapa.getCodigoEtapa() + "-ACT-" + SecuenciaCodigoUtil.conCeros(secuencia, 2);
    }

    public String siguienteCodigoRegistroError(Actividad actividad) {
        int secuencia = SecuenciaCodigoUtil.siguienteSecuenciaDesdeMaximo(
                registroErrorRepository.buscarCodigoMaximo(actividad.getIdActividad()));
        return actividad.getCodigoActividad() + "-ERR-" + SecuenciaCodigoUtil.conCeros(secuencia, 2);
    }

    public String siguienteCodigoInterrupcion(Actividad actividad) {
        int secuencia = SecuenciaCodigoUtil.siguienteSecuenciaDesdeMaximo(
                interrupcionRepository.buscarCodigoMaximo(actividad.getIdActividad()));
        return actividad.getCodigoActividad() + "-INT-" + SecuenciaCodigoUtil.conCeros(secuencia, 2);
    }

    public String siguienteCodigoRol() {
        int secuencia = SecuenciaCodigoUtil.siguienteSecuenciaDesdeMaximo(rolRepository.buscarCodigoMaximo());
        return "ROL-" + SecuenciaCodigoUtil.conCeros(secuencia, 3);
    }

    public String siguienteCodigoProfesion() {
        int secuencia = SecuenciaCodigoUtil.siguienteSecuenciaDesdeMaximo(profesionRepository.buscarCodigoMaximo());
        return "PRF-" + SecuenciaCodigoUtil.conCeros(secuencia, 3);
    }

    public String siguienteCodigoEspecialidad() {
        int secuencia = SecuenciaCodigoUtil.siguienteSecuenciaDesdeMaximo(especialidadRepository.buscarCodigoMaximo());
        return "ESP-" + SecuenciaCodigoUtil.conCeros(secuencia, 3);
    }

    public String siguienteCodigoTipoError() {
        int secuencia = SecuenciaCodigoUtil.siguienteSecuenciaDesdeMaximo(tipoErrorRepository.buscarCodigoMaximo());
        return "TER-" + SecuenciaCodigoUtil.conCeros(secuencia, 3);
    }

    public String siguienteCodigoTipoInterrupcion() {
        int secuencia = SecuenciaCodigoUtil.siguienteSecuenciaDesdeMaximo(tipoInterrupcionRepository.buscarCodigoMaximo());
        return "TIN-" + SecuenciaCodigoUtil.conCeros(secuencia, 3);
    }
}
