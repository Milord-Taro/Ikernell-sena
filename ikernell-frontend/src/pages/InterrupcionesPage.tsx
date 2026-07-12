import { useEffect, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/FormControls';
import { Alert, ConfirmDialog } from '../components/ui/Feedback';
import { Pagination } from '../components/ui/Pagination';
import { useAuth } from '../context/AuthContext';
import { CODIGO_ROL } from '../types/usuario';
import { listarInterrupciones, eliminarInterrupcion } from '../services/interrupciones';
import type { InterrupcionResponse } from '../types/interrupcion';
import { ApiRequestError } from '../types/api';

const POR_PAGINA = 8;
const TODOS = 'Todos' as const;

/** Registrar una interrupción se hace desde "Mis actividades" (ActividadHistorialModal); acá solo se supervisa y, si aplica, se elimina. */
export default function InterrupcionesPage() {
  const { usuario } = useAuth();
  const [registros, setRegistros] = useState<InterrupcionResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registroAEliminar, setRegistroAEliminar] = useState<InterrupcionResponse | null>(null);
  const [filtroProyecto, setFiltroProyecto] = useState<number | typeof TODOS>(TODOS);
  const [pagina, setPagina] = useState(1);

  const cargar = () => {
    setCargando(true);
    return listarInterrupciones()
      .then(setRegistros)
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmarEliminar = async () => {
    if (!registroAEliminar) return;
    setError(null);
    try {
      await eliminarInterrupcion(registroAEliminar.idInterrupcion);
      setRegistroAEliminar(null);
      await cargar();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo eliminar el registro.');
      setRegistroAEliminar(null);
    }
  };

  const puedeEliminar = (registro: InterrupcionResponse) =>
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

  const filtrados = filtroProyecto === TODOS
    ? registros
    : registros.filter((r) => r.actividad.etapa.proyecto.idProyecto === filtroProyecto);
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtrados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);

  const alCambiarFiltroProyecto = (valor: string) => {
    setFiltroProyecto(valor === TODOS ? TODOS : Number(valor));
    setPagina(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="type-h3 text-[var(--text-primary)]">Interrupciones</h2>
          <p className="type-body-sm text-[var(--text-tertiary)]">
            Todas las interrupciones registradas, en cualquier proyecto.
          </p>
        </div>
        <div className="w-56">
          <Select label="Proyecto" value={filtroProyecto} onChange={(e) => alCambiarFiltroProyecto(e.target.value)}>
            <option value={TODOS}>Todos los proyectos</option>
            {proyectos.map(([id, nombre]) => (
              <option key={id} value={id}>{nombre}</option>
            ))}
          </Select>
        </div>
      </div>

      {error && <Alert variant="error" title="No se pudo completar la acción">{error}</Alert>}

      {cargando ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Cargando interrupciones...</p>
      ) : registros.length === 0 ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Todavía no se han registrado interrupciones.</p>
      ) : filtrados.length === 0 ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Ninguna interrupción coincide con el filtro seleccionado.</p>
      ) : (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {visibles.map((r) => (
            <Card key={r.idInterrupcion}>
              <CardContent className="flex flex-col gap-3">
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
                    <span className="type-caption text-[var(--text-tertiary)]">Tipo de interrupción</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {r.tipoInterrupcion.nombreTipoInterrupcion}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Creado por</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">
                      {r.usuarioCreador ? `${r.usuarioCreador.nombres} ${r.usuarioCreador.apellidos}` : '—'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="type-caption text-[var(--text-tertiary)]">Duración</span>
                    <span className="type-body-sm text-[var(--text-secondary)] truncate">{r.duracionMinutos} minutos</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="type-caption text-[var(--text-tertiary)]">Motivo</span>
                  <p className="type-body-sm text-[var(--text-secondary)]">{r.motivo}</p>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1 border-t border-[var(--border)]">
                  <span className="type-caption text-[var(--text-tertiary)]">Registrado: {r.fechaRegistro}</span>
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

      <ConfirmDialog
        open={registroAEliminar !== null}
        variant="destructive"
        title="¿Eliminar este registro de interrupción?"
        description="Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={confirmarEliminar}
        onCancel={() => setRegistroAEliminar(null)}
      />
    </div>
  );
}
