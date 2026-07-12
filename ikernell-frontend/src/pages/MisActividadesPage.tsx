import { useEffect, useMemo, useState } from 'react';
import { Bug, History, Zap } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Select, Textarea } from '../components/ui/FormControls';
import { Alert, ConfirmDialog } from '../components/ui/Feedback';
import { Modal } from '../components/ui/Modal';
import { Pagination } from '../components/ui/Pagination';
import { useAuth } from '../context/AuthContext';
import { ApiRequestError } from '../types/api';
import { listarActividadesPorUsuario, cambiarEstadoActividad } from '../services/actividades';
import { ESTADOS_ACTIVIDAD_SELECCIONABLES } from '../types/actividad';
import type { ActividadResponse, EstadoActividad } from '../types/actividad';
import { ActividadHistorialModal } from '../features/registros/ActividadHistorialModal';
import { RegistrarInterrupcionModal } from '../features/registros/RegistrarInterrupcionModal';

const variantePorPrioridad: Record<string, 'default' | 'warning' | 'error' | 'info'> = {
  'Baja': 'default',
  'Media': 'info',
  'Alta': 'warning',
  'Crítica': 'error',
};

const POR_PAGINA = 8;
const TODOS = 'Todos' as const;

/**
 * REGLA DE NEGOCIO: no asumir que el usuario entiende qué representa
 * cada dato solo por su posición visual. Cada valor va precedido de una
 * etiqueta textual explícita (Proyecto, Etapa, Descripción, Prioridad,
 * Plazo, Estado) -- alguien nuevo en el sistema no debería tener que
 * adivinar qué es "Levantamiento de requerimientos".
 */
export default function MisActividadesPage() {
  const { usuario } = useAuth();
  const [actividades, setActividades] = useState<ActividadResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actividadHistorial, setActividadHistorial] = useState<ActividadResponse | null>(null);
  const [actividadACancelar, setActividadACancelar] = useState<ActividadResponse | null>(null);
  const [actividadAFinalizar, setActividadAFinalizar] = useState<ActividadResponse | null>(null);
  const [notaFinalizacion, setNotaFinalizacion] = useState('');
  const [interrupcionModalAbierto, setInterrupcionModalAbierto] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState<EstadoActividad | typeof TODOS>(TODOS);
  const [filtroProyecto, setFiltroProyecto] = useState<number | typeof TODOS>(TODOS);
  const [pagina, setPagina] = useState(1);

  const cargar = async () => {
    if (!usuario) return;
    setCargando(true);
    try {
      const resp = await listarActividadesPorUsuario(usuario.idUsuario);
      setActividades(resp);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario?.idUsuario]);

  const aplicarCambioEstado = async (actividad: ActividadResponse, estado: EstadoActividad, nota?: string) => {
    setError(null);
    try {
      await cambiarEstadoActividad(actividad.idActividad, estado, nota);
      await cargar();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo cambiar el estado.');
    }
  };

  const alCambiarEstado = (actividad: ActividadResponse, estado: string) => {
    // Igual que con Proyecto: cancelar una actividad es de alto impacto
    // (queda bloqueada para el desarrollador de ahí en adelante) -- se
    // pide confirmación explícita antes de aplicarla.
    if (estado === 'Cancelada') {
      setActividadACancelar(actividad);
      return;
    }
    // Al finalizar, se ofrece dejar una nota de contexto (qué se hizo).
    if (estado === 'Finalizada') {
      setNotaFinalizacion('');
      setActividadAFinalizar(actividad);
      return;
    }
    aplicarCambioEstado(actividad, estado as EstadoActividad);
  };

  const alConfirmarCancelar = async () => {
    if (!actividadACancelar) return;
    await aplicarCambioEstado(actividadACancelar, 'Cancelada');
    setActividadACancelar(null);
  };

  const alConfirmarFinalizar = async () => {
    if (!actividadAFinalizar) return;
    await aplicarCambioEstado(actividadAFinalizar, 'Finalizada', notaFinalizacion || undefined);
    setActividadAFinalizar(null);
  };

  const alCambiarFiltroEstado = (valor: string) => {
    setFiltroEstado(valor as EstadoActividad | typeof TODOS);
    setPagina(1);
  };

  const alCambiarFiltroProyecto = (valor: string) => {
    setFiltroProyecto(valor === TODOS ? TODOS : Number(valor));
    setPagina(1);
  };

  const proyectos = useMemo(() => {
    const mapa = new Map<number, string>();
    actividades.forEach((a) => {
      const p = a.etapa.proyecto;
      mapa.set(p.idProyecto, p.nombreProyecto);
    });
    return [...mapa.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [actividades]);

  // NUEVO: entrada general para registrar interrupciones -- antes solo
  // existía un botón dentro de la vista de la etapa (en Proyectos), y
  // solo se veía si tenías actividades ahí. Acá, en un lugar único y
  // fácil de encontrar, se puede elegir cualquiera de tus actividades
  // activas de cualquier proyecto.
  const elegiblesParaInterrupcion = actividades.filter(
    (a) => a.estado !== 'Finalizada' && a.estado !== 'Cancelada',
  );

  const filtradas = actividades
    .filter((a) => filtroEstado === TODOS || a.estado === filtroEstado)
    .filter((a) => filtroProyecto === TODOS || a.etapa.proyecto.idProyecto === filtroProyecto);
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtradas.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="type-h3 text-[var(--text-primary)]">Mis actividades</h2>
          <p className="type-body-sm text-[var(--text-tertiary)]">
            Todo lo que tienes asignado, en cualquier proyecto.
          </p>
        </div>
        <div className="flex items-end gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => setInterrupcionModalAbierto(true)}>
            <Zap size={14} />
            Registrar interrupción
          </Button>
          <div className="w-56">
            <Select label="Proyecto" value={filtroProyecto} onChange={(e) => alCambiarFiltroProyecto(e.target.value)}>
              <option value={TODOS}>Todos los proyectos</option>
              {proyectos.map(([id, nombre]) => (
                <option key={id} value={id}>{nombre}</option>
              ))}
            </Select>
          </div>
          <div className="w-44">
            <Select label="Estado" value={filtroEstado} onChange={(e) => alCambiarFiltroEstado(e.target.value)}>
              <option value={TODOS}>Todos los estados</option>
              {ESTADOS_ACTIVIDAD_SELECCIONABLES.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {error && <Alert variant="error" title="No se pudo completar la acción">{error}</Alert>}

      {cargando ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Cargando actividades...</p>
      ) : actividades.length === 0 ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">
          No tienes actividades asignadas por ahora.
        </p>
      ) : filtradas.length === 0 ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">
          Ninguna actividad coincide con los filtros seleccionados.
        </p>
      ) : (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {visibles.map((actividad) => (
            <Card key={actividad.idActividad}>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <span className="type-body text-[var(--text-primary)]">{actividad.nombreActividad}</span>
                  <Badge variant={variantePorPrioridad[actividad.prioridad]} size="sm" className="shrink-0">
                    {actividad.prioridad}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Proyecto</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {actividad.etapa.proyecto.nombreProyecto}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Etapa</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {actividad.etapa.nombreEtapa}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Plazo</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {actividad.fechaInicio} → {actividad.fechaFin}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Estado actual</span>
                    <Badge variant="default" size="sm" className="w-fit">{actividad.estado}</Badge>
                  </div>
                </div>

                {actividad.descripcion && (
                  <div className="flex flex-col">
                    <span className="type-caption text-[var(--text-tertiary)]">Descripción</span>
                    <p className="type-body-sm text-[var(--text-secondary)]">{actividad.descripcion}</p>
                  </div>
                )}

                {actividad.notaFinalizacion && (
                  <div className="flex flex-col">
                    <span className="type-caption text-[var(--text-tertiary)]">Qué se hizo</span>
                    <p className="type-body-sm text-[var(--text-secondary)]">{actividad.notaFinalizacion}</p>
                    {actividad.fechaFinalizacion && (
                      <span className="type-caption text-[var(--text-tertiary)] mt-0.5">
                        Finalizada: {actividad.fechaFinalizacion}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-end justify-between gap-2 pt-1 border-t border-[var(--border)]">
                  <div className="w-40">
                    <Select
                      label="Cambiar estado"
                      value={actividad.estado}
                      disabled={
                        actividad.estado === 'Cancelada'
                        || actividad.etapa.proyecto.estado !== 'En ejecución'
                      }
                      hint={
                        actividad.estado === 'Cancelada'
                          ? 'Cancelada -- solo el Líder o el Coordinador pueden cambiarla.'
                          : actividad.etapa.proyecto.estado !== 'En ejecución'
                            ? `Proyecto en "${actividad.etapa.proyecto.estado}" -- no se puede ejecutar.`
                            : undefined
                      }
                      onChange={(e) => alCambiarEstado(actividad, e.target.value)}
                    >
                      {ESTADOS_ACTIVIDAD_SELECCIONABLES.map((estado) => (
                        <option key={estado} value={estado}>{estado}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Reportar error"
                      aria-label="Reportar error"
                      onClick={() => setActividadHistorial(actividad)}
                    >
                      <Bug size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setActividadHistorial(actividad)}>
                      <History size={14} />
                      Historial
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Pagination pagina={paginaActual} totalPaginas={totalPaginas} onCambiar={setPagina} />
        </>
      )}

      {actividadHistorial && (
        <ActividadHistorialModal
          open={Boolean(actividadHistorial)}
          actividad={actividadHistorial}
          onClose={() => setActividadHistorial(null)}
        />
      )}

      <RegistrarInterrupcionModal
        open={interrupcionModalAbierto}
        actividadesElegibles={elegiblesParaInterrupcion}
        onClose={() => setInterrupcionModalAbierto(false)}
        onRegistrado={cargar}
      />

      <ConfirmDialog
        open={actividadACancelar !== null}
        variant="destructive"
        title="¿Cancelar esta actividad?"
        description="Una vez cancelada, solo el Líder del proyecto o un Coordinador podrán volver a cambiar su estado."
        confirmLabel="Cancelar actividad"
        cancelLabel="Volver"
        onConfirm={alConfirmarCancelar}
        onCancel={() => setActividadACancelar(null)}
      />

      <Modal
        open={actividadAFinalizar !== null}
        onClose={() => setActividadAFinalizar(null)}
        title="Finalizar actividad"
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <Textarea
            label="Qué se hizo (opcional)"
            rows={4}
            value={notaFinalizacion}
            onChange={(e) => setNotaFinalizacion(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setActividadAFinalizar(null)}>Cancelar</Button>
            <Button onClick={alConfirmarFinalizar}>Finalizar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
