import { useEffect, useState } from 'react';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Select } from '../components/ui/FormControls';
import { Modal } from '../components/ui/Modal';
import { JsonTree, type JsonValue } from '../components/ui/JsonTree';
import { listarTrazabilidad } from '../services/trazabilidad';
import { ENTIDADES_TRAZABILIDAD } from '../types/trazabilidad';
import type { TrazabilidadResponse, OperacionTrazabilidad } from '../types/trazabilidad';

const variantePorOperacion: Record<OperacionTrazabilidad, 'default' | 'success' | 'info' | 'warning' | 'error'> = {
  'Crear': 'success',
  'Actualizar': 'info',
  'Inhabilitar': 'warning',
  'Cambiar Estado': 'info',
  'Asignar': 'info',
  'Desasignar': 'warning',
  'Autenticar': 'default',
  'Eliminar': 'error',
};

/** El detalle casi siempre es un snapshot JSON del recurso afectado; si no parsea, se muestra tal cual. */
function parsearDetalle(detalle: string | null): JsonValue | undefined {
  if (!detalle) return null;
  try {
    return JSON.parse(detalle) as JsonValue;
  } catch {
    return undefined;
  }
}

interface FilaTabla extends Record<string, unknown> {
  idTrazabilidad: number;
  fecha: string;
  usuario: string;
  operacion: OperacionTrazabilidad;
  entidad: string;
  codigo: string;
  original: TrazabilidadResponse;
}

/**
 * Solo Coordinador (RoleRoute + backend @PreAuthorize). Muestra TODO lo
 * que hoy registra trazabilidad -- que no es "todas las operaciones del
 * sistema", solo las que ya llaman a TrazabilidadService.registrar()
 * (ver ENTIDADES_TRAZABILIDAD).
 */
export default function AuditoriaPage() {
  const [eventos, setEventos] = useState<TrazabilidadResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [entidadFiltro, setEntidadFiltro] = useState('');
  const [eventoAbierto, setEventoAbierto] = useState<TrazabilidadResponse | null>(null);

  const cargar = async () => {
    setCargando(true);
    try {
      const resp = await listarTrazabilidad(entidadFiltro || undefined);
      setEventos(resp);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entidadFiltro]);

  const filas: FilaTabla[] = eventos.map((e) => ({
    idTrazabilidad: e.idTrazabilidad,
    fecha: e.fechaEvento,
    usuario: e.usuario ? `${e.usuario.nombres} ${e.usuario.apellidos}` : 'Sistema',
    operacion: e.operacion,
    entidad: e.entidad,
    codigo: e.codigoRegistro,
    original: e,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="type-h1 text-[var(--text-primary)]">Auditoría global</h1>
        <p className="type-body text-[var(--text-secondary)] mt-1">
          Todo lo que se ha creado, modificado o eliminado en el sistema.
        </p>
      </div>

      <div className="w-56">
        <Select label="Entidad" value={entidadFiltro} onChange={(e) => setEntidadFiltro(e.target.value)}>
          <option value="">Todas</option>
          {ENTIDADES_TRAZABILIDAD.map((ent) => (
            <option key={ent} value={ent}>{ent}</option>
          ))}
        </Select>
      </div>

      <Table<FilaTabla>
        keyField="idTrazabilidad"
        loading={cargando}
        data={filas}
        emptyMessage="Sin eventos registrados"
        emptyDescription="No hay eventos de auditoría para este filtro."
        onRowClick={(fila) => setEventoAbierto(fila.original)}
        columns={[
          { key: 'fecha', header: 'Fecha', mono: true, width: '170px' },
          { key: 'usuario', header: 'Usuario' },
          {
            key: 'operacion',
            header: 'Operación',
            width: '130px',
            render: (row) => (
              <Badge variant={variantePorOperacion[row.operacion]} size="sm">{row.operacion}</Badge>
            ),
          },
          { key: 'entidad', header: 'Entidad', width: '140px' },
          { key: 'codigo', header: 'Código', mono: true, width: '140px' },
        ]}
      />

      {eventoAbierto && (
        <Modal
          open={Boolean(eventoAbierto)}
          onClose={() => setEventoAbierto(null)}
          title={`${eventoAbierto.entidad} · ${eventoAbierto.codigoRegistro}`}
          description={`Evento #${eventoAbierto.idTrazabilidad}`}
          size="md"
        >
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <span className="type-caption text-[var(--text-tertiary)]">Usuario</span>
                <span className="type-body-sm text-[var(--text-secondary)]">
                  {eventoAbierto.usuario
                    ? `${eventoAbierto.usuario.nombres} ${eventoAbierto.usuario.apellidos} (${eventoAbierto.usuario.codigoUsuario})`
                    : 'Sistema'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="type-caption text-[var(--text-tertiary)]">Rol</span>
                <span className="type-body-sm text-[var(--text-secondary)]">
                  {eventoAbierto.usuario?.rol?.nombreRol ?? '—'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="type-caption text-[var(--text-tertiary)]">Operación</span>
                <Badge variant={variantePorOperacion[eventoAbierto.operacion]} size="sm" className="w-fit">
                  {eventoAbierto.operacion}
                </Badge>
              </div>
              <div className="flex flex-col">
                <span className="type-caption text-[var(--text-tertiary)]">Fecha</span>
                <span className="type-code text-[var(--text-secondary)]">{eventoAbierto.fechaEvento}</span>
              </div>
              <div className="flex flex-col">
                <span className="type-caption text-[var(--text-tertiary)]">Dirección IP</span>
                <span className="type-code text-[var(--text-secondary)]">{eventoAbierto.direccionIp ?? '—'}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="type-caption text-[var(--text-tertiary)]">Detalle</span>
              <div className="bg-[var(--muted)] rounded-[var(--radius-md)] p-3 overflow-x-auto">
                {(() => {
                  const detalle = parsearDetalle(eventoAbierto.detalle);
                  if (detalle === null) {
                    return <span className="type-code text-[var(--text-secondary)]">—</span>;
                  }
                  if (detalle === undefined) {
                    return (
                      <pre className="type-code text-[var(--text-secondary)] whitespace-pre-wrap break-words">
                        {eventoAbierto.detalle}
                      </pre>
                    );
                  }
                  return <JsonTree value={detalle} />;
                })()}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
