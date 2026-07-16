import { useEffect, useState } from 'react';
import { formatFecha } from '../utils/formatDate';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, User } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Select } from '../components/ui/FormControls';
import { Alert, ConfirmDialog } from '../components/ui/Feedback';
import { Tabs } from '../components/layout/Navigation';
import { ProyectoFormModal } from '../features/proyectos/ProyectoFormModal';
import { EquipoProyecto } from '../features/proyectos/EquipoProyecto';
import { ReportesProyecto } from '../features/proyectos/ReportesProyecto';
import { EtapasList } from '../features/etapas/EtapasList';
import { TimelineProyecto } from '../features/proyectos/TimelineProyecto';
import { obtenerProyectoPorId, actualizarProyecto, cambiarEstadoProyecto, eliminarProyecto } from '../services/proyectos';
import { ApiRequestError } from '../types/api';
import { ESTADOS_PROYECTO } from '../types/proyecto';
import type { ProyectoResponse, EstadoProyecto } from '../types/proyecto';
import { useAuth } from '../context/AuthContext';
import { useCarga } from '../hooks/useCarga';
import { CODIGO_ROL } from '../types/usuario';

const variantePorEstado: Record<EstadoProyecto, 'info' | 'success' | 'default' | 'warning' | 'error'> = {
  'Planeación': 'info',
  'En ejecución': 'success',
  'Finalizado': 'default',
  'Suspendido': 'warning',
  'Cancelado': 'error',
};

export default function ProyectoDetallePage() {
  const { idProyecto } = useParams<{ idProyecto: string }>();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [proyecto, setProyecto] = useState<ProyectoResponse | null>(null);
  const { cargando, error: errorCarga, ejecutar } = useCarga();
  const [tabActiva, setTabActiva] = useState('etapas');
  const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estadoAConfirmar, setEstadoAConfirmar] = useState<EstadoProyecto | null>(null);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const esCoordinador = usuario?.rol.codigoRol === CODIGO_ROL.COORDINADOR;
  const proyectoCancelado = proyecto?.estado === 'Cancelado';
  const estadoBloqueado = proyectoCancelado && !esCoordinador;

  const cargar = () => {
    if (!idProyecto) return;
    return ejecutar(async () => {
      setProyecto(await obtenerProyectoPorId(Number(idProyecto)));
    });
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idProyecto]);

  const aplicarCambioEstado = async (estado: EstadoProyecto) => {
    if (!proyecto) return;
    setError(null);
    try {
      const actualizado = await cambiarEstadoProyecto(proyecto.idProyecto, estado);
      setProyecto(actualizado);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo cambiar el estado.');
    }
  };

  const alCambiarEstado = (estado: string) => {
    // Cancelar un proyecto es una acción de alto impacto (bloquea el
    // estado para el líder de ahí en adelante) -- se pide confirmación
    // explícita antes de aplicarla, en vez de cambiarla directo con el select.
    if (estado === 'Cancelado') {
      setEstadoAConfirmar(estado as EstadoProyecto);
      return;
    }
    aplicarCambioEstado(estado as EstadoProyecto);
  };

  const alConfirmarCancelar = async () => {
    if (!estadoAConfirmar) return;
    await aplicarCambioEstado(estadoAConfirmar);
    setEstadoAConfirmar(null);
  };

  const alEliminar = async () => {
    if (!proyecto) return;
    setError(null);
    setEliminando(true);
    try {
      await eliminarProyecto(proyecto.idProyecto);
      navigate('/dashboard/proyectos');
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo eliminar el proyecto.');
    } finally {
      setEliminando(false);
      setModalEliminarAbierto(false);
    }
  };

  const alEditar = async (request: Parameters<typeof actualizarProyecto>[1]) => {
    if (!proyecto) return;
    const actualizado = await actualizarProyecto(proyecto.idProyecto, request);
    setProyecto(actualizado);
    setModalEdicionAbierto(false);
  };

  if (cargando) {
    return <p className="type-body-sm text-[var(--text-tertiary)]">Cargando proyecto...</p>;
  }

  if (!proyecto) {
    // CORREGIDO: antes "no encontrado" era el único mensaje posible acá,
    // sin distinguir "el proyecto no existe" (404) de "falló la petición"
    // (red caída, 500) -- ambos dejaban proyecto en null y se veían
    // idénticos para el usuario.
    return errorCarga ? (
      <Alert variant="error" title="No se pudo cargar el proyecto">
        {errorCarga}
      </Alert>
    ) : (
      <p className="type-body-sm text-[var(--text-tertiary)]">No se encontró el proyecto.</p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={() => navigate('/dashboard/proyectos')}
        className="flex items-center gap-1.5 type-body-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors w-fit"
      >
        <ArrowLeft size={14} />
        Volver a proyectos
      </button>

      {error && <Alert variant="error" title="No se pudo completar la acción">{error}</Alert>}

      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="type-id text-[var(--text-tertiary)]">{proyecto.codigoProyecto}</span>
              <h1 className="type-h1 text-[var(--text-primary)]">{proyecto.nombreProyecto}</h1>
              {proyecto.descripcion && (
                <p className="type-body text-[var(--text-secondary)] mt-1">{proyecto.descripcion}</p>
              )}
            </div>
            <div className="flex items-start gap-2 shrink-0">
              {usuario?.rol.codigoRol === CODIGO_ROL.LIDER_PROYECTO && (
                <ReportesProyecto idProyecto={proyecto.idProyecto} />
              )}
              <Button variant="outline" size="sm" onClick={() => setModalEdicionAbierto(true)}>
                <Pencil size={14} />
                Editar
              </Button>
              {proyectoCancelado && esCoordinador && (
                <Button variant="outline" size="sm" onClick={() => setModalEliminarAbierto(true)}>
                  <Trash2 size={14} />
                  Eliminar
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2 border-t border-[var(--border)] flex-wrap">
            <div className="flex flex-col gap-1">
              <span className="type-label text-[var(--text-tertiary)]">Líder</span>
              {proyecto.liderActual ? (
                <span className="flex items-center gap-1.5 type-body text-[var(--text-primary)]">
                  <User size={13} className="text-[var(--text-tertiary)]" />
                  {proyecto.liderActual.nombres} {proyecto.liderActual.apellidos}
                </span>
              ) : (
                <span className="type-body-sm text-[var(--text-tertiary)] italic">Sin asignar</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="type-label text-[var(--text-tertiary)]">Estado</span>
              <div className="w-48">
                <Select
                  value={proyecto.estado}
                  disabled={estadoBloqueado}
                  hint={estadoBloqueado ? 'Cancelado -- solo un Coordinador puede cambiarlo.' : undefined}
                  onChange={(e) => alCambiarEstado(e.target.value)}
                >
                  {ESTADOS_PROYECTO.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="type-label text-[var(--text-tertiary)]">Fecha de inicio</span>
              <span className="type-code text-[var(--text-primary)]">{formatFecha(proyecto.fechaInicio)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="type-label text-[var(--text-tertiary)]">Fecha de fin</span>
              <span className="type-code text-[var(--text-primary)]">{formatFecha(proyecto.fechaFin)}</span>
            </div>
            <Badge variant={variantePorEstado[proyecto.estado]}>{proyecto.estado}</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs
        tabs={[
          { id: 'etapas', label: 'Etapas' },
          { id: 'equipo', label: 'Equipo' },
          { id: 'timeline', label: 'Timeline' },
        ]}
        active={tabActiva}
        onChange={setTabActiva}
      />

      {tabActiva === 'etapas' && <EtapasList idProyecto={proyecto.idProyecto} />}
      {tabActiva === 'equipo' && <EquipoProyecto idProyecto={proyecto.idProyecto} />}
      {tabActiva === 'timeline' && <TimelineProyecto idProyecto={proyecto.idProyecto} />}

      <ProyectoFormModal
        open={modalEdicionAbierto}
        proyectoEditando={proyecto}
        onClose={() => setModalEdicionAbierto(false)}
        onGuardar={alEditar}
      />

      <ConfirmDialog
        open={estadoAConfirmar !== null}
        variant="destructive"
        title="¿Cancelar este proyecto?"
        description="Una vez cancelado, solo un Coordinador podrá volver a cambiar su estado o eliminarlo."
        confirmLabel="Cancelar proyecto"
        cancelLabel="Volver"
        onConfirm={alConfirmarCancelar}
        onCancel={() => setEstadoAConfirmar(null)}
      />

      <ConfirmDialog
        open={modalEliminarAbierto}
        variant="destructive"
        title="¿Eliminar este proyecto?"
        description="Esta acción no se puede deshacer. Solo es posible si el proyecto no tiene etapas ni equipo asignado."
        confirmLabel={eliminando ? 'Eliminando...' : 'Eliminar'}
        cancelLabel="Cancelar"
        onConfirm={alEliminar}
        onCancel={() => setModalEliminarAbierto(false)}
      />
    </div>
  );
}
