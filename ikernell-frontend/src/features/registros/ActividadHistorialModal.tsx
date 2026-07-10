import { useEffect, useState, type FormEvent } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/layout/Navigation';
import { Input, Textarea, Select } from '../../components/ui/FormControls';
import { Alert } from '../../components/ui/Feedback';
import { ApiRequestError } from '../../types/api';
import { NIVELES_CRITICIDAD } from '../../types/actividad';
import type { ActividadResponse, NivelCriticidad } from '../../types/actividad';
import type { TipoErrorResponse, TipoInterrupcionResponse } from '../../types/usuario';
import type { RegistroErrorResponse, RegistroErrorRequest } from '../../types/registroError';
import type { InterrupcionResponse, InterrupcionRequest } from '../../types/interrupcion';
import { tiposErrorService, tiposInterrupcionService } from '../../services/catalogos';
import { listarRegistrosErrorPorActividad, crearRegistroError } from '../../services/registrosError';
import { listarInterrupcionesPorActividad, crearInterrupcion } from '../../services/interrupciones';

const variantePorSeveridad: Record<NivelCriticidad, 'default' | 'warning' | 'error' | 'info'> = {
  'Baja': 'default',
  'Media': 'info',
  'Alta': 'warning',
  'Crítica': 'error',
};

const tabsHistorial = [
  { id: 'errores', label: 'Errores' },
  { id: 'interrupciones', label: 'Interrupciones' },
];

interface ActividadHistorialModalProps {
  open: boolean;
  actividad: ActividadResponse;
  onClose: () => void;
}

/**
 * REGLA DE UI: cada dato lleva su etiqueta textual explícita -- nada se
 * infiere solo por posición (ver memoria de patrones del proyecto).
 */
export function ActividadHistorialModal({ open, actividad, onClose }: ActividadHistorialModalProps) {
  const [tab, setTab] = useState('errores');

  const [tiposError, setTiposError] = useState<TipoErrorResponse[]>([]);
  const [tiposInterrupcion, setTiposInterrupcion] = useState<TipoInterrupcionResponse[]>([]);
  const [registrosError, setRegistrosError] = useState<RegistroErrorResponse[]>([]);
  const [interrupciones, setInterrupciones] = useState<InterrupcionResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    setCargando(true);
    try {
      const [tiposErrorResp, tiposInterrupcionResp, registrosResp, interrupcionesResp] = await Promise.all([
        tiposErrorService.listar(),
        tiposInterrupcionService.listar(),
        listarRegistrosErrorPorActividad(actividad.idActividad),
        listarInterrupcionesPorActividad(actividad.idActividad),
      ]);
      setTiposError(tiposErrorResp.filter((t) => t.activo));
      setTiposInterrupcion(tiposInterrupcionResp.filter((t) => t.activo));
      setRegistrosError(registrosResp);
      setInterrupciones(interrupcionesResp);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (open) cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, actividad.idActividad]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Historial — ${actividad.nombreActividad}`}
      size="lg"
    >
      <div className="flex flex-col gap-4">
        {error && <Alert variant="error" title="No se pudo completar la acción">{error}</Alert>}

        <Tabs tabs={tabsHistorial} active={tab} onChange={setTab} variant="pill" />

        {cargando ? (
          <p className="type-body-sm text-[var(--text-tertiary)]">Cargando...</p>
        ) : tab === 'errores' ? (
          <SeccionErrores
            idActividad={actividad.idActividad}
            tiposError={tiposError}
            registros={registrosError}
            onError={setError}
            onRegistrado={cargar}
          />
        ) : (
          <SeccionInterrupciones
            idActividad={actividad.idActividad}
            tiposInterrupcion={tiposInterrupcion}
            registros={interrupciones}
            onError={setError}
            onRegistrado={cargar}
          />
        )}
      </div>
    </Modal>
  );
}

/* ── Errores ─────────────────────────────────────────────────────────── */

interface SeccionErroresProps {
  idActividad: number;
  tiposError: TipoErrorResponse[];
  registros: RegistroErrorResponse[];
  onError: (mensaje: string | null) => void;
  onRegistrado: () => Promise<void>;
}

function SeccionErrores({ idActividad, tiposError, registros, onError, onRegistrado }: SeccionErroresProps) {
  const [codigo, setCodigo] = useState('');
  const [idTipoError, setIdTipoError] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [severidad, setSeveridad] = useState<NivelCriticidad>('Media');
  const [guardando, setGuardando] = useState(false);

  const limpiar = () => {
    setCodigo('');
    setIdTipoError('');
    setTitulo('');
    setDescripcion('');
    setSeveridad('Media');
  };

  const alEnviar = async (evento: FormEvent) => {
    evento.preventDefault();
    onError(null);
    setGuardando(true);
    try {
      const request: RegistroErrorRequest = {
        codigoRegistroError: codigo,
        idActividad,
        idTipoError: Number(idTipoError),
        titulo,
        descripcion,
        severidad,
      };
      await crearRegistroError(request);
      limpiar();
      await onRegistrado();
    } catch (err) {
      onError(err instanceof ApiRequestError ? err.message : 'No se pudo registrar el error.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={alEnviar} className="flex flex-col gap-3">
        <div className="grid grid-cols-[1fr_1fr] gap-3">
          <Input
            label="Código del registro"
            required
            maxLength={20}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="ERR-001"
          />
          <Select
            label="Tipo de error"
            required
            value={idTipoError}
            onChange={(e) => setIdTipoError(e.target.value)}
          >
            <option value="">Seleccionar...</option>
            {tiposError.map((t) => (
              <option key={t.idTipoError} value={t.idTipoError}>{t.nombreTipoError}</option>
            ))}
          </Select>
        </div>

        <Input
          label="Título"
          required
          minLength={3}
          maxLength={100}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <Textarea
          label="Descripción"
          required
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <Select
          label="Severidad"
          required
          value={severidad}
          onChange={(e) => setSeveridad(e.target.value as NivelCriticidad)}
        >
          {NIVELES_CRITICIDAD.map((nivel) => (
            <option key={nivel} value={nivel}>{nivel}</option>
          ))}
        </Select>

        <div className="flex justify-end">
          <Button type="submit" size="sm" loading={guardando} disabled={!idTipoError}>
            Registrar error
          </Button>
        </div>
      </form>

      <div className="flex flex-col gap-2">
        <h4 className="type-label text-[var(--text-tertiary)]">Historial de errores</h4>
        {registros.length === 0 ? (
          <p className="type-body-sm text-[var(--text-tertiary)]">Todavía no se han registrado errores.</p>
        ) : (
          registros.map((r) => (
            <Card key={r.idRegistroError}>
              <CardContent className="flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="type-caption text-[var(--text-tertiary)]">Título</span>
                    <span className="type-body text-[var(--text-primary)]">{r.titulo}</span>
                  </div>
                  <Badge variant={variantePorSeveridad[r.severidad]} size="sm">{r.severidad}</Badge>
                </div>
                <div className="flex flex-col">
                  <span className="type-caption text-[var(--text-tertiary)]">Tipo de error</span>
                  <span className="type-body-sm text-[var(--text-secondary)]">{r.tipoError.nombreTipoError}</span>
                </div>
                <div className="flex flex-col">
                  <span className="type-caption text-[var(--text-tertiary)]">Descripción</span>
                  <p className="type-body-sm text-[var(--text-secondary)]">{r.descripcion}</p>
                </div>
                <span className="type-caption text-[var(--text-tertiary)]">
                  Registrado: {r.fechaRegistro}
                </span>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

/* ── Interrupciones ──────────────────────────────────────────────────── */

interface SeccionInterrupcionesProps {
  idActividad: number;
  tiposInterrupcion: TipoInterrupcionResponse[];
  registros: InterrupcionResponse[];
  onError: (mensaje: string | null) => void;
  onRegistrado: () => Promise<void>;
}

function SeccionInterrupciones({
  idActividad,
  tiposInterrupcion,
  registros,
  onError,
  onRegistrado,
}: SeccionInterrupcionesProps) {
  const [codigo, setCodigo] = useState('');
  const [idTipoInterrupcion, setIdTipoInterrupcion] = useState('');
  const [motivo, setMotivo] = useState('');
  const [duracionMinutos, setDuracionMinutos] = useState('');
  const [guardando, setGuardando] = useState(false);

  const limpiar = () => {
    setCodigo('');
    setIdTipoInterrupcion('');
    setMotivo('');
    setDuracionMinutos('');
  };

  const alEnviar = async (evento: FormEvent) => {
    evento.preventDefault();
    onError(null);
    setGuardando(true);
    try {
      const request: InterrupcionRequest = {
        codigoInterrupcion: codigo,
        idActividad,
        idTipoInterrupcion: Number(idTipoInterrupcion),
        motivo,
        duracionMinutos: Number(duracionMinutos),
      };
      await crearInterrupcion(request);
      limpiar();
      await onRegistrado();
    } catch (err) {
      onError(err instanceof ApiRequestError ? err.message : 'No se pudo registrar la interrupción.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={alEnviar} className="flex flex-col gap-3">
        <div className="grid grid-cols-[1fr_1fr] gap-3">
          <Input
            label="Código de la interrupción"
            required
            maxLength={20}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="INT-001"
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
        </div>

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

        <div className="flex justify-end">
          <Button type="submit" size="sm" loading={guardando} disabled={!idTipoInterrupcion}>
            Registrar interrupción
          </Button>
        </div>
      </form>

      <div className="flex flex-col gap-2">
        <h4 className="type-label text-[var(--text-tertiary)]">Historial de interrupciones</h4>
        {registros.length === 0 ? (
          <p className="type-body-sm text-[var(--text-tertiary)]">Todavía no se han registrado interrupciones.</p>
        ) : (
          registros.map((r) => (
            <Card key={r.idInterrupcion}>
              <CardContent className="flex flex-col gap-1.5">
                <div className="flex flex-col">
                  <span className="type-caption text-[var(--text-tertiary)]">Tipo de interrupción</span>
                  <span className="type-body text-[var(--text-primary)]">
                    {r.tipoInterrupcion.nombreTipoInterrupcion}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="type-caption text-[var(--text-tertiary)]">Motivo</span>
                  <p className="type-body-sm text-[var(--text-secondary)]">{r.motivo}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="type-caption text-[var(--text-tertiary)]">Duración</span>
                    <span className="type-body-sm text-[var(--text-secondary)]">{r.duracionMinutos} minutos</span>
                  </div>
                  <span className="type-caption text-[var(--text-tertiary)]">
                    Registrado: {r.fechaRegistro}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
