import { useEffect, useState, type ReactNode } from 'react';
import { FolderKanban, Activity, Bug, Users, CheckCircle2, MessageSquare, Zap } from 'lucide-react';
import { MetricCard } from '../components/ui/DataDisplay';
import { Alert } from '../components/ui/Feedback';
import { DistribucionBarChart, type BarraDato } from '../components/charts/DistribucionBarChart';
import { TendenciaDiariaChart } from '../components/charts/TendenciaDiariaChart';
import { FeedActividadReciente } from '../components/charts/FeedActividadReciente';
import { RankingList } from '../components/charts/RankingList';
import { useAuth } from '../context/AuthContext';
import { useCarga } from '../hooks/useCarga';
import { CODIGO_ROL } from '../types/usuario';
import { obtenerMetricasCoordinador, obtenerMetricasLider, obtenerMetricasDesarrollador } from '../services/metricas';
import type { BarraDatoApi, MetricasResponse } from '../types/metrica';

const COLOR_SEVERIDAD: Record<string, string> = {
  'Baja': 'var(--muted-fg)',
  'Media': 'var(--info)',
  'Alta': 'var(--warning)',
  'Crítica': 'var(--error)',
};

const COLOR_ESTADO_ERROR: Record<string, string> = {
  'Abierto': 'var(--warning)',
  'En progreso': 'var(--info)',
  'Resuelto': 'var(--success)',
  'Descartado': 'var(--muted-fg)',
};

const COLOR_ESTADO_ACTIVIDAD: Record<string, string> = {
  'Pendiente de asignación': 'var(--muted-fg)',
  'Pendiente': 'var(--text-tertiary)',
  'En desarrollo': 'var(--info)',
  'Finalizada': 'var(--success)',
  'Cancelada': 'var(--error)',
};

const COLOR_ESTADO_PROYECTO: Record<string, string> = {
  'Planeación': 'var(--text-tertiary)',
  'En ejecución': 'var(--info)',
  'Finalizado': 'var(--success)',
  'Suspendido': 'var(--warning)',
  'Cancelado': 'var(--error)',
};

// El backend manda label + value; el ícono es puramente de presentación,
// así que se resuelve acá por label en vez de duplicar un mapeo en Java.
const ICONO_POR_LABEL: Record<string, ReactNode> = {
  'Proyectos activos': <FolderKanban size={15} />,
  'Mis proyectos activos': <FolderKanban size={15} />,
  'Proyectos en los que participo': <FolderKanban size={15} />,
  'Actividades pendientes': <Activity size={15} />,
  'Actividades finalizadas': <CheckCircle2 size={15} />,
  'Errores abiertos': <Bug size={15} />,
  'Mis errores abiertos': <Bug size={15} />,
  'Equipo (usuarios activos)': <Users size={15} />,
  'Mi equipo': <Users size={15} />,
  'Mensajes no leídos': <MessageSquare size={15} />,
  'Minutos perdidos (interrupciones)': <Zap size={15} />,
};

function conColor(datos: BarraDatoApi[], colores: Record<string, string>): BarraDato[] {
  return datos.map((d) => ({ ...d, colorVar: colores[d.label] ?? 'var(--primary)' }));
}

export default function MetricasPage() {
  const { usuario } = useAuth();
  const [datos, setDatos] = useState<MetricasResponse | null>(null);
  const { cargando, error, ejecutar } = useCarga();

  useEffect(() => {
    if (!usuario) return;

    ejecutar(async () => {
      let resultado: MetricasResponse;
      if (usuario.rol.codigoRol === CODIGO_ROL.COORDINADOR) {
        resultado = await obtenerMetricasCoordinador();
      } else if (usuario.rol.codigoRol === CODIGO_ROL.LIDER_PROYECTO) {
        resultado = await obtenerMetricasLider();
      } else {
        resultado = await obtenerMetricasDesarrollador();
      }
      setDatos(resultado);
    });
  }, [usuario, ejecutar]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="type-h1 text-[var(--text-primary)]">Métricas</h1>
        <p className="type-body text-[var(--text-secondary)] mt-1">
          Esto es lo que está pasando {usuario?.rol.codigoRol === CODIGO_ROL.COORDINADOR ? 'en la empresa' : 'contigo'} hoy.
        </p>
      </div>

      {error ? (
        <Alert variant="error" title="No se pudieron cargar las métricas">
          {error}
        </Alert>
      ) : cargando || !datos ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Cargando métricas...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {datos.cards.map((m) => (
              <MetricCard key={m.label} label={m.label} value={m.value} icon={ICONO_POR_LABEL[m.label] ?? <Activity size={15} />} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DistribucionBarChart titulo="Errores por severidad" datos={conColor(datos.erroresPorSeveridad, COLOR_SEVERIDAD)} />
            <DistribucionBarChart titulo="Errores por estado" datos={conColor(datos.erroresPorEstado, COLOR_ESTADO_ERROR)} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DistribucionBarChart titulo="Actividades por estado" datos={conColor(datos.actividadesPorEstado, COLOR_ESTADO_ACTIVIDAD)} />
            <TendenciaDiariaChart titulo="Actividades finalizadas (últimos 14 días)" datos={datos.tendenciaFinalizadas} />
          </div>

          {datos.proyectosPorEstado && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <DistribucionBarChart titulo="Proyectos por estado" datos={conColor(datos.proyectosPorEstado, COLOR_ESTADO_PROYECTO)} />
              <RankingList
                titulo="Proyectos con más errores abiertos"
                items={datos.rankingErroresPorProyecto ?? []}
                emptyMessage="Ningún proyecto tiene errores abiertos."
              />
            </div>
          )}

          <FeedActividadReciente items={datos.feed} />
        </>
      )}
    </div>
  );
}
