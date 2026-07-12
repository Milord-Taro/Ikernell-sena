import { useEffect, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Select, Textarea } from '../components/ui/FormControls';
import { Alert, ConfirmDialog } from '../components/ui/Feedback';
import { Modal } from '../components/ui/Modal';
import { Pagination } from '../components/ui/Pagination';
import { useAuth } from '../context/AuthContext';
import { CODIGO_ROL } from '../types/usuario';
import {
  listarRegistrosError,
  cambiarEstadoRegistroError,
  eliminarRegistroError,
} from '../services/registrosError';
import { ESTADOS_REGISTRO_ERROR, ESTADOS_CON_NOTA_RESOLUCION } from '../types/registroError';
import type { RegistroErrorResponse, EstadoRegistroError } from '../types/registroError';
import type { NivelCriticidad } from '../types/actividad';
import { ApiRequestError } from '../types/api';

const variantePorSeveridad: Record<NivelCriticidad, 'default' | 'warning' | 'error' | 'info'> = {
  'Baja': 'default',
  'Media': 'info',
  'Alta': 'warning',
  'Crítica': 'error',
};

const POR_PAGINA = 8;
const TODOS = 'Todos' as const;

/**
 * Registrar un error se sigue haciendo desde "Mis actividades"
 * (ActividadHistorialModal). Esta vista es de supervisión para
 * Coordinador/Líder: pueden ver todo y también actualizar el estado
 * (Abierto/En progreso/Resuelto/Descartado) sin restricción de rol,
 * igual que desde la propia actividad.
 */
export default function ErroresPage() {
  const { usuario } = useAuth();
  const [registros, setRegistros] = useState<RegistroErrorResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [estadoPendiente, setEstadoPendiente] = useState<
    { registro: RegistroErrorResponse; estado: EstadoRegistroError } | null
  >(null);
  const [notaResolucion, setNotaResolucion] = useState('');
  const [registroAEliminar, setRegistroAEliminar] = useState<RegistroErrorResponse | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<EstadoRegistroError | typeof TODOS>(TODOS);
  const [filtroProyecto, setFiltroProyecto] = useState<number | typeof TODOS>(TODOS);
  const [pagina, setPagina] = useState(1);

  const cargar = async () => {
    setCargando(true);
    try {
      const resp = await listarRegistrosError();
      setRegistros(resp);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const aplicarCambioEstado = async (registro: RegistroErrorResponse, estado: EstadoRegistroError, nota?: string) => {
    setError(null);
    try {
      await cambiarEstadoRegistroError(registro.idRegistroError, estado, nota);
      await cargar();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo cambiar el estado.');
    }
  };

  const alCambiarEstado = (registro: RegistroErrorResponse, estado: string) => {
    // Resuelto/Descartado piden una nota de contexto antes de aplicar --
    // el resto de transiciones se aplican directo.
    if (ESTADOS_CON_NOTA_RESOLUCION.includes(estado as EstadoRegistroError)) {
      setNotaResolucion('');
      setEstadoPendiente({ registro, estado: estado as EstadoRegistroError });
      return;
    }
    aplicarCambioEstado(registro, estado as EstadoRegistroError);
  };

  const confirmarNotaResolucion = async () => {
    if (!estadoPendiente) return;
    await aplicarCambioEstado(estadoPendiente.registro, estadoPendiente.estado, notaResolucion || undefined);
    setEstadoPendiente(null);
  };

  const confirmarEliminar = async () => {
    if (!registroAEliminar) return;
    setError(null);
    try {
      await eliminarRegistroError(registroAEliminar.idRegistroError);
      setRegistroAEliminar(null);
      await cargar();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo eliminar el registro.');
      setRegistroAEliminar(null);
    }
  };

  const puedeEliminar = (registro: RegistroErrorResponse) =>
    usuario?.rol.codigoRol === CODIGO_ROL.COORDINADOR
    || registro.usuarioCreador?.idUsuario === usuario?.idUsuario;

  const proyectos = useMemo(() => {
    const mapa = new Map<number, string>();
    registros.forEach((r) => {
      const p = r.actividad.etapa.proyecto;
      mapa.set(p.idProyecto, p.nombreProyecto);
    });
    return [...mapa.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [registros]);

  const filtrados = registros
    .filter((r) => filtroEstado === TODOS || r.estado === filtroEstado)
    .filter((r) => filtroProyecto === TODOS || r.actividad.etapa.proyecto.idProyecto === filtroProyecto);
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtrados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);

  const alCambiarFiltroEstado = (valor: string) => {
    setFiltroEstado(valor as EstadoRegistroError | typeof TODOS);
    setPagina(1);
  };

  const alCambiarFiltroProyecto = (valor: string) => {
    setFiltroProyecto(valor === TODOS ? TODOS : Number(valor));
    setPagina(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="type-h3 text-[var(--text-primary)]">Errores</h2>
          <p className="type-body-sm text-[var(--text-tertiary)]">
            Todos los errores registrados, en cualquier proyecto.
          </p>
        </div>
        <div className="flex items-end gap-2 flex-wrap">
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
              {ESTADOS_REGISTRO_ERROR.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {error && <Alert variant="error" title="No se pudo completar la acción">{error}</Alert>}

      {cargando ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Cargando errores...</p>
      ) : registros.length === 0 ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Todavía no se han registrado errores.</p>
      ) : filtrados.length === 0 ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Ningún error coincide con los filtros seleccionados.</p>
      ) : (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {visibles.map((r) => (
            <Card key={r.idRegistroError}>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <span className="type-body text-[var(--text-primary)]">{r.titulo}</span>
                  <Badge variant={variantePorSeveridad[r.severidad]} size="sm" className="shrink-0">
                    {r.severidad}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Proyecto</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {r.actividad.etapa.proyecto.nombreProyecto}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Etapa</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {r.actividad.etapa.nombreEtapa}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Actividad</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {r.actividad.nombreActividad}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Tipo de error</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {r.tipoError.nombreTipoError}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Creado por</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {r.usuarioCreador ? `${r.usuarioCreador.nombres} ${r.usuarioCreador.apellidos}` : '—'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Registrado</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">{r.fechaRegistro}</span>
                  </div>
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

                <div className="flex items-end justify-between gap-4 pt-1 border-t border-[var(--border)]">
                  <div className="w-40">
                    <Select
                      label="Estado"
                      value={r.estado}
                      onChange={(e) => alCambiarEstado(r, e.target.value)}
                    >
                      {ESTADOS_REGISTRO_ERROR.map((estado) => (
                        <option key={estado} value={estado}>{estado}</option>
                      ))}
                    </Select>
                  </div>
                  {puedeEliminar(r) && (
                    <Button variant="ghost" size="sm" onClick={() => setRegistroAEliminar(r)}>
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Pagination pagina={paginaActual} totalPaginas={totalPaginas} onCambiar={setPagina} />
        </>
      )}

      <Modal
        open={estadoPendiente !== null}
        onClose={() => setEstadoPendiente(null)}
        title={estadoPendiente?.estado === 'Descartado' ? 'Descartar error' : 'Marcar error como resuelto'}
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <Textarea
            label={estadoPendiente?.estado === 'Descartado' ? 'Motivo del descarte (opcional)' : 'Cómo se resolvió (opcional)'}
            rows={4}
            value={notaResolucion}
            onChange={(e) => setNotaResolucion(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setEstadoPendiente(null)}>Cancelar</Button>
            <Button onClick={confirmarNotaResolucion}>Confirmar</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={registroAEliminar !== null}
        variant="destructive"
        title="¿Eliminar este registro de error?"
        description="Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={confirmarEliminar}
        onCancel={() => setRegistroAEliminar(null)}
      />
    </div>
  );
}
