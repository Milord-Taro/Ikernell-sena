import { useEffect, useState, type ReactNode } from 'react';
import { FolderKanban, Activity, Bug, Users, CheckCircle2, MessageSquare, Zap } from 'lucide-react';
import { MetricCard } from '../components/ui/DataDisplay';
import { DistribucionBarChart, type BarraDato } from '../components/charts/DistribucionBarChart';
import { TendenciaDiariaChart, type PuntoDiario } from '../components/charts/TendenciaDiariaChart';
import { FeedActividadReciente, type ItemFeed } from '../components/charts/FeedActividadReciente';
import { RankingList, type ItemRanking } from '../components/charts/RankingList';
import { useAuth } from '../context/AuthContext';
import { CODIGO_ROL } from '../types/usuario';
import { listarProyectos } from '../services/proyectos';
import { listarTodasLasActividades, listarActividadesPorUsuario } from '../services/actividades';
import { listarRegistrosError } from '../services/registrosError';
import { listarInterrupciones } from '../services/interrupciones';
import { listarUsuarios } from '../services/usuarios';
import { listarMensajes } from '../services/mensajes';
import { listarAsignacionesPorProyecto } from '../services/asignaciones';
import type { ActividadResponse, EstadoActividad } from '../types/actividad';
import type { RegistroErrorResponse, EstadoRegistroError } from '../types/registroError';
import type { InterrupcionResponse } from '../types/interrupcion';

const PENDIENTES: EstadoActividad[] = ['Pendiente', 'En desarrollo'];
const ABIERTOS: EstadoRegistroError[] = ['Abierto', 'En progreso'];

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

interface Metrica {
  label: string;
  value: number;
  icon: ReactNode;
}

interface DatosMetricas {
  cards: Metrica[];
  erroresPorSeveridad: BarraDato[];
  erroresPorEstado: BarraDato[];
  actividadesPorEstado: BarraDato[];
  /** Solo Coordinador -- para Líder/Desarrollador no aporta (ven pocos proyectos, o los propios). */
  proyectosPorEstado?: BarraDato[];
  /** Solo Coordinador -- ranking org-wide, no tiene sentido acotado a un solo Líder/Desarrollador. */
  rankingErroresPorProyecto?: ItemRanking[];
  tendenciaFinalizadas: PuntoDiario[];
  feed: ItemFeed[];
}

function minutosInterrupcionDe(interrupciones: InterrupcionResponse[]): number {
  return interrupciones.reduce((total, i) => total + i.duracionMinutos, 0);
}

function contarPor<T>(items: T[], claves: string[], obtenerClave: (item: T) => string, colores: Record<string, string>): BarraDato[] {
  const conteo = new Map<string, number>();
  claves.forEach((c) => conteo.set(c, 0));
  items.forEach((item) => {
    const clave = obtenerClave(item);
    conteo.set(clave, (conteo.get(clave) ?? 0) + 1);
  });
  return claves.map((c) => ({ label: c, value: conteo.get(c) ?? 0, colorVar: colores[c] ?? 'var(--primary)' }));
}

const FORMATO_DIA = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'numeric' });

function ultimosNDias(n: number): { clave: string; etiqueta: string }[] {
  const dias: { clave: string; etiqueta: string }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dias.push({ clave: d.toISOString().slice(0, 10), etiqueta: FORMATO_DIA.format(d) });
  }
  return dias;
}

function tendenciaFinalizadasDe(actividades: ActividadResponse[]): PuntoDiario[] {
  const dias = ultimosNDias(14);
  const finalizadasPorDia = new Map<string, number>();
  actividades
    .filter((a) => a.estado === 'Finalizada' && a.fechaFinalizacion)
    .forEach((a) => {
      const clave = a.fechaFinalizacion!.slice(0, 10);
      finalizadasPorDia.set(clave, (finalizadasPorDia.get(clave) ?? 0) + 1);
    });
  return dias.map((d) => ({ etiqueta: d.etiqueta, value: finalizadasPorDia.get(d.clave) ?? 0 }));
}

function feedDe(
  errores: RegistroErrorResponse[],
  interrupciones: InterrupcionResponse[],
  mensajes: { idMensajeContacto: number; asunto: string; nombreRemitente: string; fechaEnvio: string }[] = [],
): ItemFeed[] {
  const items: ItemFeed[] = [
    ...errores.map((e) => ({
      id: `error-${e.idRegistroError}`,
      tipo: 'error' as const,
      titulo: e.titulo,
      detalle: `${e.actividad.nombreActividad} · ${e.severidad}`,
      fecha: e.fechaRegistro,
    })),
    ...interrupciones.map((i) => ({
      id: `interrupcion-${i.idInterrupcion}`,
      tipo: 'interrupcion' as const,
      titulo: i.tipoInterrupcion.nombreTipoInterrupcion,
      detalle: `${i.actividad.nombreActividad} · ${i.duracionMinutos} min`,
      fecha: i.fechaRegistro,
    })),
    ...mensajes.map((m) => ({
      id: `mensaje-${m.idMensajeContacto}`,
      tipo: 'mensaje' as const,
      titulo: m.asunto,
      detalle: `De: ${m.nombreRemitente}`,
      fecha: m.fechaEnvio,
    })),
  ];

  return items.sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 8);
}

/** Org-wide: mismo número para cualquier Coordinador. */
async function metricasCoordinador(): Promise<DatosMetricas> {
  const [proyectos, actividades, errores, interrupciones, usuarios, mensajesPendientes, mensajesRecientes] =
    await Promise.all([
      listarProyectos(),
      listarTodasLasActividades(),
      listarRegistrosError(),
      listarInterrupciones(),
      listarUsuarios(),
      listarMensajes('Pendiente'),
      listarMensajes(),
    ]);

  const cards: Metrica[] = [
    { label: 'Proyectos activos', value: proyectos.filter((p) => p.estado === 'En ejecución').length, icon: <FolderKanban size={15} /> },
    { label: 'Actividades pendientes', value: actividades.filter((a) => PENDIENTES.includes(a.estado)).length, icon: <Activity size={15} /> },
    { label: 'Errores abiertos', value: errores.filter((e) => ABIERTOS.includes(e.estado)).length, icon: <Bug size={15} /> },
    { label: 'Equipo (usuarios activos)', value: usuarios.filter((u) => u.activo).length, icon: <Users size={15} /> },
    { label: 'Mensajes pendientes', value: mensajesPendientes.length, icon: <MessageSquare size={15} /> },
    { label: 'Minutos perdidos (interrupciones)', value: minutosInterrupcionDe(interrupciones), icon: <Zap size={15} /> },
  ];

  const erroresAbiertosPorProyecto = new Map<number, number>();
  errores
    .filter((e) => ABIERTOS.includes(e.estado))
    .forEach((e) => {
      const idProyecto = e.actividad.etapa.proyecto.idProyecto;
      erroresAbiertosPorProyecto.set(idProyecto, (erroresAbiertosPorProyecto.get(idProyecto) ?? 0) + 1);
    });

  const rankingErroresPorProyecto: ItemRanking[] = proyectos
    .map((p) => ({ id: p.idProyecto, label: p.nombreProyecto, value: erroresAbiertosPorProyecto.get(p.idProyecto) ?? 0 }))
    .filter((r) => r.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return {
    cards,
    erroresPorSeveridad: contarPor(errores, ['Baja', 'Media', 'Alta', 'Crítica'], (e) => e.severidad, COLOR_SEVERIDAD),
    erroresPorEstado: contarPor(errores, ['Abierto', 'En progreso', 'Resuelto', 'Descartado'], (e) => e.estado, COLOR_ESTADO_ERROR),
    actividadesPorEstado: contarPor(
      actividades,
      ['Pendiente de asignación', 'Pendiente', 'En desarrollo', 'Finalizada', 'Cancelada'],
      (a) => a.estado,
      COLOR_ESTADO_ACTIVIDAD,
    ),
    proyectosPorEstado: contarPor(
      proyectos,
      ['Planeación', 'En ejecución', 'Finalizado', 'Suspendido', 'Cancelado'],
      (p) => p.estado,
      COLOR_ESTADO_PROYECTO,
    ),
    rankingErroresPorProyecto,
    tendenciaFinalizadas: tendenciaFinalizadasDe(actividades),
    feed: feedDe(errores, interrupciones, mensajesRecientes),
  };
}

/** Acotado a SUS proyectos (donde es líder vigente), no org-wide. */
async function metricasLider(idUsuario: number): Promise<DatosMetricas> {
  const [proyectos, actividadesTodas, erroresTodos, interrupcionesTodas] = await Promise.all([
    listarProyectos(),
    listarTodasLasActividades(),
    listarRegistrosError(),
    listarInterrupciones(),
  ]);

  const misProyectos = proyectos.filter((p) => p.liderActual?.idUsuario === idUsuario);
  const misIds = new Set(misProyectos.map((p) => p.idProyecto));

  const actividades = actividadesTodas.filter((a) => misIds.has(a.etapa.proyecto.idProyecto));
  const errores = erroresTodos.filter((e) => misIds.has(e.actividad.etapa.proyecto.idProyecto));
  const interrupciones = interrupcionesTodas.filter((i) => misIds.has(i.actividad.etapa.proyecto.idProyecto));

  const asignacionesPorProyecto = await Promise.all(
    misProyectos.map((p) => listarAsignacionesPorProyecto(p.idProyecto)),
  );
  const idsEquipo = new Set(
    asignacionesPorProyecto.flat().filter((a) => !a.fechaDesvinculacion).map((a) => a.usuario.idUsuario),
  );

  const cards: Metrica[] = [
    { label: 'Mis proyectos activos', value: misProyectos.filter((p) => p.estado === 'En ejecución').length, icon: <FolderKanban size={15} /> },
    { label: 'Actividades pendientes', value: actividades.filter((a) => PENDIENTES.includes(a.estado)).length, icon: <Activity size={15} /> },
    { label: 'Errores abiertos', value: errores.filter((e) => ABIERTOS.includes(e.estado)).length, icon: <Bug size={15} /> },
    { label: 'Mi equipo', value: idsEquipo.size, icon: <Users size={15} /> },
    { label: 'Minutos perdidos (interrupciones)', value: minutosInterrupcionDe(interrupciones), icon: <Zap size={15} /> },
  ];

  return {
    cards,
    erroresPorSeveridad: contarPor(errores, ['Baja', 'Media', 'Alta', 'Crítica'], (e) => e.severidad, COLOR_SEVERIDAD),
    erroresPorEstado: contarPor(errores, ['Abierto', 'En progreso', 'Resuelto', 'Descartado'], (e) => e.estado, COLOR_ESTADO_ERROR),
    actividadesPorEstado: contarPor(
      actividades,
      ['Pendiente de asignación', 'Pendiente', 'En desarrollo', 'Finalizada', 'Cancelada'],
      (a) => a.estado,
      COLOR_ESTADO_ACTIVIDAD,
    ),
    tendenciaFinalizadas: tendenciaFinalizadasDe(actividades),
    feed: feedDe(errores, interrupciones),
  };
}

/** Todo acotado a lo que tiene asignado el propio Desarrollador. */
async function metricasDesarrollador(idUsuario: number): Promise<DatosMetricas> {
  const [misActividades, erroresTodos, interrupcionesTodas] = await Promise.all([
    listarActividadesPorUsuario(idUsuario),
    listarRegistrosError(),
    listarInterrupciones(),
  ]);

  const misErrores = erroresTodos.filter((e) => e.actividad.usuario?.idUsuario === idUsuario);
  const misInterrupciones = interrupcionesTodas.filter((i) => i.actividad.usuario?.idUsuario === idUsuario);
  const misProyectos = new Set(misActividades.map((a) => a.etapa.proyecto.idProyecto));

  const cards: Metrica[] = [
    { label: 'Actividades pendientes', value: misActividades.filter((a) => PENDIENTES.includes(a.estado)).length, icon: <Activity size={15} /> },
    { label: 'Actividades finalizadas', value: misActividades.filter((a) => a.estado === 'Finalizada').length, icon: <CheckCircle2 size={15} /> },
    { label: 'Mis errores abiertos', value: misErrores.filter((e) => ABIERTOS.includes(e.estado)).length, icon: <Bug size={15} /> },
    { label: 'Proyectos en los que participo', value: misProyectos.size, icon: <FolderKanban size={15} /> },
    { label: 'Minutos perdidos (interrupciones)', value: minutosInterrupcionDe(misInterrupciones), icon: <Zap size={15} /> },
  ];

  return {
    cards,
    erroresPorSeveridad: contarPor(misErrores, ['Baja', 'Media', 'Alta', 'Crítica'], (e) => e.severidad, COLOR_SEVERIDAD),
    erroresPorEstado: contarPor(misErrores, ['Abierto', 'En progreso', 'Resuelto', 'Descartado'], (e) => e.estado, COLOR_ESTADO_ERROR),
    actividadesPorEstado: contarPor(
      misActividades,
      ['Pendiente de asignación', 'Pendiente', 'En desarrollo', 'Finalizada', 'Cancelada'],
      (a) => a.estado,
      COLOR_ESTADO_ACTIVIDAD,
    ),
    tendenciaFinalizadas: tendenciaFinalizadasDe(misActividades),
    feed: feedDe(misErrores, misInterrupciones),
  };
}

export default function MetricasPage() {
  const { usuario } = useAuth();
  const [datos, setDatos] = useState<DatosMetricas | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!usuario) return;

    let vigente = true;
    setCargando(true);

    const cargar = async () => {
      let resultado: DatosMetricas;
      if (usuario.rol.codigoRol === CODIGO_ROL.COORDINADOR) {
        resultado = await metricasCoordinador();
      } else if (usuario.rol.codigoRol === CODIGO_ROL.LIDER_PROYECTO) {
        resultado = await metricasLider(usuario.idUsuario);
      } else {
        resultado = await metricasDesarrollador(usuario.idUsuario);
      }
      if (vigente) {
        setDatos(resultado);
        setCargando(false);
      }
    };

    cargar();
    return () => {
      vigente = false;
    };
  }, [usuario]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="type-h1 text-[var(--text-primary)]">Métricas</h1>
        <p className="type-body text-[var(--text-secondary)] mt-1">
          Esto es lo que está pasando {usuario?.rol.codigoRol === CODIGO_ROL.COORDINADOR ? 'en la empresa' : 'contigo'} hoy.
        </p>
      </div>

      {cargando || !datos ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Cargando métricas...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {datos.cards.map((m) => (
              <MetricCard key={m.label} label={m.label} value={m.value} icon={m.icon} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DistribucionBarChart titulo="Errores por severidad" datos={datos.erroresPorSeveridad} />
            <DistribucionBarChart titulo="Errores por estado" datos={datos.erroresPorEstado} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DistribucionBarChart titulo="Actividades por estado" datos={datos.actividadesPorEstado} />
            <TendenciaDiariaChart titulo="Actividades finalizadas (últimos 14 días)" datos={datos.tendenciaFinalizadas} />
          </div>

          {datos.proyectosPorEstado && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <DistribucionBarChart titulo="Proyectos por estado" datos={datos.proyectosPorEstado} />
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
