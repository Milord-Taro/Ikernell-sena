import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FolderKanban, Activity, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CODIGO_ROL } from '../types/usuario';
import { listarProyectos } from '../services/proyectos';
import { listarUsuarios } from '../services/usuarios';
import { listarTodasLasActividades } from '../services/actividades';
import type { ProyectoResponse } from '../types/proyecto';
import type { UsuarioResponse } from '../types/usuario';
import type { ActividadResponse } from '../types/actividad';

type TipoResultado = 'proyecto' | 'usuario' | 'actividad';

interface Resultado {
  id: string;
  tipo: TipoResultado;
  titulo: string;
  subtitulo: string;
  ir: () => void;
}

const iconoPorTipo: Record<TipoResultado, JSX.Element> = {
  proyecto: <FolderKanban size={14} className="text-[var(--text-tertiary)]" />,
  usuario: <Users size={14} className="text-[var(--text-tertiary)]" />,
  actividad: <Activity size={14} className="text-[var(--text-tertiary)]" />,
};

/**
 * Se abre con ⌘K/Ctrl+K (listener global) o haciendo click en el
 * buscador del Topbar (dispara el evento 'ikernell-abrir-busqueda' --
 * mismo patrón de eventos ya usado en el proyecto, ej. 'ikernell-auth-change').
 *
 * Sin endpoint de búsqueda dedicado: reutiliza los listados que ya
 * existen (GET /proyectos, /actividades, /usuarios) y filtra en el
 * cliente. No hay página de detalle de Usuario ni de Actividad
 * individual, así que:
 * - Proyecto -> su propio detalle
 * - Actividad -> el detalle del Proyecto al que pertenece (lo más
 *   cercano navegable que existe hoy)
 * - Usuario -> la lista de Usuarios (solo se ofrece si el rol puede
 *   entrar ahí, si no la ruta lo rebota)
 */
export function SearchCommand() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);
  const [consulta, setConsulta] = useState('');
  const [proyectos, setProyectos] = useState<ProyectoResponse[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
  const [actividades, setActividades] = useState<ActividadResponse[]>([]);
  const [cargado, setCargado] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const puedeVerUsuarios =
    usuario?.rol.codigoRol === CODIGO_ROL.COORDINADOR || usuario?.rol.codigoRol === CODIGO_ROL.LIDER_PROYECTO;

  const cargarDatos = async () => {
    const [proyectosResp, actividadesResp, usuariosResp] = await Promise.all([
      listarProyectos(),
      listarTodasLasActividades(),
      puedeVerUsuarios ? listarUsuarios() : Promise.resolve([]),
    ]);
    setProyectos(proyectosResp);
    setActividades(actividadesResp);
    setUsuarios(usuariosResp);
    setCargado(true);
  };

  const abrir = () => {
    setAbierto(true);
    setConsulta('');
    if (!cargado) cargarDatos();
  };

  useEffect(() => {
    const alTeclear = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        abrir();
      }
      if (e.key === 'Escape') setAbierto(false);
    };
    const alEventoPersonalizado = () => abrir();

    document.addEventListener('keydown', alTeclear);
    window.addEventListener('ikernell-abrir-busqueda', alEventoPersonalizado);
    return () => {
      document.removeEventListener('keydown', alTeclear);
      window.removeEventListener('ikernell-abrir-busqueda', alEventoPersonalizado);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cargado, puedeVerUsuarios]);

  useEffect(() => {
    if (abierto) {
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [abierto]);

  if (!abierto) return null;

  const texto = consulta.trim().toLowerCase();

  const resultados: Resultado[] =
    texto.length === 0
      ? []
      : [
          ...proyectos
            .filter((p) => `${p.codigoProyecto} ${p.nombreProyecto}`.toLowerCase().includes(texto))
            .map((p) => ({
              id: `proyecto-${p.idProyecto}`,
              tipo: 'proyecto' as const,
              titulo: p.nombreProyecto,
              subtitulo: p.codigoProyecto,
              ir: () => navigate(`/dashboard/proyectos/${p.idProyecto}`),
            })),
          ...(puedeVerUsuarios
            ? usuarios
                .filter((u) =>
                  `${u.codigoUsuario} ${u.nombres} ${u.apellidos} ${u.correoElectronico}`
                    .toLowerCase()
                    .includes(texto),
                )
                .map((u) => ({
                  id: `usuario-${u.idUsuario}`,
                  tipo: 'usuario' as const,
                  titulo: `${u.nombres} ${u.apellidos}`,
                  subtitulo: u.correoElectronico,
                  ir: () => navigate('/dashboard/usuarios'),
                }))
            : []),
          ...actividades
            .filter((a) => `${a.codigoActividad} ${a.nombreActividad}`.toLowerCase().includes(texto))
            .map((a) => ({
              id: `actividad-${a.idActividad}`,
              tipo: 'actividad' as const,
              titulo: a.nombreActividad,
              subtitulo: `${a.etapa.proyecto.nombreProyecto} · ${a.etapa.nombreEtapa}`,
              ir: () => navigate(`/dashboard/proyectos/${a.etapa.proyecto.idProyecto}`),
            })),
        ].slice(0, 20);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setAbierto(false)} />
      <div className="relative w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 h-12 border-b border-[var(--border)]">
          <Search size={15} className="text-[var(--text-tertiary)] shrink-0" />
          <input
            ref={inputRef}
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="Buscar proyectos, actividades..."
            className="flex-1 bg-transparent type-body text-[var(--text-primary)] focus:outline-none"
          />
          <span className="type-id text-[var(--text-tertiary)]">Esc</span>
        </div>

        <div className="max-h-80 overflow-y-auto py-1">
          {texto.length === 0 ? (
            <p className="type-body-sm text-[var(--text-tertiary)] px-4 py-6 text-center">
              Escribe para buscar en proyectos, actividades{puedeVerUsuarios ? ' y usuarios' : ''}.
            </p>
          ) : resultados.length === 0 ? (
            <p className="type-body-sm text-[var(--text-tertiary)] px-4 py-6 text-center">Sin resultados.</p>
          ) : (
            resultados.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  r.ir();
                  setAbierto(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[var(--muted)] transition-colors text-left"
              >
                {iconoPorTipo[r.tipo]}
                <div className="flex flex-col min-w-0">
                  <span className="type-body-sm text-[var(--text-primary)] truncate">{r.titulo}</span>
                  <span className="type-caption text-[var(--text-tertiary)] truncate">{r.subtitulo}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
