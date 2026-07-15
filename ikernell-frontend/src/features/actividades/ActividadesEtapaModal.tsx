import { useEffect, useState } from 'react';
import { formatFechaHora } from '../../utils/formatDate';
import { Plus, Pencil, Trash2, UserCheck, History, Zap, Bug } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/DataDisplay';
import { Select, Textarea } from '../../components/ui/FormControls';
import { Alert, ConfirmDialog } from '../../components/ui/Feedback';
import { ActividadFormModal } from './ActividadFormModal';
import { ActividadHistorialModal } from '../registros/ActividadHistorialModal';
import { RegistrarInterrupcionModal } from '../registros/RegistrarInterrupcionModal';
import { useAuth } from '../../context/AuthContext';
import { CODIGO_ROL } from '../../types/usuario';
import { ApiRequestError } from '../../types/api';
import {
  listarActividadesPorEtapa,
  crearActividad,
  actualizarActividad,
  asignarActividad,
  cambiarEstadoActividad,
  eliminarActividad,
} from '../../services/actividades';
import { listarAsignacionesPorProyecto } from '../../services/asignaciones';
import { ESTADOS_ACTIVIDAD_SELECCIONABLES } from '../../types/actividad';
import type { ActividadResponse, ActividadRequest, EstadoActividad } from '../../types/actividad';
import type { AsignacionProyectoResponse } from '../../types/asignacionProyecto';

const variantePorEstado: Record<EstadoActividad, 'default' | 'success' | 'info' | 'warning' | 'error'> = {
  'Pendiente de asignación': 'warning',
  'Pendiente': 'default',
  'En desarrollo': 'info',
  'Finalizada': 'success',
  'Cancelada': 'error',
};

const variantePorPrioridad: Record<string, 'default' | 'warning' | 'error' | 'info'> = {
  'Baja': 'default',
  'Media': 'info',
  'Alta': 'warning',
  'Crítica': 'error',
};

interface ActividadesEtapaModalProps {
  open: boolean;
  idEtapa: number;
  idProyecto: number;
  nombreEtapa: string;
  onClose: () => void;
}

export function ActividadesEtapaModal({
  open,
  idEtapa,
  idProyecto,
  nombreEtapa,
  onClose,
}: ActividadesEtapaModalProps) {
  const { usuario } = useAuth();
  const puedeGestionar =
    usuario?.rol.codigoRol === CODIGO_ROL.COORDINADOR || usuario?.rol.codigoRol === CODIGO_ROL.LIDER_PROYECTO;

  const [actividades, setActividades] = useState<ActividadResponse[]>([]);
  const [equipoVigente, setEquipoVigente] = useState<AsignacionProyectoResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [formAbierto, setFormAbierto] = useState(false);
  const [actividadEditando, setActividadEditando] = useState<ActividadResponse | null>(null);
  const [actividadHistorial, setActividadHistorial] = useState<ActividadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actividadAEliminar, setActividadAEliminar] = useState<ActividadResponse | null>(null);
  const [actividadACancelar, setActividadACancelar] = useState<ActividadResponse | null>(null);
  const [actividadAFinalizar, setActividadAFinalizar] = useState<ActividadResponse | null>(null);
  const [notaFinalizacion, setNotaFinalizacion] = useState('');
  const [interrupcionModalAbierto, setInterrupcionModalAbierto] = useState(false);

  const cargar = async () => {
    setCargando(true);
    try {
      const [actividadesResp, asignacionesResp] = await Promise.all([
        listarActividadesPorEtapa(idEtapa),
        listarAsignacionesPorProyecto(idProyecto),
      ]);
      setActividades(actividadesResp);
      setEquipoVigente(asignacionesResp.filter((a) => !a.fechaDesvinculacion));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (open) cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, idEtapa, idProyecto]);

  const mias = actividades.filter((a) => a.usuario?.idUsuario === usuario?.idUsuario);
  const puedeVerColumnaMias = mias.length > 0;

  // NUEVO: elegibles para registrar una interrupción -- igual que valida
  // el backend (InterrupcionService.crear()), una Finalizada o Cancelada
  // queda fuera (no tiene sentido "interrumpir" algo que ya terminó).
  const misElegiblesParaInterrupcion = mias.filter(
    (a) => a.estado !== 'Finalizada' && a.estado !== 'Cancelada',
  );

  // NUEVO: si ya se muestra la columna "mis actividades", la columna de
  // la derecha deja de repetirlas -- pasa a llamarse "Otras actividades"
  // y solo lista lo que NO es mío. Si no tengo nada asignado en esta
  // etapa, la columna derecha sigue mostrando todo (no hay nada que
  // excluir) y conserva su título original.
  const otras = puedeVerColumnaMias
    ? actividades.filter((a) => a.usuario?.idUsuario !== usuario?.idUsuario)
    : actividades;
  const tituloColumnaDerecha = puedeVerColumnaMias
    ? 'Otras actividades de la etapa'
    : 'Todas las actividades de la etapa';

  const alGuardar = async (request: ActividadRequest) => {
    if (actividadEditando) {
      await actualizarActividad(actividadEditando.idActividad, request);
    } else {
      await crearActividad(request);
    }
    setFormAbierto(false);
    setActividadEditando(null);
    await cargar();
  };

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
    if (estado === 'Cancelada') {
      setActividadACancelar(actividad);
      return;
    }
    if (estado === 'Finalizada') {
      setNotaFinalizacion('');
      setActividadAFinalizar(actividad);
      return;
    }
    aplicarCambioEstado(actividad, estado as EstadoActividad);
  };

  const alConfirmarCancelarActividad = async () => {
    if (!actividadACancelar) return;
    await aplicarCambioEstado(actividadACancelar, 'Cancelada');
    setActividadACancelar(null);
  };

  const alConfirmarFinalizarActividad = async () => {
    if (!actividadAFinalizar) return;
    await aplicarCambioEstado(actividadAFinalizar, 'Finalizada', notaFinalizacion || undefined);
    setActividadAFinalizar(null);
  };

  const alAsignar = async (actividad: ActividadResponse, idUsuario: string) => {
    if (!idUsuario) return;
    setError(null);
    try {
      await asignarActividad(actividad.idActividad, Number(idUsuario));
      await cargar();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo asignar el desarrollador.');
    }
  };

  const alEliminar = (actividad: ActividadResponse) => {
    setError(null);
    setActividadAEliminar(actividad);
  };

  const confirmarEliminar = async () => {
    if (!actividadAEliminar) return;
    try {
      await eliminarActividad(actividadAEliminar.idActividad);
      setActividadAEliminar(null);
      await cargar();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo eliminar la actividad.');
      setActividadAEliminar(null);
    }
  };

  // CERRADO: regla pendiente marcada en el plan de Fase 8 -- el backend
  // ahora rechaza cambiarEstado() si el proyecto padre no está "En
  // ejecución" (ActividadService.cambiarEstado). El frontend refleja lo
  // mismo para no ofrecer un control que sabemos va a fallar.
  const proyectoEnEjecucion = (actividad: ActividadResponse) =>
    actividad.etapa.proyecto.estado === 'En ejecución';

  // CORREGIDO: refleja la regla nueva del backend (ActividadService.cambiarEstado)
  // -- mientras no esté Cancelada, solo el desarrollador dueño puede tocarla; una
  // vez Cancelada, solo Líder/Coordinador (ver AutorizacionProyectoService).
  const puedeCambiarEstado = (actividad: ActividadResponse) => {
    if (!proyectoEnEjecucion(actividad)) return false;
    if (actividad.estado === 'Cancelada') return puedeGestionar;
    return actividad.usuario?.idUsuario === usuario?.idUsuario;
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={`Actividades — ${nombreEtapa}`}
        size="xl"
      >
        <div className="flex flex-col gap-4">
          {error && <Alert variant="error" title="No se pudo completar la acción">{error}</Alert>}

          {puedeGestionar && (
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={() => {
                  setActividadEditando(null);
                  setFormAbierto(true);
                }}
              >
                <Plus size={14} />
                Nueva actividad
              </Button>
            </div>
          )}

          {cargando ? (
            <p className="type-body-sm text-[var(--text-tertiary)]">Cargando actividades...</p>
          ) : (
            <div className={`grid gap-4 ${puedeVerColumnaMias ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {puedeVerColumnaMias && (
                <div className="flex flex-col gap-2 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="type-label text-[var(--text-tertiary)]">Mis actividades en esta etapa</h4>
                    <Button variant="ghost" size="sm" onClick={() => setInterrupcionModalAbierto(true)}>
                      <Zap size={13} />
                      Registrar interrupción
                    </Button>
                  </div>
                  {mias.map((actividad) => (
                    <Card key={actividad.idActividad}>
                      <CardContent className="flex flex-col gap-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-col min-w-0">
                            <span className="type-caption text-[var(--text-tertiary)]">Actividad</span>
                            <span className="type-body text-[var(--text-primary)]">{actividad.nombreActividad}</span>
                          </div>
                          <div className="flex flex-col items-end shrink-0">
                            <span className="type-caption text-[var(--text-tertiary)]">Prioridad</span>
                            <Badge variant={variantePorPrioridad[actividad.prioridad]} size="sm">
                              {actividad.prioridad}
                            </Badge>
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
                                Finalizada: {formatFechaHora(actividad.fechaFinalizacion)}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <Select
                              label="Estado"
                              value={actividad.estado}
                              disabled={!puedeCambiarEstado(actividad)}
                              hint={
                                actividad.estado === 'Cancelada'
                                  ? 'Cancelada -- solo el Líder o el Coordinador pueden cambiarla.'
                                  : !proyectoEnEjecucion(actividad)
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
                          {/* Abre el mismo modal que "Historial" -- ActividadHistorialModal ya
                              carga por defecto en la pestaña "Errores" (con su formulario de
                              registro), esto solo lo hace más visible que buscarlo en Historial. */}
                          <Button variant="ghost" size="sm" onClick={() => setActividadHistorial(actividad)}>
                            <Bug size={14} />
                            Reportar error
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setActividadHistorial(actividad)}>
                            <History size={14} />
                            Historial
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-2 min-w-0">
                <h4 className="type-label text-[var(--text-tertiary)]">{tituloColumnaDerecha}</h4>
                {otras.length === 0 ? (
                  <p className="type-body-sm text-[var(--text-tertiary)]">
                    {puedeVerColumnaMias
                      ? 'No hay más actividades en esta etapa.'
                      : 'Esta etapa todavía no tiene actividades registradas.'}
                  </p>
                ) : (
                  // NUEVO: cuando no hay "Mis actividades" (columna única, todo
                  // el ancho del modal disponible), las cards pasan a 3 columnas
                  // para aprovechar el espacio -- si sí hay "Mis actividades", esta
                  // columna comparte el modal con esa otra y se queda apilada como
                  // antes, no le alcanza el ancho para una grilla.
                  <div className={puedeVerColumnaMias ? 'flex flex-col gap-2' : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'}>
                  {otras.map((actividad) => (
                    <Card key={actividad.idActividad}>
                      <CardContent className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {actividad.usuario ? (
                              <Avatar name={`${actividad.usuario.nombres} ${actividad.usuario.apellidos}`} size="sm" />
                            ) : (
                              <span className="flex items-center justify-center size-8 rounded-full bg-[var(--muted)] text-[var(--text-tertiary)] shrink-0">
                                <UserCheck size={14} />
                              </span>
                            )}
                            <div className="flex flex-col min-w-0">
                              <span className="type-caption text-[var(--text-tertiary)]">Actividad</span>
                              <span className="type-body text-[var(--text-primary)] truncate">
                                {actividad.nombreActividad}
                              </span>
                              <span className="type-caption text-[var(--text-tertiary)] truncate">
                                Asignado a: {actividad.usuario
                                  ? `${actividad.usuario.nombres} ${actividad.usuario.apellidos}`
                                  : 'sin asignar'}
                              </span>
                            </div>
                          </div>

                          {puedeGestionar && (
                            <div className="flex items-center gap-1 shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setActividadEditando(actividad);
                                  setFormAbierto(true);
                                }}
                              >
                                <Pencil size={14} />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => alEliminar(actividad)}>
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          )}
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
                                Finalizada: {formatFechaHora(actividad.fechaFinalizacion)}
                              </span>
                            )}
                          </div>
                        )}

                        {actividad.estado === 'Pendiente de asignación' && puedeGestionar ? (
                          <Select
                            label="Asignar desarrollador"
                            value=""
                            onChange={(e) => alAsignar(actividad, e.target.value)}
                          >
                            <option value="">Seleccionar del equipo del proyecto...</option>
                            {equipoVigente.map((a) => (
                              <option key={a.usuario.idUsuario} value={a.usuario.idUsuario}>
                                {a.usuario.nombres} {a.usuario.apellidos} — {a.rolProyecto}
                              </option>
                            ))}
                          </Select>
                        ) : puedeCambiarEstado(actividad) ? (
                          <Select
                            label="Estado"
                            value={actividad.estado}
                            onChange={(e) => alCambiarEstado(actividad, e.target.value)}
                          >
                            {ESTADOS_ACTIVIDAD_SELECCIONABLES.map((estado) => (
                              <option key={estado} value={estado}>{estado}</option>
                            ))}
                          </Select>
                        ) : (
                          <div className="flex flex-col">
                            <span className="type-caption text-[var(--text-tertiary)]">Estado</span>
                            <Badge variant={variantePorEstado[actividad.estado]} size="sm" className="w-fit">
                              {actividad.estado}
                            </Badge>
                          </div>
                        )}

                        {/* NUEVO: cualquier miembro del equipo puede reportar un error o
                            consultar el historial de actividades que NO son suyas -- el
                            backend ya lo permite (equipo vigente del proyecto, no dueño
                            de la actividad); antes solo estaba disponible en la columna
                            "Mis actividades" o para Líder/Coordinador. */}
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => setActividadHistorial(actividad)}>
                            <Bug size={14} />
                            Reportar error
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setActividadHistorial(actividad)}>
                            <History size={14} />
                            Historial
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {puedeGestionar && (
        <ActividadFormModal
          open={formAbierto}
          idEtapa={idEtapa}
          actividadEditando={actividadEditando}
          equipoVigente={equipoVigente}
          onClose={() => {
            setFormAbierto(false);
            setActividadEditando(null);
          }}
          onGuardar={alGuardar}
        />
      )}

      {actividadHistorial && (
        <ActividadHistorialModal
          open={Boolean(actividadHistorial)}
          actividad={actividadHistorial}
          onClose={() => setActividadHistorial(null)}
        />
      )}

      <ConfirmDialog
        open={Boolean(actividadAEliminar)}
        title={`¿Eliminar la actividad "${actividadAEliminar?.nombreActividad}"?`}
        description="Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        variant="destructive"
        onConfirm={confirmarEliminar}
        onCancel={() => setActividadAEliminar(null)}
      />

      <ConfirmDialog
        open={actividadACancelar !== null}
        title="¿Cancelar esta actividad?"
        description="Una vez cancelada, solo el Líder del proyecto o un Coordinador podrán volver a cambiar su estado."
        confirmLabel="Cancelar actividad"
        cancelLabel="Volver"
        variant="destructive"
        onConfirm={alConfirmarCancelarActividad}
        onCancel={() => setActividadACancelar(null)}
      />

      <RegistrarInterrupcionModal
        open={interrupcionModalAbierto}
        actividadesElegibles={misElegiblesParaInterrupcion}
        onClose={() => setInterrupcionModalAbierto(false)}
        onRegistrado={cargar}
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
            <Button onClick={alConfirmarFinalizarActividad}>Finalizar</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
