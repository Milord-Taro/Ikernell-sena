import { useEffect, useState, type FormEvent } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Select } from '../../components/ui/FormControls';
import { Alert } from '../../components/ui/Feedback';
import { ApiRequestError } from '../../types/api';
import { NIVELES_CRITICIDAD } from '../../types/actividad';
import type { ActividadResponse, ActividadRequest, NivelCriticidad } from '../../types/actividad';
import type { AsignacionProyectoResponse } from '../../types/asignacionProyecto';

interface ValoresFormulario {
  codigoActividad: string;
  nombreActividad: string;
  descripcion: string;
  prioridad: NivelCriticidad;
  fechaInicio: string;
  fechaFin: string;
  idUsuario: string;
}

const valoresVacios: ValoresFormulario = {
  codigoActividad: '',
  nombreActividad: '',
  descripcion: '',
  prioridad: 'Media',
  fechaInicio: '',
  fechaFin: '',
  idUsuario: '',
};

function actividadAValores(actividad: ActividadResponse): ValoresFormulario {
  return {
    codigoActividad: actividad.codigoActividad,
    nombreActividad: actividad.nombreActividad,
    descripcion: actividad.descripcion ?? '',
    prioridad: actividad.prioridad,
    fechaInicio: actividad.fechaInicio,
    fechaFin: actividad.fechaFin,
    idUsuario: '',
  };
}

const LIMITES = { codigo: 20, nombre: 150 } as const;

interface ActividadFormModalProps {
  open: boolean;
  idEtapa: number;
  actividadEditando: ActividadResponse | null;
  /** Equipo vigente del proyecto -- pool de desarrolladores asignables. Solo se usa al crear. */
  equipoVigente: AsignacionProyectoResponse[];
  onClose: () => void;
  onGuardar: (request: ActividadRequest) => Promise<void>;
}

export function ActividadFormModal({
  open,
  idEtapa,
  actividadEditando,
  equipoVigente,
  onClose,
  onGuardar,
}: ActividadFormModalProps) {
  const esEdicion = Boolean(actividadEditando);
  const [valores, setValores] = useState<ValoresFormulario>(valoresVacios);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [erroresCampo, setErroresCampo] = useState<Record<string, string>>({});

  useEffect(() => {
    setValores(actividadEditando ? actividadAValores(actividadEditando) : valoresVacios);
    setError(null);
    setErroresCampo({});
  }, [actividadEditando, open]);

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
        codigoActividad: valores.codigoActividad,
        idEtapa,
        // CORREGIDO: idUsuario solo se manda al crear -- ActividadMapper
        // ignora "usuario" en actualizarEntidadDesdeRequest() a
        // propósito, así que mandarlo en edición no haría nada. La
        // reasignación va por PATCH /asignar, no por aquí.
        idUsuario: !esEdicion && valores.idUsuario ? Number(valores.idUsuario) : undefined,
        nombreActividad: valores.nombreActividad,
        descripcion: valores.descripcion || undefined,
        prioridad: valores.prioridad,
        fechaInicio: valores.fechaInicio,
        fechaFin: valores.fechaFin,
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
    <Modal open={open} onClose={onClose} title={esEdicion ? 'Editar actividad' : 'Nueva actividad'} size="md">
      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        {error && <Alert variant="error" title="No se pudo guardar">{error}</Alert>}

        <Input
          label="Código de la actividad"
          required
          maxLength={LIMITES.codigo}
          value={valores.codigoActividad}
          onChange={(e) => actualizarCampo('codigoActividad', e.target.value)}
          error={erroresCampo.codigoActividad}
          placeholder="ACT-001"
        />

        <Input
          label="Nombre de la actividad"
          required
          minLength={3}
          maxLength={LIMITES.nombre}
          value={valores.nombreActividad}
          onChange={(e) => actualizarCampo('nombreActividad', e.target.value)}
          error={erroresCampo.nombreActividad}
        />
        <Textarea
          label="Descripción"
          rows={3}
          value={valores.descripcion}
          onChange={(e) => actualizarCampo('descripcion', e.target.value)}
          error={erroresCampo.descripcion}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Prioridad"
            required
            value={valores.prioridad}
            onChange={(e) => actualizarCampo('prioridad', e.target.value)}
          >
            {NIVELES_CRITICIDAD.map((nivel) => (
              <option key={nivel} value={nivel}>{nivel}</option>
            ))}
          </Select>

          {!esEdicion && (
            <Select
              label="Desarrollador"
              hint="Opcional -- si no eliges, queda pendiente de asignación"
              value={valores.idUsuario}
              onChange={(e) => actualizarCampo('idUsuario', e.target.value)}
            >
              <option value="">Sin asignar</option>
              {equipoVigente.map((a) => (
                <option key={a.usuario.idUsuario} value={a.usuario.idUsuario}>
                  {a.usuario.nombres} {a.usuario.apellidos} — {a.rolProyecto}
                </option>
              ))}
            </Select>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            {esEdicion ? 'Guardar cambios' : 'Crear actividad'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
