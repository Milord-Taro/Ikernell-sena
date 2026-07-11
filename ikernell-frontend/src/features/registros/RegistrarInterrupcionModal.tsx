import { useEffect, useState, type FormEvent } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Select } from '../../components/ui/FormControls';
import { Alert } from '../../components/ui/Feedback';
import { ApiRequestError } from '../../types/api';
import { tiposInterrupcionService } from '../../services/catalogos';
import { crearInterrupcion } from '../../services/interrupciones';
import type { ActividadResponse } from '../../types/actividad';
import type { TipoInterrupcionResponse } from '../../types/usuario';

interface RegistrarInterrupcionModalProps {
  open: boolean;
  /** Ya filtradas por el padre: sin Finalizada/Cancelada (el backend también lo valida). */
  actividadesElegibles: ActividadResponse[];
  onClose: () => void;
  onRegistrado: () => Promise<void>;
}

/**
 * NUEVO: entrada general para registrar interrupciones, a nivel de
 * Etapa -- una interrupción no "pertenece" a una sola actividad como un
 * error; puede afectar varias a la vez. Se elige de un checklist y se
 * crea un registro por cada actividad marcada (el modelo de datos sigue
 * siendo 1 interrupción = 1 actividad, esto solo evita repetir el
 * formulario varias veces).
 */
export function RegistrarInterrupcionModal({
  open,
  actividadesElegibles,
  onClose,
  onRegistrado,
}: RegistrarInterrupcionModalProps) {
  const [tiposInterrupcion, setTiposInterrupcion] = useState<TipoInterrupcionResponse[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<Set<number>>(new Set());
  const [codigoBase, setCodigoBase] = useState('');
  const [idTipoInterrupcion, setIdTipoInterrupcion] = useState('');
  const [motivo, setMotivo] = useState('');
  const [duracionMinutos, setDuracionMinutos] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setSeleccionadas(new Set());
    setCodigoBase('');
    setIdTipoInterrupcion('');
    setMotivo('');
    setDuracionMinutos('');
    setError(null);
    tiposInterrupcionService.listar().then((resp) => setTiposInterrupcion(resp.filter((t) => t.activo)));
  }, [open]);

  const alternar = (idActividad: number) => {
    setSeleccionadas((previo) => {
      const siguiente = new Set(previo);
      if (siguiente.has(idActividad)) {
        siguiente.delete(idActividad);
      } else {
        siguiente.add(idActividad);
      }
      return siguiente;
    });
  };

  const alEnviar = async (evento: FormEvent) => {
    evento.preventDefault();
    setError(null);

    if (seleccionadas.size === 0) {
      setError('Selecciona al menos una actividad afectada.');
      return;
    }

    setGuardando(true);
    try {
      const idsSeleccionados = Array.from(seleccionadas);
      await Promise.all(
        idsSeleccionados.map((idActividad, indice) =>
          crearInterrupcion({
            // Con más de una actividad seleccionada, cada registro
            // necesita un código único -- se agrega sufijo -1, -2...
            codigoInterrupcion: idsSeleccionados.length > 1 ? `${codigoBase}-${indice + 1}` : codigoBase,
            idActividad,
            idTipoInterrupcion: Number(idTipoInterrupcion),
            motivo,
            duracionMinutos: Number(duracionMinutos),
          }),
        ),
      );
      onClose();
      await onRegistrado();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo registrar la interrupción.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Registrar interrupción" size="md">
      <form onSubmit={alEnviar} className="flex flex-col gap-4">
        {error && <Alert variant="error" title="No se pudo registrar">{error}</Alert>}

        <div className="flex flex-col gap-2">
          <span className="type-label text-[var(--text-tertiary)]">Actividad(es) afectada(s)</span>
          {actividadesElegibles.length === 0 ? (
            <p className="type-body-sm text-[var(--text-tertiary)]">
              No tienes actividades activas en esta etapa que puedan verse afectadas (Finalizadas o Canceladas quedan
              fuera).
            </p>
          ) : (
            <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto border border-[var(--border)] rounded-[var(--radius-md)] p-2">
              {actividadesElegibles.map((a) => (
                <label key={a.idActividad} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={seleccionadas.has(a.idActividad)}
                    onChange={() => alternar(a.idActividad)}
                  />
                  <span className="type-body-sm text-[var(--text-primary)]">{a.nombreActividad}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <Input
          label="Código base"
          required
          maxLength={20}
          value={codigoBase}
          onChange={(e) => setCodigoBase(e.target.value)}
          placeholder="INT-001"
          hint={
            seleccionadas.size > 1
              ? 'Se agregará un sufijo -1, -2... por cada actividad seleccionada.'
              : undefined
          }
        />

        <Select
          label="Tipo de interrupción"
          required
          value={idTipoInterrupcion}
          onChange={(e) => setIdTipoInterrupcion(e.target.value)}
        >
          <option value="">Seleccionar...</option>
          {tiposInterrupcion.map((t) => (
            <option key={t.idTipoInterrupcion} value={t.idTipoInterrupcion}>
              {t.nombreTipoInterrupcion}
            </option>
          ))}
        </Select>

        <Textarea
          label="Motivo"
          required
          rows={3}
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />
        <Input
          label="Duración en minutos"
          type="number"
          min={1}
          required
          value={duracionMinutos}
          onChange={(e) => setDuracionMinutos(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button
            type="submit"
            loading={guardando}
            disabled={!idTipoInterrupcion || seleccionadas.size === 0 || actividadesElegibles.length === 0}
          >
            Registrar interrupción
          </Button>
        </div>
      </form>
    </Modal>
  );
}
