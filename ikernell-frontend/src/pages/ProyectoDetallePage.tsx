import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, User } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Select } from '../components/ui/FormControls';
import { Alert } from '../components/ui/Feedback';
import { Tabs } from '../components/layout/Navigation';
import { ProyectoFormModal } from '../features/proyectos/ProyectoFormModal';
import { EquipoProyecto } from '../features/proyectos/EquipoProyecto';
import { ReportesProyecto } from '../features/proyectos/ReportesProyecto';
import { EtapasList } from '../features/etapas/EtapasList';
import { obtenerProyectoPorId, actualizarProyecto, cambiarEstadoProyecto } from '../services/proyectos';
import { ApiRequestError } from '../types/api';
import { ESTADOS_PROYECTO } from '../types/proyecto';
import type { ProyectoResponse, EstadoProyecto } from '../types/proyecto';
import { useAuth } from '../context/AuthContext';
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
  const [cargando, setCargando] = useState(true);
  const [tabActiva, setTabActiva] = useState('etapas');
  const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    if (!idProyecto) return;
    setCargando(true);
    try {
      setProyecto(await obtenerProyectoPorId(Number(idProyecto)));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idProyecto]);

  const alCambiarEstado = async (estado: string) => {
    if (!proyecto) return;
    setError(null);
    try {
      const actualizado = await cambiarEstadoProyecto(proyecto.idProyecto, estado as EstadoProyecto);
      setProyecto(actualizado);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo cambiar el estado.');
    }
  };

  const alEditar = async (request: Parameters<typeof actualizarProyecto>[1]) => {
    if (!proyecto) return;
    const actualizado = await actualizarProyecto(proyecto.idProyecto, request);
    setProyecto(actualizado);
    setModalEdicionAbierto(false);
  };

  if (cargando) {
    return <p className="type-body text-[var(--text-secondary)]">Cargando proyecto...</p>;
  }

  if (!proyecto) {
    return <p className="type-body text-[var(--text-secondary)]">No se encontró el proyecto.</p>;
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
                <Select value={proyecto.estado} onChange={(e) => alCambiarEstado(e.target.value)}>
                  {ESTADOS_PROYECTO.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="type-label text-[var(--text-tertiary)]">Fecha de inicio</span>
              <span className="type-code text-[var(--text-primary)]">{proyecto.fechaInicio}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="type-label text-[var(--text-tertiary)]">Fecha de fin</span>
              <span className="type-code text-[var(--text-primary)]">{proyecto.fechaFin}</span>
            </div>
            <Badge variant={variantePorEstado[proyecto.estado]}>{proyecto.estado}</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs
        tabs={[
          { id: 'etapas', label: 'Etapas' },
          { id: 'equipo', label: 'Equipo' },
        ]}
        active={tabActiva}
        onChange={setTabActiva}
      />

      {tabActiva === 'etapas' && <EtapasList idProyecto={proyecto.idProyecto} />}
      {tabActiva === 'equipo' && <EquipoProyecto idProyecto={proyecto.idProyecto} />}

      <ProyectoFormModal
        open={modalEdicionAbierto}
        proyectoEditando={proyecto}
        onClose={() => setModalEdicionAbierto(false)}
        onGuardar={alEditar}
      />
    </div>
  );
}
