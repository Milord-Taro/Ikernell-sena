package com.ikernell.backend.audit;

import com.ikernell.backend.entity.Trazabilidad;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import com.ikernell.backend.repository.TrazabilidadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Punto único de escritura de trazabilidad. Cualquier Service puede
 * inyectar esta clase y llamar registrar(...) para dejar un rastro de
 * auditoría, sin preocuparse por construir la entidad a mano.
 *
 * ALCANCE ACTUAL: solo está conectado desde AuthService (login ->
 * operación AUTENTICAR), como prueba funcional del mecanismo. Conectarlo
 * a los demás 12 módulos (Rol, Usuario, Proyecto, Actividad, etc.) es
 * trabajo pendiente explícito -- requiere tocar cada Service existente.
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
                .build();

        trazabilidadRepository.save(evento);
    }
}
