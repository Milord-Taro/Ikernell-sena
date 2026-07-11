import { useEffect, useState, type FormEvent } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Textarea } from '../../components/ui/FormControls';
import { Alert } from '../../components/ui/Feedback';
import { ApiRequestError } from '../../types/api';
import { marcarMensajeComoLeido, responderMensaje } from '../../services/mensajes';
import type { MensajeContactoResponse, EstadoMensaje } from '../../types/mensaje';

const variantePorEstado: Record<EstadoMensaje, 'default' | 'success' | 'info'> = {
  'Pendiente': 'default',
  'Leído': 'info',
  'Atendido': 'success',
};

interface MensajeDetalleModalProps {
  open: boolean;
  mensaje: MensajeContactoResponse;
  onClose: () => void;
  onActualizado: () => Promise<void>;
}

/**
 * REGLA DE UI: cada dato lleva su etiqueta textual explícita (Remitente,
 * Correo, Asunto, Estado, etc.) -- ver memoria de patrones del proyecto.
 */
export function MensajeDetalleModal({ open, mensaje, onClose, onActualizado }: MensajeDetalleModalProps) {
  const [respuesta, setRespuesta] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setRespuesta('');
    setError(null);

    // Al abrir un mensaje Pendiente, se marca Leído automáticamente --
    // igual que cualquier bandeja de entrada. Leído/Atendido no cambian.
    if (mensaje.estado === 'Pendiente') {
      marcarMensajeComoLeido(mensaje.idMensajeContacto).then(onActualizado);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mensaje.idMensajeContacto]);

  const alResponder = async (evento: FormEvent) => {
    evento.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      await responderMensaje(mensaje.idMensajeContacto, { respuesta });
      await onActualizado();
      onClose();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo enviar la respuesta.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={mensaje.asunto} size="md">
      <div className="flex flex-col gap-4">
        {error && <Alert variant="error" title="No se pudo completar la acción">{error}</Alert>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <span className="type-caption text-[var(--text-tertiary)]">Remitente</span>
            <span className="type-body-sm text-[var(--text-secondary)]">{mensaje.nombreRemitente}</span>
          </div>
          <div className="flex flex-col">
            <span className="type-caption text-[var(--text-tertiary)]">Correo</span>
            <span className="type-body-sm text-[var(--text-secondary)]">{mensaje.correoElectronico}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="type-caption text-[var(--text-tertiary)]">Estado</span>
            <Badge variant={variantePorEstado[mensaje.estado]} size="sm" className="w-fit">
              {mensaje.estado}
            </Badge>
          </div>
          <div className="flex flex-col items-end">
            <span className="type-caption text-[var(--text-tertiary)]">Enviado</span>
            <span className="type-body-sm text-[var(--text-secondary)]">{mensaje.fechaEnvio}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="type-caption text-[var(--text-tertiary)]">Mensaje</span>
          <p className="type-body-sm text-[var(--text-secondary)]">{mensaje.detalle}</p>
        </div>

        {mensaje.estado === 'Atendido' ? (
          <div className="flex flex-col gap-1">
            <span className="type-caption text-[var(--text-tertiary)]">Respuesta</span>
            <p className="type-body-sm text-[var(--text-secondary)]">{mensaje.respuesta}</p>
            {mensaje.responsable && (
              <span className="type-caption text-[var(--text-tertiary)]">
                Respondido por: {mensaje.responsable.nombres} {mensaje.responsable.apellidos}
                {mensaje.fechaAtencion ? ` · ${mensaje.fechaAtencion}` : ''}
              </span>
            )}
          </div>
        ) : (
          <form onSubmit={alResponder} className="flex flex-col gap-3">
            <Textarea
              label="Respuesta"
              required
              minLength={3}
              rows={4}
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={onClose}>Cerrar</Button>
              <Button type="submit" loading={enviando}>Enviar respuesta</Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
