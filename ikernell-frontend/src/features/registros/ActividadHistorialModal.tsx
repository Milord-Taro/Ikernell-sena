import { useEffect, useState, type FormEvent } from 'react';
import { formatFechaHora } from '../../utils/formatDate';
import { Modal } from '../../components/ui/Modal';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/layout/Navigation';
import { Input, Textarea, Select } from '../../components/ui/FormControls';
import { Alert } from '../../components/ui/Feedback';
import { useCarga } from '../../hooks/useCarga';
import { ApiRequestError } from '../../types/api';
import { NIVELES_CRITICIDAD } from '../../types/actividad';
import type { ActividadResponse, NivelCriticidad } from '../../types/actividad';
import type { TipoErrorResponse } from '../../types/usuario';
import type { EstadoRegistroError, RegistroErrorResponse, RegistroErrorRequest } from '../../types/registroError';
import type { InterrupcionResponse } from '../../types/interrupcion';
import { tiposErrorService } from '../../services/catalogos';
import { listarRegistrosErrorPorActividad, crearRegistroError } from '../../services/registrosError';
import { listarInterrupcionesPorActividad } from '../../services/interrupciones';

const variantePorSeveridad: Record<NivelCriticidad, 'default' | 'warning' | 'error' | 'info'> = {
  'Baja': 'default',
  'Media': 'info',
  'Alta': 'warning',
  'Crítica': 'error',
};

const variantePorEstadoError: Record<EstadoRegistroError, 'default' | 'warning' | 'error' | 'info' | 'success'> = {
  'Abierto': 'error',
  'En progreso': 'warning',
  'Resuelto': 'success',
  'Descartado': 'default',
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
 *
 * CORREGIDO: "Interrupciones" pasó a ser solo consulta aquí -- una
 * interrupción no pertenece de forma natural a UNA actividad puntual (a
 * diferencia de un error, que sí es "de" lo que estabas haciendo). El
 * registro ahora se hace desde el modal de la Etapa
 * (RegistrarInterrupcionModal), donde se elige a cuál(es) actividad(es)
 * afectó.
 */
export function ActividadHistorialModal({ open, actividad, onClose }: ActividadHistorialModalProps) {
  const [tab, setTab] = useState('errores');

  const [tiposError, setTiposError] = useState<TipoErrorResponse[]>([]);
  const [registrosError, setRegistrosError] = useState<RegistroErrorResponse[]>([]);
  const [interrupciones, setInterrupciones] = useState<InterrupcionResponse[]>([]);
  const { cargando, error: errorCarga, ejecutar } = useCarga();
  const [error, setError] = useState<string | null>(null);

  const cargar = () =>
    ejecutar(async () => {
      const [tiposErrorResp, registrosResp, interrupcionesResp] = await Promise.all([
        tiposErrorService.listar(),
        listarRegistrosErrorPorActividad(actividad.idActividad),
        listarInterrupcionesPorActividad(actividad.idActividad),
      ]);
      setTiposError(tiposErrorResp.filter((t) => t.activo));
      setRegistrosError(registrosResp);
      setInterrupciones(interrupcionesResp);
    });

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
        {errorCarga && <Alert variant="error" title="No se pudo cargar el historial">{errorCarga}</Alert>}
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
          <SeccionInterrupciones registros={interrupciones} />
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
  const [idTipoError, setIdTipoError] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [severidad, setSeveridad] = useState<NivelCriticidad>('Media');
  const [guardando, setGuardando] = useState(false);

  const limpiar = () => {
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
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Badge variant={variantePorEstadoError[r.estado]} size="sm">{r.estado}</Badge>
                    <Badge variant={variantePorSeveridad[r.severidad]} size="sm">{r.severidad}</Badge>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="type-caption text-[var(--text-tertiary)]">Tipo de error</span>
                  <span className="type-body-sm text-[var(--text-secondary)]">{r.tipoError.nombreTipoError}</span>
                </div>
                <div className="flex flex-col">
                  <span className="type-caption text-[var(--text-tertiary)]">Descripción</span>
                  <p className="type-body-sm text-[var(--text-secondary)]">{r.descripcion}</p>
                </div>
                {r.notaResolucion && (
                  <div className="flex flex-col">
                    <span className="type-caption text-[var(--text-tertiary)]">
                      {r.estado === 'Descartado' ? 'Motivo de descarte' : 'Cómo se resolvió'}
                    </span>
                    <p className="type-body-sm text-[var(--text-secondary)]">{r.notaResolucion}</p>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="type-caption text-[var(--text-tertiary)]">
                    Creado por: {r.usuarioCreador ? `${r.usuarioCreador.nombres} ${r.usuarioCreador.apellidos}` : '—'}
                  </span>
                  <span className="type-caption text-[var(--text-tertiary)]">
                    Registrado: {formatFechaHora(r.fechaRegistro)}
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

/* ── Interrupciones (solo consulta) ──────────────────────────────────── */

interface SeccionInterrupcionesProps {
  registros: InterrupcionResponse[];
}

/**
 * Sin formulario de creación -- eso vive ahora en RegistrarInterrupcionModal,
 * a nivel de Etapa (ver ActividadesEtapaModal). Aquí solo se consulta el
 * historial de ESTA actividad puntual.
 */
function SeccionInterrupciones({ registros }: SeccionInterrupcionesProps) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="type-label text-[var(--text-tertiary)]">Historial de interrupciones</h4>
      <p className="type-body-sm text-[var(--text-tertiary)]">
        Para registrar una interrupción nueva, usa el botón "Registrar interrupción" en la vista de la etapa.
      </p>
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
              <span className="type-caption text-[var(--text-tertiary)]">
                Creado por: {r.usuarioCreador ? `${r.usuarioCreador.nombres} ${r.usuarioCreador.apellidos}` : '—'}
              </span>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
