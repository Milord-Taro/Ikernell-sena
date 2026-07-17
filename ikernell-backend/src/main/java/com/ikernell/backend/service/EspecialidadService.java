package com.ikernell.backend.service;

import com.ikernell.backend.audit.DetalleObjectMapper;
import com.ikernell.backend.audit.TrazabilidadService;
import com.ikernell.backend.dto.EspecialidadRequest;
import com.ikernell.backend.dto.EspecialidadResponse;
import com.ikernell.backend.entity.Especialidad;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.exception.ConflictException;
import com.ikernell.backend.exception.ResourceNotFoundException;
import com.ikernell.backend.mapper.EspecialidadMapper;
import com.ikernell.backend.repository.EspecialidadRepository;
import com.ikernell.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EspecialidadService {

    private final EspecialidadRepository especialidadRepository;
    private final UsuarioRepository usuarioRepository;
    private final EspecialidadMapper especialidadMapper;
    private final TrazabilidadService trazabilidadService;
    private final CodigoGeneradorService codigoGeneradorService;

    @Transactional
    public EspecialidadResponse crear(EspecialidadRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        validarNombreDisponible(request.getNombreEspecialidad(), null);

        Especialidad especialidad = especialidadMapper.toEntity(request);
        Especialidad guardada = guardarConCodigoUnico(especialidad);

        EspecialidadResponse response = especialidadMapper.toResponse(guardada);
        trazabilidadService.registrar(
                solicitante, "Especialidad", guardada.getCodigoEspecialidad(),
                OperacionTrazabilidad.CREAR, DetalleObjectMapper.serializar(response));

        return response;
    }

    public List<EspecialidadResponse> listarTodas() {
        return especialidadRepository.findAllByOrderByIdEspecialidadAsc()
                .stream()
                .map(especialidadMapper::toResponse)
                .toList();
    }

    public List<EspecialidadResponse> listarActivas() {
        return especialidadRepository.findByActivoTrueOrderByIdEspecialidadAsc()
                .stream()
                .map(especialidadMapper::toResponse)
                .toList();
    }

    public EspecialidadResponse obtenerPorId(Integer idEspecialidad) {
        return especialidadMapper.toResponse(buscarOFallar(idEspecialidad));
    }

    @Transactional
    public EspecialidadResponse actualizar(Integer idEspecialidad, EspecialidadRequest request, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        Especialidad especialidad = buscarOFallar(idEspecialidad);

        validarNombreDisponible(request.getNombreEspecialidad(), idEspecialidad);

        especialidadMapper.actualizarEntidadDesdeRequest(request, especialidad);
        Especialidad actualizada = especialidadRepository.save(especialidad);

        EspecialidadResponse response = especialidadMapper.toResponse(actualizada);
        trazabilidadService.registrar(
                solicitante, "Especialidad", actualizada.getCodigoEspecialidad(),
                OperacionTrazabilidad.ACTUALIZAR, DetalleObjectMapper.serializar(response));

        return response;
    }

    @Transactional
    public EspecialidadResponse cambiarEstado(Integer idEspecialidad, boolean activo, String correoSolicitante) {
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);
        Especialidad especialidad = buscarOFallar(idEspecialidad);
        especialidad.setActivo(activo);
        Especialidad guardada = especialidadRepository.save(especialidad);

        EspecialidadResponse response = especialidadMapper.toResponse(guardada);
        trazabilidadService.registrar(
                solicitante, "Especialidad", guardada.getCodigoEspecialidad(),
                activo ? OperacionTrazabilidad.ACTUALIZAR : OperacionTrazabilidad.INHABILITAR,
                DetalleObjectMapper.serializar(response));

        return response;
    }

    /**
     * Delete físico, protegido por ON DELETE RESTRICT en BD (fk_usuario_especialidad).
     * Si algún usuario todavía tiene esta especialidad, la BD rechaza el borrado y lo
     * traducimos a un ConflictException legible. El snapshot (JSON del Response actual)
     * queda en Trazabilidad.detalle antes de borrar la fila.
     */
    @Transactional
    public void eliminar(Integer idEspecialidad, String correoSolicitante) {
        Especialidad especialidad = buscarOFallar(idEspecialidad);
        Usuario solicitante = buscarSolicitanteOFallar(correoSolicitante);

        String detalle = DetalleObjectMapper.serializar(especialidadMapper.toResponse(especialidad));

        try {
            especialidadRepository.delete(especialidad);
            especialidadRepository.flush();
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException(
                    "No se puede eliminar la especialidad '" + especialidad.getNombreEspecialidad()
                            + "': está en uso por uno o más usuarios.");
        }

        trazabilidadService.registrar(
                solicitante, "Especialidad", especialidad.getCodigoEspecialidad(),
                OperacionTrazabilidad.ELIMINAR, detalle);
    }

    private Especialidad buscarOFallar(Integer idEspecialidad) {
        return especialidadRepository.findById(idEspecialidad)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe una especialidad con id " + idEspecialidad + "."));
    }

    private Usuario buscarSolicitanteOFallar(String correoElectronico) {
        return usuarioRepository.findByCorreoElectronico(correoElectronico)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No existe un usuario con el correo '" + correoElectronico + "'."));
    }

    /**
     * CORREGIDO: siguienteCodigoEspecialidad() calcula el código a partir
     * del MAX() actual, así que dos altas concurrentes pueden calcular el
     * mismo siguiente código antes de que la primera termine de guardar.
     * save() sobre una entidad nueva con GenerationType.IDENTITY ejecuta el
     * INSERT de inmediato (lo necesita para obtener el id generado), así
     * que la violación de uq_especialidad_codigo se lanza aquí mismo y no
     * queda diferida al flush final -- se traduce a un 409 legible en vez
     * de tumbar la petición con un 500 sin explicación.
     */
    private Especialidad guardarConCodigoUnico(Especialidad especialidad) {
        especialidad.setCodigoEspecialidad(codigoGeneradorService.siguienteCodigoEspecialidad());
        try {
            return especialidadRepository.save(especialidad);
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException(
                    "No se pudo generar un código único para la especialidad, intenta nuevamente.");
        }
    }

    private void validarNombreDisponible(String nombreEspecialidad, Integer idEspecialidadActual) {
        especialidadRepository.findByNombreEspecialidadIgnoreCase(nombreEspecialidad).ifPresent(existente -> {
            if (idEspecialidadActual == null || !existente.getIdEspecialidad().equals(idEspecialidadActual)) {
                throw new ConflictException(
                        "Ya existe una especialidad con el nombre '" + nombreEspecialidad + "'.");
            }
        });
    }
}
