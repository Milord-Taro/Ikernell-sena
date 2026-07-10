import { useEffect, useState, type FormEvent } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/FormControls';
import { Alert } from '../../components/ui/Feedback';
import { ApiRequestError } from '../../types/api';
import type { EtapaResponse, EtapaRequest } from '../../types/etapa';

interface ValoresFormulario {
  codigoEtapa: string;
  nombreEtapa: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  orden: string;
}

const valoresVacios: ValoresFormulario = {
  codigoEtapa: '',
  nombreEtapa: '',
  descripcion: '',
  fechaInicio: '',
  fechaFin: '',
  orden: '',
};

function etapaAValores(etapa: EtapaResponse): ValoresFormulario {
  return {
    codigoEtapa: etapa.codigoEtapa,
    nombreEtapa: etapa.nombreEtapa,
    descripcion: etapa.descripcion ?? '',
    fechaInicio: etapa.fechaInicio,
    fechaFin: etapa.fechaFin,
    orden: String(etapa.orden),
  };
}

const LIMITES = { codigo: 20, nombre: 150 } as const;

interface EtapaFormModalProps {
  open: boolean;
  idProyecto: number;
  etapaEditando: EtapaResponse | null;
  siguienteOrdenSugerido: number;
  onClose: () => void;
  onGuardar: (request: EtapaRequest) => Promise<void>;
}

export function EtapaFormModal({
  open,
  idProyecto,
  etapaEditando,
  siguienteOrdenSugerido,
  onClose,
  onGuardar,
}: EtapaFormModalProps) {
  const esEdicion = Boolean(etapaEditando);
  const [valores, setValores] = useState<ValoresFormulario>(valoresVacios);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [erroresCampo, setErroresCampo] = useState<Record<string, string>>({});

  useEffect(() => {
    setValores(
      etapaEditando
        ? etapaAValores(etapaEditando)
        : { ...valoresVacios, orden: String(siguienteOrdenSugerido) },
    );
    setError(null);
    setErroresCampo({});
  }, [etapaEditando, open, siguienteOrdenSugerido]);

  const actualizarCampo = (campo: keyof ValoresFormulario, valor: string) => {
    setValores((v) => ({ ...v, [campo]: valor }));
  };

  const errorFechas =
    valores.fechaInicio && valores.fechaFin && valores.fechaFin < valores.fechaInicio
      ? 'La fecha de fin no puede ser anterior a la fecha de inicio.'
      : erroresCampo.fechaFin;

  const manejarEnvio = async (evento: FormEvent) => {
    evento.preventDefault();
    setError(null);

    if (valores.fechaFin < valores.fechaInicio) {
      setErroresCampo((e) => ({ ...e, fechaFin: 'La fecha de fin no puede ser anterior a la fecha de inicio.' }));
      return;
    }

    setGuardando(true);
    setErroresCampo({});

    try {
      await onGuardar({
        codigoEtapa: valores.codigoEtapa,
        nombreEtapa: valores.nombreEtapa,
        descripcion: valores.descripcion || undefined,
        fechaInicio: valores.fechaInicio,
        fechaFin: valores.fechaFin,
        orden: Number(valores.orden),
        idProyecto,
      });
    } catch (err) {
      if (err instanceof ApiRequestError) {
        if (err.errores) {
          const mapa: Record<string, string> = {};
          err.errores.forEach((e) => {
            mapa[e.campo] = e.mensaje;
          });
          setErroresCampo(mapa);
        } else {
          setError(err.message);
        }
      } else {
        setError('Ocurrió un error inesperado.');
      }
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={esEdicion ? 'Editar etapa' : 'Nueva etapa'} size="md">
      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        {error && <Alert variant="error" title="No se pudo guardar">{error}</Alert>}

        <div className="grid grid-cols-[1fr_100px] gap-3">
          <Input
            label="Código de la etapa"
            required
            maxLength={LIMITES.codigo}
            value={valores.codigoEtapa}
            onChange={(e) => actualizarCampo('codigoEtapa', e.target.value)}
            error={erroresCampo.codigoEtapa}
            placeholder="ETP-001"
          />
          <Input
            label="Orden"
            type="number"
            min={1}
            required
            value={valores.orden}
            onChange={(e) => actualizarCampo('orden', e.target.value)}
            error={erroresCampo.orden}
          />
        </div>

        <Input
          label="Nombre de la etapa"
          required
          minLength={3}
          maxLength={LIMITES.nombre}
          value={valores.nombreEtapa}
          onChange={(e) => actualizarCampo('nombreEtapa', e.target.value)}
          error={erroresCampo.nombreEtapa}
        />
        <Textarea
          label="Descripción"
          rows={3}
          value={valores.descripcion}
          onChange={(e) => actualizarCampo('descripcion', e.target.value)}
          error={erroresCampo.descripcion}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Fecha de inicio"
            type="date"
            required
            value={valores.fechaInicio}
            onChange={(e) => actualizarCampo('fechaInicio', e.target.value)}
            error={erroresCampo.fechaInicio}
          />
          <Input
            label="Fecha de fin"
            type="date"
            required
            min={valores.fechaInicio || undefined}
            value={valores.fechaFin}
            onChange={(e) => actualizarCampo('fechaFin', e.target.value)}
            error={errorFechas}
          />
        </div>

        <div className="flex justify-end gap-2 mt-1">
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit" loading={guardando}>
            {esEdicion ? 'Guardar cambios' : 'Crear etapa'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
