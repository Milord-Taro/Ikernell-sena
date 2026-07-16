package com.ikernell.backend.audit;

import com.ikernell.backend.entity.Trazabilidad;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.repository.TrazabilidadRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * Punto único de escritura de trazabilidad. Cualquier Service puede
 * inyectar esta clase y llamar registrar(...) para dejar un rastro de
 * auditoría, sin preocuparse por construir la entidad a mano.
 */
@Service
@RequiredArgsConstructor
public class TrazabilidadService {

    private final TrazabilidadRepository trazabilidadRepository;

    @Transactional
    public void registrar(
            Usuario usuario,
            String entidad,
            String codigoRegistro,
            OperacionTrazabilidad operacion,
            String detalle) {

        Trazabilidad evento = Trazabilidad.builder()
                .usuario(usuario)
                .entidad(entidad)
                .codigoRegistro(codigoRegistro)
                .operacion(operacion)
                .detalle(detalle)
                .detalleAnterior(calcularDetalleAnterior(entidad, codigoRegistro, detalle))
                .direccionIp(obtenerDireccionIpActual())
                .build();

        trazabilidadRepository.save(evento);
    }

    /**
     * CORREGIDO (C7): antes esto se recalculaba en cada lectura,
     * recorriendo TODO el historial del recurso en memoria (ver
     * TrazabilidadQueryService antes de este cambio) -- además de caro,
     * hacía imposible paginar la auditoría de forma correcta. Ahora se
     * calcula UNA vez, acá, con una sola consulta puntual.
     *
     * Solo se encadenan eventos cuyo detalle es JSON (empieza por '{');
     * los mensajes de auditoría en texto plano (ej. "Inicio de sesión
     * exitoso.") ni generan ni reciben un "anterior" -- si el evento
     * nuevo no es JSON, no tiene sentido buscarle uno.
     */
    private String calcularDetalleAnterior(String entidad, String codigoRegistro, String detalleNuevo) {
        if (!esDetalleJson(detalleNuevo)) {
            return null;
        }

        return trazabilidadRepository
                .findFirstByEntidadAndCodigoRegistroAndDetalleStartingWithOrderByFechaEventoDescIdTrazabilidadDesc(
                        entidad, codigoRegistro, "{")
                .map(Trazabilidad::getDetalle)
                .orElse(null);
    }

    private boolean esDetalleJson(String detalle) {
        return detalle != null && detalle.strip().startsWith("{");
    }

    /**
     * Todas las llamadas a registrar(...) ocurren dentro del hilo de una
     * petición HTTP (Service invocado desde un Controller), así que el
     * request actual siempre está disponible vía RequestContextHolder.
     * Se prioriza X-Forwarded-For por si hay un proxy/balanceador
     * delante; si no hay contexto de request (ej. proceso batch futuro),
     * se guarda null en vez de fallar el registro.
     */
    private String obtenerDireccionIpActual() {
        RequestAttributes atributos = RequestContextHolder.getRequestAttributes();
        if (!(atributos instanceof ServletRequestAttributes servletAtributos)) {
            return null;
        }

        HttpServletRequest request = servletAtributos.getRequest();
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }

        return request.getRemoteAddr();
    }
}
