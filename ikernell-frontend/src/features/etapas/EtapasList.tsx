import { useEffect, useState } from 'react';
import { formatFecha } from '../../utils/formatDate';
import { Plus, Pencil, ListChecks, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/FormControls';
import { Alert, ConfirmDialog } from '../../components/ui/Feedback';
import { EtapaFormModal } from './EtapaFormModal';
import { ActividadesEtapaModal } from '../actividades/ActividadesEtapaModal';
import { useAuth } from '../../context/AuthContext';
import { CODIGO_ROL } from '../../types/usuario';
import { ApiRequestError } from '../../types/api';
import {
  listarEtapasPorProyecto,
  crearEtapa,
  actualizarEtapa,
  cambiarEstadoEtapa,
  eliminarEtapa,
} from '../../services/etapas';
import { ESTADOS_ETAPA } from '../../types/etapa';
import type { EtapaResponse, EtapaRequest, EstadoEtapa } from '../../types/etapa';

const variantePorEstado: Record<EstadoEtapa, 'default' | 'success' | 'info'> = {
  'Pendiente': 'default',
  'En ejecución': 'info',
  'Finalizada': 'success',
};

interface EtapasListProps {
  idProyecto: number;
}

export function EtapasList({ idProyecto }: EtapasListProps) {
  const { usuario } = useAuth();
  const puedeGestionar =
    usuario?.rol.codigoRol === CODIGO_ROL.COORDINADOR || usuario?.rol.codigoRol === CODIGO_ROL.LIDER_PROYECTO;

  const [etapas, setEtapas] = useState<EtapaResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [etapaEditando, setEtapaEditando] = useState<EtapaResponse | null>(null);
  const [etapaActividades, setEtapaActividades] = useState<EtapaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [etapaAEliminar, setEtapaAEliminar] = useState<EtapaResponse | null>(null);

  const cargar = async () => {
    setCargando(true);
    try {
      const resp = await listarEtapasPorProyecto(idProyecto);
      setEtapas(resp.slice().sort((a, b) => a.orden - b.orden));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idProyecto]);

  const siguienteOrdenSugerido = etapas.length > 0 ? Math.max(...etapas.map((e) => e.orden)) + 1 : 1;

  const alGuardar = async (request: EtapaRequest) => {
    if (etapaEditando) {
      await actualizarEtapa(etapaEditando.idEtapa, request);
    } else {
      await crearEtapa(request);
    }
    setModalAbierto(false);
    setEtapaEditando(null);
    await cargar();
  };

  const alCambiarEstado = async (etapa: EtapaResponse, estado: string) => {
    setError(null);
    try {
      await cambiarEstadoEtapa(etapa.idEtapa, estado as EstadoEtapa);
      await cargar();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo cambiar el estado.');
    }
  };

  const alEliminar = (etapa: EtapaResponse) => {
    setError(null);
    setEtapaAEliminar(etapa);
  };

  const confirmarEliminar = async () => {
    if (!etapaAEliminar) return;
    try {
      await eliminarEtapa(etapaAEliminar.idEtapa);
      setEtapaAEliminar(null);
      await cargar();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo eliminar la etapa.');
      setEtapaAEliminar(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {error && <Alert variant="error" title="No se pudo completar la acción">{error}</Alert>}

      <div className="flex items-center justify-between">
        <h3 className="type-h4 text-[var(--text-primary)]">Etapas del proyecto</h3>
        {puedeGestionar && (
          <Button
            size="sm"
            onClick={() => {
              setEtapaEditando(null);
              setModalAbierto(true);
            }}
          >
            <Plus size={14} />
            Nueva etapa
          </Button>
        )}
      </div>

      {cargando ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Cargando etapas...</p>
      ) : etapas.length === 0 ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">
          Este proyecto todavía no tiene etapas registradas.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {etapas.map((etapa) => (
            <Card key={etapa.idEtapa}>
              <CardContent className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex items-center justify-center size-7 rounded-full bg-[var(--muted)] type-code text-[var(--text-secondary)] shrink-0">
                    {etapa.orden}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="type-body text-[var(--text-primary)] truncate">{etapa.nombreEtapa}</span>
                    <span className="type-caption text-[var(--text-tertiary)]">
                      {etapa.codigoEtapa} · {formatFecha(etapa.fechaInicio)} → {formatFecha(etapa.fechaFin)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => setEtapaActividades(etapa)}>
                    <ListChecks size={14} />
                    Actividades
                  </Button>

                  {puedeGestionar ? (
                    <div className="w-40">
                      <Select value={etapa.estado} onChange={(e) => alCambiarEstado(etapa, e.target.value)}>
                        {ESTADOS_ETAPA.map((estado) => (
                          <option key={estado} value={estado}>{estado}</option>
                        ))}
                      </Select>
                    </div>
                  ) : (
                    <Badge variant={variantePorEstado[etapa.estado]}>{etapa.estado}</Badge>
                  )}

                  {puedeGestionar && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEtapaEditando(etapa);
                        setModalAbierto(true);
                      }}
                    >
                      <Pencil size={14} />
                    </Button>
                  )}

                  {puedeGestionar && (
                    <Button variant="ghost" size="sm" onClick={() => alEliminar(etapa)}>
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {puedeGestionar && (
        <EtapaFormModal
          open={modalAbierto}
          idProyecto={idProyecto}
          etapaEditando={etapaEditando}
          siguienteOrdenSugerido={siguienteOrdenSugerido}
          onClose={() => {
            setModalAbierto(false);
            setEtapaEditando(null);
          }}
          onGuardar={alGuardar}
        />
      )}

      {etapaActividades && (
        <ActividadesEtapaModal
          open={Boolean(etapaActividades)}
          idEtapa={etapaActividades.idEtapa}
          idProyecto={idProyecto}
          nombreEtapa={etapaActividades.nombreEtapa}
          onClose={() => setEtapaActividades(null)}
        />
      )}

      <ConfirmDialog
        open={Boolean(etapaAEliminar)}
        title={`¿Eliminar la etapa "${etapaAEliminar?.nombreEtapa}"?`}
        description="Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        variant="destructive"
        onConfirm={confirmarEliminar}
        onCancel={() => setEtapaAEliminar(null)}
      />
    </div>
  );
}
