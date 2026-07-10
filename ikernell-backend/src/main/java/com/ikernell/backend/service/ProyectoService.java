package com.ikernell.backend.service;

import com.ikernell.backend.constants.RolConstantes;
import com.ikernell.backend.dto.ProyectoRequest;
import com.ikernell.backend.dto.ProyectoResponse;
import com.ikernell.backend.dto.UsuarioResponse;
import com.ikernell.backend.entity.AsignacionProyecto;
import com.ikernell.backend.entity.Proyecto;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.EstadoProyecto;
import com.ikernell.backend.enums.RolProyecto;
import com.ikernell.backend.exception.BusinessException;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.ProyectoMapper;
import com.ikernell.backend.mapper.UsuarioMapper;
import com.ikernell.backend.repository.AsignacionProyectoRepository;
import com.ikernell.backend.repository.ProyectoRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProyectoService {

    private final ProyectoRepository proyectoRepository;
    private final AsignacionProyectoRepository asignacionProyectoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProyectoMapper proyectoMapper;
    private final UsuarioMapper usuarioMapper;
    private final AutorizacionProyectoService autorizacionProyectoService;

    /**
     * Cualquiera con el rol organizacional Líder de Proyecto o Coordinador
     * puede crear un proyecto (el @PreAuthorize del Controller ya filtra
     * esto).
     *
     * Si quien crea es Líder de Proyecto, queda auto-vinculado como el
     * Líder de ESTE proyecto -- ignora idLiderInicial si por algún motivo
     * viene en el request, ya que la autovinculación tiene prioridad.
     *
     * Si quien crea es Coordinador, NO se autovincula (el Coordinador ya
     * gestiona cualquier proyecto sin necesitar estar en
     * AsignacionProyecto), pero SÍ puede elegir un Líder inicial mediante
     * idLiderInicial -- si no lo manda, el proyecto queda sin líder hasta
     * que alguien lo asigne después desde "Equipo".
     */
    @Transactional
    public ProyectoResponse crear(ProyectoRequest request, String correoCreador) {
        validarCodigoDisponible(request.getCodigoProyecto(), null);
        validarFechas(request);

        Usuario creador = autorizacionProyectoService.buscarUsuarioOFallar(correoCreador);

        Proyecto proyecto = proyectoMapper.toEntity(request);
        proyecto.setEstado(EstadoProyecto.PLANEACION);
        Proyecto guardado = proyectoRepository.save(proyecto);

        if (RolConstantes.LIDER_PROYECTO.equals(creador.getRol().getCodigoRol())) {
            vincularLider(guardado, creador);
        } else if (request.getIdLiderInicial() != null) {
            Usuario liderElegido = usuarioRepository.findById(request.getIdLiderInicial())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "No existe un usuario con id " + request.getIdLiderInicial() + "."));

            if (!RolConstantes.LIDER_PROYECTO.equals(liderElegido.getRol().getCodigoRol())) {
                throw new BusinessException(
                        "El usuario elegido como líder inicial no tiene el rol de Líder de Proyecto.");
            }

            vincularLider(guardado, liderElegido);
        }

        return enriquecerConLider(guardado);
    }

    public List<ProyectoResponse> listarTodos() {
        return proyectoRepository.findAll()
                .stream()
                .map(this::enriquecerConLider)
                .toList();
    }

    public List<ProyectoResponse> listarPorEstado(String estadoTexto) {
        EstadoProyecto estado = parsearEstado(estadoTexto);

        return proyectoRepository.findByEstado(estado)
                .stream()
                .map(this::enriquecerConLider)
                .toList();
    }

    public ProyectoResponse obtenerPorId(Integer idProyecto) {
        return enriquecerConLider(buscarOFallar(idProyecto));
    }

    @Transactional
    public ProyectoResponse actualizar(Integer idProyecto, ProyectoRequest request, String correoSolicitante) {
        autorizacionProyectoService.verificarPuedeGestionar(correoSolicitante, idProyecto);

        Proyecto proyecto = buscarOFallar(idProyecto);

        validarCodigoDisponible(request.getCodigoProyecto(), idProyecto);
        validarFechas(request);

        proyectoMapper.actualizarEntidadDesdeRequest(request, proyecto);

        Proyecto actualizado = proyectoRepository.save(proyecto);

        return enriquecerConLider(actualizado);
    }

    @Transactional
    public ProyectoResponse cambiarEstado(Integer idProyecto, String nuevoEstadoTexto, String correoSolicitante) {
        autorizacionProyectoService.verificarPuedeGestionar(correoSolicitante, idProyecto);

        Proyecto proyecto = buscarOFallar(idProyecto);
        EstadoProyecto nuevoEstado = parsearEstado(nuevoEstadoTexto);

        proyecto.setEstado(nuevoEstado);
        Proyecto guardado = proyectoRepository.save(proyecto);

        return enriquecerConLider(guardado);
    }

    private void vincularLider(Proyecto proyecto, Usuario lider) {
        AsignacionProyecto asignacion = AsignacionProyecto.builder()
                .usuario(lider)
                .proyecto(proyecto)
                .rolProyecto(RolProyecto.LIDER)
                .build();
        asignacionProyectoRepository.save(asignacion);
    }

    /**
     * Agrega el líder vigente (o null) a un ProyectoResponse ya mapeado.
     * Centralizado aquí para no repetir la consulta en cada método.
     */
    private ProyectoResponse enriquecerConLider(Proyecto proyecto) {
        ProyectoResponse response = proyectoMapper.toResponse(proyecto);
        response.setLiderActual(obtenerLiderActual(proyecto.getIdProyecto()));
        return response;
    }

    private UsuarioResponse obtenerLiderActual(Integer idProyecto) {
        return asignacionProyectoRepository
                .findByProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(idProyecto, RolProyecto.LIDER)
                .map(asignacion -> usuarioMapper.toResponse(asignacion.getUsuario()))
                .orElse(null);
    }

    private EstadoProyecto parsearEstado(String estadoTexto) {
        try {
            return EstadoProyecto.desdeValor(estadoTexto);
        } catch (IllegalArgumentException ex) {
            throw new BusinessException(ex.getMessage());
        }
    }

    private void validarFechas(ProyectoRequest request) {
        if (request.getFechaFin().isBefore(request.getFechaInicio())) {
            throw new BusinessException("La fecha de fin no puede ser anterior a la fecha de inicio.");
        }
    }

    private Proyecto buscarOFallar(Integer idProyecto) {
        return proyectoRepository.findById(idProyecto)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un proyecto con id " + idProyecto + "."));
    }

    private void validarCodigoDisponible(String codigoProyecto, Integer idProyectoActual) {
        proyectoRepository.findByCodigoProyecto(codigoProyecto).ifPresent(existente -> {
            if (idProyectoActual == null || !existente.getIdProyecto().equals(idProyectoActual)) {
                throw new ConflictException(
                        "Ya existe un proyecto con el código '" + codigoProyecto + "'.");
            }
        });
    }
}
